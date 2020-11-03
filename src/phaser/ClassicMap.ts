import { Scene } from "phaser";
import { config } from "./config";
import { setSwipe, Direction } from "./swipe";
import { Subject, fromEvent, from } from "rxjs";
import { bufferTime, map, filter, concatMap, throttleTime } from 'rxjs/operators';

export class ClassicMap extends Scene {
  readonly tileHeight: number = 8;
  readonly tileWidth: number = 8;
  gamepad: Phaser.GameObjects.Image;
  exitButton: Phaser.GameObjects.Image;

  map: Phaser.Tilemaps.Tilemap;
  worldLayer: Phaser.Tilemaps.StaticTilemapLayer;
  coinLayer: Phaser.Tilemaps.StaticTilemapLayer;
  powerUpLayer: Phaser.Tilemaps.StaticTilemapLayer;
  timer: Phaser.GameObjects.Text;

  swipe: any;

  chasee: any;
  chaser0: any;
  chaser1: any;
  chaser2: any;
  chaser3: any;
  player: any;

  socket: SocketIOClient.Socket;


  constructor(config, inSocket: SocketIOClient.Socket) {
    super(config);
    this.socket = inSocket;
  }

  preload() {
    // Gamepad
    this.load.image("gamepad", "img/arrow_circle.png");

    // The map
    this.load.tilemapTiledJSON("classic-map", "img/ClassicMap.json");
    this.load.image("tiles", 'img/tiles.png');
    this.load.image("chasee", "img/chasee.png");
    this.load.image("chaser", "img/chaser.png");

    // Button
    this.load.image("exit-button", "img/exit-button.png");
  }

  create() {
    this.setMaps();
    this.setGamepad();
    this.setCharacters();
    this.setExitButton();
    this.receiveRole();
    this.receivePositionData();
    this.receiveTimerData();

    this.socket.emit("ready");
  }

  private setMaps(): void {
    this.map = this.make.tilemap({ key: "classic-map" });
    const tileset = this.map.addTilesetImage("Random", "tiles");

    this.map.createStaticLayer("bottom", tileset, 0, 0);
    this.worldLayer = this.map.createStaticLayer("maze", tileset, 0, 0);
    
    this.coinLayer = this.map.createStaticLayer("coins", tileset, 0, 0);
    this.powerUpLayer = this.map.createStaticLayer("powerups", tileset, 0, 0);

    // set the text
    this.timer = this.add.text(10, 10,"2:00");
    this.timer.setOrigin(0,0);
  }

  private setCharacters(): void {
    // Create chaser
    this.chasee = this.add.image(13*this.tileWidth + (this.tileWidth/2),23*this.tileHeight + (this.tileHeight/2), "chasee");

    // Create chasees
    this.chaser0 = this.add.image(11*this.tileWidth + (this.tileWidth/2), 12*this.tileHeight + (this.tileHeight/2), "chaser");
    this.chaser1 = this.add.image(13*this.tileWidth + (this.tileWidth/2), 13*this.tileHeight + (this.tileHeight/2), "chaser");
    this.chaser2 = this.add.image(14*this.tileWidth + (this.tileWidth/2), 13*this.tileHeight + (this.tileHeight/2), "chaser");
    this.chaser3 = this.add.image(16*this.tileWidth + (this.tileWidth/2), 12*this.tileHeight + (this.tileHeight/2), "chaser");
  }

  private setExitButton(): void {
    // Set button
    this.exitButton = this.add.image(26*8, 0, "exit-button");
    this.exitButton
      .setOrigin(0,0)
      .setInteractive()
      .on("pointerup", () => {
        let event = new CustomEvent("exitClick");
        document.dispatchEvent(event);
      });
    
  }

  // Set the gampad
  private setGamepad(): void {
    // Set gamepad
    this.gamepad = this.add.image(<number>config.width/2, <number>config.height*0.80, "gamepad");
    this.gamepad.scale = (0.5*<number>config.width)/this.gamepad.width;
    let swipe: Subject<Direction> = setSwipe(this.gamepad);
    
    swipe.subscribe((direction: Direction) => {
      switch (direction) {
        case Direction.Up:
          this.socket.emit("directionChange", "up");
          break

        case Direction.Down:
          this.socket.emit("directionChange", "down");
          break
        
        case Direction.Left:
          this.socket.emit("directionChange", "left");
          break
        
        case Direction.Right:
          this.socket.emit("directionChange", "right");
          break

        default:
          throw TypeError("Unknown direction: " + direction);
      }
    });
  }

  private receiveRole(): void {
    this.socket.on("role", (role: string) => {
      this.player = (<any>this)[role];

      if (role === "chasee") {
        alert("You are the chasee. Collect all the coins before time runs out!");
      } else {
        alert("You are a chaser. Catch the chasee before they collect all coins!");
      }
    });
  }

  // Receive position data
  // In case there's backpressure
  // Buffer up the last 100ms and update the lastest one
  private receivePositionData(): void {
    fromEvent(this.socket, "positionUpdate").pipe(
      bufferTime(100),
      filter((arr: Array<any>) => arr.length != 0),
      map((arr: Array<any>) => arr[arr.length-1]),
      concatMap((obj) => from(Object.entries(obj))),
      map(([key, value]) => { 
        return { character: key, pos: value } ;
      })
    ).subscribe((obj) => {
      const {character, pos} = obj; 
      (<any>this)[character].setX((<any>pos).x);
      (<any>this)[character].setY((<any>pos).y);
    });
  }

  // Receive timer data
  // Just in case of backpressure
  // throttle time a little bit
  // Receives a time-string
  private receiveTimerData(): void {
    fromEvent(this.socket, "timerUpdate").pipe(
      throttleTime(900)
    ).subscribe((time: string) => {
      this.timer.setText(time);
    })
  }
}

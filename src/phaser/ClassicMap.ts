import { Scene } from "phaser";
import { config } from "./config";
import { setSwipe, Direction } from "./swipe";
import { Subject } from "rxjs";

export class ClassicMap extends Scene {
  readonly tileHeight: number = 8;
  readonly tileWidth: number = 8;
  gamepad: Phaser.GameObjects.Image;
  exitButton: Phaser.GameObjects.Image;

  map: Phaser.Tilemaps.Tilemap;
  worldLayer: Phaser.Tilemaps.StaticTilemapLayer;
  coinLayer: Phaser.Tilemaps.StaticTilemapLayer;
  powerUpLayer: Phaser.Tilemaps.StaticTilemapLayer;

  swipe: any;

  chasee: any;
  chaser0: any;
  chaser1: any;
  chaser2: any;
  chaser3: any;

  constructor() {
    super("playGame");
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
    // Map data
    this.map = this.make.tilemap({ key: "classic-map" });
    const tileset = this.map.addTilesetImage("Random", "tiles");

    this.map.createStaticLayer("bottom", tileset, 0, 0);
    this.worldLayer = this.map.createStaticLayer("maze", tileset, 0, 0);
    
    this.coinLayer = this.map.createStaticLayer("coins", tileset, 0, 0);
    this.powerUpLayer = this.map.createStaticLayer("powerups", tileset, 0, 0);

    // Create chaser
    this.chasee = this.add.image(13*this.tileWidth + (this.tileWidth/2),23*this.tileHeight + (this.tileHeight/2), "chasee");
    this.chasee.direction = null;

    // Create chasees
    this.chaser0 = this.add.image(11*this.tileWidth + (this.tileWidth/2), 12*this.tileHeight + (this.tileHeight/2), "chaser");
    this.chaser1 = this.add.image(13*this.tileWidth + (this.tileWidth/2), 13*this.tileHeight + (this.tileHeight/2), "chaser");
    this.chaser2 = this.add.image(14*this.tileWidth + (this.tileWidth/2), 13*this.tileHeight + (this.tileHeight/2), "chaser");
    this.chaser3 = this.add.image(16*this.tileWidth + (this.tileWidth/2), 12*this.tileHeight + (this.tileHeight/2), "chaser");

    // Set gamepad
    this.gamepad = this.add.image(<number>config.width/2, <number>config.height*0.80, "gamepad");
    this.gamepad.scale = (0.5*<number>config.width)/this.gamepad.width;
    let swipe: Subject<Direction> = setSwipe(this.gamepad);
    
    /* swipe.subscribe((direction: Direction) => { */
    /*   switch (direction) { */
    /*     case Direction.Up: */
    /*       this.chaser.direction = Direction.Up; */
    /*       break */

    /*     case Direction.Down: */
    /*       this.chaser.direction = Direction.Down; */
    /*       break */
        
    /*     case Direction.Left: */
    /*       this.chaser.direction = Direction.Left; */
    /*       break */
        
    /*     case Direction.Right: */
    /*       this.chaser.direction = Direction.Right; */
    /*       break */

    /*     default: */
    /*       throw TypeError("Unknown direction: " + direction); */
    /*   } */
    /* }); */

    // Set button
    this.exitButton = this.add.image(26*8, 0, "exit-button");
    this.exitButton
      .setOrigin(0,0)
      .setInteractive()
      .on("pointerup", () => {
        let event = new CustomEvent("exitClick");
        document.dispatchEvent(event);
      })

    // Listen to role events
    this.game.events.on("role", (role: string) => {
      console.log("received role: " + role);
    })
  }

}

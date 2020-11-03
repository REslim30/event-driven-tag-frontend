import { Scene } from "phaser";
import { config } from "./config";
import { setSwipe, Direction } from "./swipe";
import { Subject } from "rxjs";

export class ClassicMap extends Scene {
  readonly tileHeight: number = 8;
  readonly tileWidth: number = 8;
  map: Phaser.Tilemaps.Tilemap;
  ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image;
  pacman: Phaser.GameObjects.GameObject;
  ghost: Phaser.GameObjects.GameObject;
  swipe: any;
  gamepad: Phaser.GameObjects.Image;
  chaser: any;
  worldLayer: Phaser.Tilemaps.StaticTilemapLayer;
  exitButton: Phaser.GameObjects.Image;

  constructor() {
    super("playGame");
  }

  preload() {
    // Gamepad
    this.load.image("gamepad", "img/arrow_circle.png");

    // The map
    this.load.tilemapTiledJSON("classic-map", "img/ClassicMap.json");
    this.load.image("tiles", 'img/tiles.png')
    this.load.image("chaser", "img/Chaser.png")

    // Button
    this.load.image("exit-button", "img/exit-button.png")
  }

  create() {
    // Map data
    this.map = this.make.tilemap({ key: "classic-map" });
    const tileset = this.map.addTilesetImage("Random", "tiles");

    const belowLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("bottom", tileset, 0, 0);
    this.worldLayer = this.map.createStaticLayer("maze", tileset, 0, 0);
    
    const coinLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("coins", tileset, 0, 0);
    const powerUpLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("powerups", tileset, 0, 0);

    // Create player
    this.chaser = this.physics.add.image(13*this.tileWidth + (this.tileWidth/2),23*this.tileHeight + (this.tileHeight/2), "chaser");
    this.chaser.direction = null;

    // Set gamepad
    this.gamepad = this.add.image(<number>config.width/2, <number>config.height*0.80, "gamepad");
    this.gamepad.scale = (0.5*<number>config.width)/this.gamepad.width;
    let swipe: Subject<Direction> = setSwipe(this.gamepad);
    
    swipe.subscribe((direction: Direction) => {
      switch (direction) {
        case Direction.Up:
          this.chaser.direction = Direction.Up;
          break

        case Direction.Down:
          this.chaser.direction = Direction.Down;
          break
        
        case Direction.Left:
          this.chaser.direction = Direction.Left;
          break
        
        case Direction.Right:
          this.chaser.direction = Direction.Right;
          break

        default:
          throw TypeError("Unknown direction: " + direction);
      }
    });

    // Set button
    this.exitButton = this.add.image(26*8, 0, "exit-button");
    this.exitButton
      .setOrigin(0,0)
      .setInteractive()
      .on("pointerup", () => {
        let event = new CustomEvent("exitClick");
        document.dispatchEvent(event);
      })
  }

}

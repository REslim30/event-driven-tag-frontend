import { Scene } from "phaser";
import { config } from "./config";
import { setSwipe } from "./swipe";

export class ClassicMap extends Scene {
  map: Phaser.Tilemaps.Tilemap;
  ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image;
  pacman: Phaser.GameObjects.GameObject;
  ghost: Phaser.GameObjects.GameObject;
  swipe: any;
  gamepad: Phaser.GameObjects.Image;

  constructor() {
    super("playGame");
  }

  preload() {
    // Gamepad
    this.load.image("gamepad", "img/arrow_circle.png");

    // The map
    this.load.tilemapTiledJSON("classic-map", "img/ClassicMap.json");
    this.load.image("tiles", 'img/tiles.png')
  }

  create() {
    // The map
    this.map = this.make.tilemap({ key: "classic-map" });
    const tileset = this.map.addTilesetImage("Random", "tiles");

    this.map.createStaticLayer("bottom", tileset, 0, 0);

    /* this.pacman = this.add.circle(config.width/2 - 50, config.height/2 - 50, 25, 0xff0000); */
    /* this.ghost = this.add.star(config.width/2 + 50, config.width/2 + 50, 4, 50, 50, 0xff0000); */

    // Set gamepad
    this.gamepad = this.add.image(<number>config.width/2, <number>config.height*0.80, "gamepad");
    this.gamepad.scale = (0.5*<number>config.width)/this.gamepad.width;
    setSwipe(this.gamepad);
  }
}

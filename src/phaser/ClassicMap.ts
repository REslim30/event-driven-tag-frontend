import { Scene } from "phaser";
import { config } from "./config";
import { setSwipe } from "./swipe";

export class ClassicMap extends Scene {
  background: Phaser.GameObjects.Image;
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
    this.load.image("background", "img/background.png");
    this.load.image("ship", "img/ship.png");
    this.load.image("ship2", "img/ship2.png");
    this.load.image("ship3", "img/ship3.png");
    this.load.image("gamepad", "img/arrow_circle.png");
  }

  create() {
    this.background = this.add.image(0,0,"background");
    this.background.setOrigin(0,0);

    this.ship1 = this.add.image(<number>config.width/2 - 50, <number>config.height/2, "ship");
    this.ship2 = this.add.image(<number>config.width/2, <number>config.height/2, "ship2");
    this.ship3 = this.add.image(<number>config.width/2 + 50, <number>config.height/2, "ship3");

    /* this.pacman = this.add.circle(config.width/2 - 50, config.height/2 - 50, 25, 0xff0000); */
    /* this.ghost = this.add.star(config.width/2 + 50, config.width/2 + 50, 4, 50, 50, 0xff0000); */

    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

    this.gamepad = this.add.image(<number>config.width/2, <number>config.height*0.80, "gamepad");
    this.gamepad.scale = (0.5*<number>config.width)/this.gamepad.width;

    setSwipe(this.gamepad);
  }
}

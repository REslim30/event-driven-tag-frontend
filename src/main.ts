/* import * as io from "socket.io-client" */

/* const socket = io("http://192.168.1.28:3000"); */

/* socket.on("connect", (value: any) => { */
/*     console.log(value); */
/* }); */

/* socket.on("broadcast", (value: number) => { */
/*     console.log(value); */
/*     alert(value); */
/* }); */

/* import * as Phaser from "phaser"; */
import { Scene, Game, Scale } from "phaser";

class Scene1 extends Scene {
  constructor() {
    super("bootGame");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
  }
}


class Scene2 extends Scene {
  background: Phaser.GameObjects.Image;
  ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image;
  pacman: Phaser.GameObjects.GameObject;
  ghost: Phaser.GameObjects.GameObject;

  constructor() {
    super("playGame");
  }

  preload() {
    this.load.image("background", "img/background.png");
    this.load.image("ship", "img/ship.png");
    this.load.image("ship2", "img/ship2.png");
    this.load.image("ship3", "img/ship3.png");
  }

  create() {
    this.background = this.add.image(0,0,"background");
    this.background.setOrigin(0,0);

    this.ship1 = this.add.image(config.width/2 - 50, config.height/2, "ship");
    this.ship2 = this.add.image(config.width/2, config.height/2, "ship2");
    this.ship3 = this.add.image(config.width/2 + 50, config.height/2, "ship3");

    this.pacman = this.add.circle(config.width/2 - 50, config.height/2 - 50, 25, 0xff0000);
    this.ghost = this.add.star(config.width/2 + 50, config.width/2 + 50, 4, 50, 50, 0xff0000);


    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
  }
}

var config = {
  width: 256,
  height: 272,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  scale: {
    mode: Scale.FIT
  }
}

window.onload = function () {
  var game = new Game(config);
}


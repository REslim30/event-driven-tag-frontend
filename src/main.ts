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
import { Game } from "phaser";

import { config } from "./phaser/config";
import { ClassicMap } from "./phaser/ClassicMap";

/* class Scene1 extends Scene { */
/*   constructor() { */
/*     super("bootGame"); */
/*   } */

/*   create() { */
/*     this.add.text(20, 20, "Loading game..."); */
/*     this.scene.start("playGame"); */
/*   } */
/* } */

// Set scenes to Game here to avoid circular dependencies
config.scene = [ ClassicMap ];

window.onload = function () {
  var game = new Game(config);
}


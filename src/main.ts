/* import * as io from "socket.io-client" */

/* const socket = io("http://192.168.1.28:3000"); */

/* socket.on("connect", (value: any) => { */
/*     console.log(value); */
/* }); */

/* socket.on("broadcast", (value: number) => { */
/*     console.log(value); */
/*     alert(value); */
/* }); */

import { Game } from "phaser";
import { config } from "./phaser/config";
import $ from "jquery";
import { fromEvent } from "rxjs";

window.onload = function () {

  // How connect page is loaded
  /* $("#app").load("html/connect.html"); */
  // How lobby page is loaded
  /* $("#app").load("html/lobby.html"); */

  // How Connector can listen to events
  /* fromEvent(<HTMLElement>document.getElementById("app"), "touchend") */
  /*   .subscribe((event: TouchEvent) => { */
      
  /*   }); */

  // How game is started
  var game = new Game(config);
}


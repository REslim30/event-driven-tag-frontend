import { Game } from "phaser";
import { config } from "./phaser/config";
import { ClassicMap } from "./phaser/ClassicMap"

let phaserGame: Phaser.Game;
let socket: SocketIOClient.Socket;
let phaserScene: ClassicMap;

export var game = {
  start(inSocket: SocketIOClient.Socket) {
    socket = inSocket;
    phaserGame = new Game(config);
    console.log(phaserGame.scene);

    socket.on("role", (role: string) => {
      
    });
  },
  end() {
    phaserGame.destroy(true);
  }
}

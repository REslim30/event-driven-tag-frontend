import { Game } from "phaser";
import { config } from "./phaser/config";
import $ from "jquery";
import connectPage from "./page/connectHTML";
import lobbyPage from "./page/lobbyHTML";

// Class representing client FSM
// You can find the FSM diagram in logbook
export class ClientFSM {
  // States
  private readonly CONNECT: number = 0;
  private readonly LOBBY: number = 1;
  private readonly GAME: number = 2;
  private state: number = -1;

  // Private fields
  private game: Phaser.Game;

  constructor() {
    this.initialize();
  }

  //Initialize should be private since only
  //contructor calls it
  private initialize(): void {
    this.next(this.CONNECT);
  }

  // Entry actions
  private next(newState: number): void {
    this.state = newState;

    switch (this.state) {
      case this.CONNECT:
        console.log(connectPage);
        $("#app").html(connectPage);
        return;
      
      case this.LOBBY:
        console.log(lobbyPage);
        $("#app").html(lobbyPage);
        return;
      
      case this.GAME:
        $("#app").empty();
        this.game = new Game(config);
        return;
      
      default:
        console.log("next default.");
        return;
    }
  }

  // *** EVENTS ***
  public serverDisconnect(): void {
    switch (this.state) {
      case this.LOBBY:
        alert("Server Disconected.");
        this.next(this.CONNECT);
        break
      
      case this.GAME:
        this.game.destroy(true);
        alert("Server Disconected.");
        this.next(this.CONNECT);
        break
      
      
      // This shouldn't happen for other states
      // And if it does then it doesn't matter
      // But log anyway just in case.
      default:
        console.log("serverDisconnect default.");
        break
    }
  }

  public serverReject(): void {
    switch (this.state) {
      case this.CONNECT:
        alert("Server full");
        return;
      

      default:
        console.log("serverReject default.");
        return;
    }
  }

  public serverConnect(): void {
    switch (this.state) {
      case this.CONNECT:
        this.next(this.LOBBY);
        return;
      
      default:
        console.log("serverConnect default");
        return;
    }
  }

  public serverGameStart(): void {
    switch (this.state) {
      case this.LOBBY:
        this.next(this.GAME);
        break
      
      default:
        console.log("gameStart default");
        break
    }
  }
}

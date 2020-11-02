import { Game } from "phaser";
import { config } from "./phaser/config";
import connectPage from "./page/connectHTML";
import lobbyPage from "./page/lobbyHTML";
import $ from "jquery";

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
        (document.getElementById("app") as HTMLElement).innerHTML = connectPage;
        return;
      
      case this.LOBBY:
        (document.getElementById("app") as HTMLElement).innerHTML = lobbyPage;
        return;
      
      case this.GAME:
        (document.getElementById("app") as HTMLElement).innerHTML = "";
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
        this.next(this.CONNECT);
        alert("Server Disconected.");
        break
      
      case this.GAME:
        this.game.destroy(true);
        this.next(this.CONNECT);
        alert("Server Disconected.");
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
      case this.LOBBY:
        alert("Server full");
        this.next(this.CONNECT);
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
        console.log("serverGameStart default");
        break
    }
  }

  // Takes a string of who won
  public serverGameEnd(winner: string): void {
    switch (this.state) {
      case this.GAME:
        this.next(this.LOBBY);
        alert("Game is over! " + winner + " Won!");
        break;
      
      default:
        console.log("serverGameEnd default.");
        break;
    }
  }

  public lobbyUpdate(lobby: Array<string>): void {
    switch (this.state) {
      case this.LOBBY:
        // Add lobby to the lobby list
        $("#lobby-list").empty();
        lobby.forEach((element: string) => {
          $("#lobby-list")
            .append($("<li></li>").text(element));
        });
        break;
      
      
      default:
        console.log("lobbyUpdate default.");
        break;
    }
  }

  public connectClick(): void {
    switch (this.state) {
      case this.CONNECT:
        alert("Attempting connection...");
        break;
      
      default:
        console.log("connectClick default.");
        break;
    }
  }

  public startClick(): void {
    switch (this.state) {
      case this.LOBBY:
        alert("Waiting for server to start...");
        break;
      
      default:
        console.log("startClick default.");
        break;
    }
  }

  public exitClick(): void {
    switch (this.state) {
      case this.GAME:
        alert("Disconnected from server.");
        this.game.destroy(true);
        this.next(this.CONNECT);
        break;
      
      default:
        console.log("exitClick default.");
        break;
    }
  }
}

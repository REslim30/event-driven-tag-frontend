import { Game } from "phaser";
import { config } from "./phaser/config";
import $ from "jquery";

// Class representing client FSM
// You can find the FSM diagram in logbook
export class ClientFSM {
  // States
  private readonly CONNECT: number = 0;
  private readonly LOBBY: number = 1;
  private readonly GAME: number = 2;

  // Private fields

  constructor() {
    this.initialize();
  }

  //Initialize should be private since only
  //contructor calls it
  private initialize(): void {
    
  }

  private next(): void {
    
  }
}

import { Scene } from "phaser";
import { config } from "./config";
import { setSwipe, Direction } from "./swipe";
import { Subject } from "rxjs";

export class ClassicMap extends Scene {
  map: Phaser.Tilemaps.Tilemap;
  ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image;
  pacman: Phaser.GameObjects.GameObject;
  ghost: Phaser.GameObjects.GameObject;
  swipe: any;
  gamepad: Phaser.GameObjects.Image;
  player: any;
  worldLayer: Phaser.Tilemaps.StaticTilemapLayer;

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
  }

  create() {
    // The map
    this.map = this.make.tilemap({ key: "classic-map" });
    const tileset = this.map.addTilesetImage("Random", "tiles");

    const belowLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("bottom", tileset, 0, 0);
    this.worldLayer = this.map.createStaticLayer("maze", tileset, 0, 0);

    this.worldLayer.setCollisionByProperty({ collides: true });

    // Create player
    this.player = this.physics.add.image(8,32, "chaser");
    this.physics.add.collider(this.player, this.worldLayer);
    this.player.direction = null;
    this.player.setOrigin(0,0);

    // Set gamepad
    this.gamepad = this.add.image(<number>config.width/2, <number>config.height*0.80, "gamepad");
    this.gamepad.scale = (0.5*<number>config.width)/this.gamepad.width;
    let swipe: Subject<Direction> = setSwipe(this.gamepad);
    
    swipe.subscribe((direction: Direction) => {
      switch (direction) {
        case Direction.Up:
          this.player.direction = Direction.Up;
          break

        case Direction.Down:
          this.player.direction = Direction.Down;
          break
        
        case Direction.Left:
          this.player.direction = Direction.Left;
          break
        
        case Direction.Right:
          this.player.direction = Direction.Right;
          break

        default:
          throw TypeError("Unknown direction: " + direction);
      }
    });

    /* setInterval(() => { */
    /*   // Only change direction if there is a path and we are at the center of a tile */
    /*   let xPos: number = Math.trunc(this.player.body.x/8); */
    /*   let yPos: number = Math.trunc(this.player.body.y/8); */
    /*   switch (this.player.direction) { */
    /*     case Direction.Up: */
    /*       if (this.worldLayer.hasTileAt(xPos, yPos-1) == false) { */
    /*         this.player.x = (xPos)*8; */ 
    /*         this.player.y = (yPos - 1)*8; */ 
    /*       } */
    /*       break */

    /*     case Direction.Down: */
    /*       if (this.worldLayer.hasTileAt(xPos, yPos+1) == false) { */
    /*         this.player.x = (xPos)*8; */ 
    /*         this.player.y = (yPos + 1)*8; */ 
    /*       } */
    /*       break */

    /*     case Direction.Left: */
    /*       if (this.worldLayer.hasTileAt(xPos-1, yPos) == false) { */
    /*         this.player.x = (xPos - 1)*8; */ 
    /*         this.player.y = (yPos)*8; */ 
    /*       } */
    /*       break */

    /*     case Direction.Right: */
    /*       if (this.worldLayer.hasTileAt(xPos+1, yPos) == false) { */
    /*         this.player.x = (xPos + 1)*8; */ 
    /*         this.player.y = (yPos)*8; */ 
    /*       } */
    /*       break */
        
    /*     default: */
    /*       break */
    /*   } */
    /* }, 500); */
  }

}

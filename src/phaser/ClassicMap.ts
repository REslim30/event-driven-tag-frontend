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
    const worldLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("maze", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    });

    this.player = this.physics.add.image(8,32, "chaser");
    this.player.setOrigin(0,0);

    this.physics.add.collider(this.player, worldLayer);

    // Set gamepad
    this.gamepad = this.add.image(<number>config.width/2, <number>config.height*0.80, "gamepad");
    this.gamepad.scale = (0.5*<number>config.width)/this.gamepad.width;
    let swipe: Subject<Direction> = setSwipe(this.gamepad);
    
    let speed = 50;
    swipe.subscribe((direction: Direction) => {
      switch (direction) {
        case Direction.Up:
          this.player.body.setVelocityY(-speed);
          this.player.body.setVelocityX(0);
          break

        case Direction.Down:
          this.player.body.setVelocityY(speed);
          this.player.body.setVelocityX(0);
          break
        
        case Direction.Left:
          this.player.body.setVelocityY(0);
          this.player.body.setVelocityX(-speed);
          break
        
        case Direction.Right:
          this.player.body.setVelocityY(0);
          this.player.body.setVelocityX(speed);
          break

        default:
          throw TypeError("Unknown direction: " + direction);
      }
    });
  }
}

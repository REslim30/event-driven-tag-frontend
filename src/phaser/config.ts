import { Scale } from "phaser";
import { ClassicMap } from "./ClassicMap";

// Set width here
// Since on average phone screens are 18:9 or 19:8
// We set height to 2*width
let width: number = 224;

export let config: Phaser.Types.Core.GameConfig = {
  width: width,
  height: width*2,
  backgroundColor: 0xFFFFFF,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_HORIZONTALLY
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  parent: "app",
  scene: ClassicMap
}

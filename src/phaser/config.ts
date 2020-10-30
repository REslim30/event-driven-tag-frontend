import { Scale } from "phaser";

export let config: Phaser.Types.Core.GameConfig = {
  width: 256,
  height: 512,
  backgroundColor: 0x000000,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_HORIZONTALLY
  }
}

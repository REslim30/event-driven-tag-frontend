// Module that sets swipe controls onto a Phaser Game object
// Returns a string subject that emits <enum>Direction
import { Swipe } from 'phaser3-rex-plugins/plugins/gestures.js';
import { Subject } from "rxjs";

export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export function setSwipe(gameObject: Phaser.GameObjects.GameObject): Subject<Direction> {
  // testing swipe
  let swipe = new Swipe(gameObject, {
    enable: true,
    threshold: 10,
    velocityThreshold: 500,
    dir: "4dir"
  });

  let subject: Subject<Direction> = new Subject<Direction>();

  // Hook up swipes to the Subject
  swipe.on('swipe', function(swipe: any, gameObject: Phaser.GameObjects.Image, lastPointer: any) {
    if (swipe.left) {
      gameObject.angle = -90;
      subject.next(Direction.Left);
    } else if (swipe.right) {
      gameObject.angle = 90;
      subject.next(Direction.Right);
    } else if (swipe.down) {
      gameObject.angle = 180;
      subject.next(Direction.Down);
    } else if (swipe.up) {
      gameObject.angle = 0;
      subject.next(Direction.Up);
    }
  });
  
  return subject;
}



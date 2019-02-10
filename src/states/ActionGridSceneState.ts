import {Action} from '../actions/Action';
import {GridScene} from '../scenes/GridScene';
import {GridSceneState} from './GridSceneState';

export class ActionGridSceneState extends GridSceneState {
  action: Action;

  constructor(scene: GridScene, action: Action, guid: string) {
    super(scene, guid);
    this.action = action;
  }

  // This is next:  configure to prompt either the player or AI
  // to complete the Action

  // When complete emit the guid
  // entry() {}

  // ---- Old code that probably applies here somehow ----
  // const movingEntity = new SpriteEntity(this, 'mover', 'warrior', `3,2`);
  // moveAction = new MoveAction(movingEntity, 'quickMove');

  // movingEntity.sprite.setInteractive();
  // movingEntity.sprite.on('pointerdown', () => {
  //   isMoving = !isMoving;
  //   if (isMoving) {
  //     console.log('initiating move');
  //   } else {
  //     console.log('turning move state off');
  //   }
  // });

  // const addInteractions = (sprite: Phaser.GameObjects.Sprite) => {
  //   sprite.setInteractive();
  //   sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
  //     if (isMoving) {
  //       moveAction.setMoveDestination(
  //           sprite.getData('cellData').asAxialString());

  //       if (moveAction.isValid()) {
  //         moveAction.execute();
  //       }
  //     }
  //   });
  // };

  exit() {}
}
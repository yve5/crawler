import Phaser from 'phaser';

const randomDirection = (exclude) => {
  let newDirection = Phaser.Math.Between(0, 3);

  while (newDirection === exclude) {
    newDirection = Phaser.Math.Between(0, 3);
  }

  return newDirection;
};

export default class Lizard extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.anims.play('lizard-idle');

    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision,
      this
    );

    this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.direction = randomDirection(this.direction);
      },
      loop: true,
    });
  }

  destroy(fromScene) {
    this.moveEvent.destroy();
    super.destroy(fromScene);
  }

  handleTileCollision(go) {
    if (go !== this) {
      return;
    }
    this.direction = randomDirection(this.direction);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    const speed = 50;

    switch (this.direction) {
      case 'UP':
        this.setVelocity(0, -speed);
        break;

      case 'DOWN':
        this.setVelocity(0, speed);
        break;

      case 'LEFT':
        this.setVelocity(-speed, 0);
        break;

      case 'RIGHT':
      default:
        this.setVelocity(speed, 0);
        break;
    }
  }
}

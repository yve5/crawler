import Phaser from 'phaser';
import Graphics from '../assets/Graphics';

const speed = 20;

export default class Slime {
  constructor(x, y, scene) {
    this.sprite = scene.physics.add.sprite(x, y, Graphics.slime.name, 0);
    this.sprite.setSize(12, 10);
    this.sprite.setOffset(10, 14);
    this.sprite.anims.play(Graphics.slime.animations.idle.key);
    this.sprite.setDepth(10);

    this.body = this.sprite.body;
    this.nextAction = 0;
    this.body.bounce.set(0, 0);
    this.body.setImmovable(true);
  }

  update(time) {
    if (time < this.nextAction) {
      return;
    }

    if (Phaser.Math.Between(0, 1) === 0) {
      this.body.setVelocity(0);
      this.sprite.anims.play(Graphics.slime.animations.idle.key, true);
    } else {
      this.sprite.anims.play(Graphics.slime.animations.move.key, true);
      const direction = Phaser.Math.Between(0, 3);
      this.body.setVelocity(0);

      if (!this.body.blocked.left && direction === 0) {
        this.body.setVelocityX(-speed);
      } else if (!this.body.blocked.right && direction <= 1) {
        this.body.setVelocityX(speed);
      } else if (!this.body.blocked.up && direction <= 2) {
        this.body.setVelocityY(-speed);
      } else if (!this.body.blocked.down && direction <= 3) {
        this.body.setVelocityY(speed);
      } else {
        console.warn(`Couldn't find direction for slime: ${direction}`);
      }
    }

    this.nextAction = time + Phaser.Math.Between(1000, 3000);
  }

  kill() {
    this.sprite.anims.play(Graphics.slime.animations.death.key, false);
    this.sprite.disableBody();
  }
}

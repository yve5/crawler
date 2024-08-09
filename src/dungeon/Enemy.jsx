import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.speed = 50;
    this.direction = new Phaser.Math.Vector2(1, 0);
  }

  update() {
    this.setVelocity(
      this.direction.x * this.speed,
      this.direction.y * this.speed
    );
    // Inverse direction on hitting world bounds
    if (this.body.blocked.left || this.body.blocked.right) {
      this.direction.x *= -1;
    }
    if (this.body.blocked.up || this.body.blocked.down) {
      this.direction.y *= -1;
    }
  }
}

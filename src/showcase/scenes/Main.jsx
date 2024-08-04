import { Scene } from 'phaser';

const ASSETS_PATH = '/crawler/assets/showcase/';

class Showcase extends Scene {
  preload() {
    this.load.image('sky', `${ASSETS_PATH}space3.png`);
    this.load.image('logo', `${ASSETS_PATH}phaser3.png`);
    this.load.image('red', `${ASSETS_PATH}red.png`);
  }

  create() {
    this.add.image(400, 300, 'sky');

    const particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    });

    const logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);
  }
}

export default Showcase;

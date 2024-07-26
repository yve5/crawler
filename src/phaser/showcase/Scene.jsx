import { Scene } from 'phaser';

// const { REACT_APP_SHOWCASE_ASSETS_PATH: assetsPath } = process.env;

import Space3 from '../resources/space3.png';
import Phaser3 from '../resources/phaser3.png';
import Red from '../resources/red.png';

// const assetsPath = '/';

class Showcase extends Scene {
  preload() {
    // this.load.image('sky', `${assetsPath}space3.png`);
    // this.load.image('logo', `${assetsPath}phaser3-logo.png`);
    // this.load.image('red', `${assetsPath}red.png`);

    this.load.image('sky', Space3);
    this.load.image('logo', Phaser3);
    this.load.image('red', Red);
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

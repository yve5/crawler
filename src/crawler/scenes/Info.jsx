import Phaser from 'phaser';
// import Fonts from '../assets/Fonts';

export default class InfoScene extends Phaser.Scene {
  constructor() {
    super({ key: 'InfoScene' });
  }

  preload() {
    this.load.bitmapFont(
      'default',
      '/crawler/CasualEncounter.png',
      '/crawler/CasualEncounter.fnt'
    );
  }

  create() {
    this.text = this.add.text(100, 100, 'Phaser\nShadow FX', {
      // align: 'center',
      color: '#ffffff',
    });

    // this.text = this.add.dynamicBitmapText(25, 25, 'default', '', 12);
    this.text.setAlpha(0.7);

    this.lastUpdate = 0;
  }

  update(time) {
    if (time > this.lastUpdate + 100) {
      this.text.setText([
        'Dungeon Dash!',
        '',
        'Use arrow keys to walk around the map!',
        'Press space while moving to dash-attack!',
        '(debug: Q, tilesets: R)',
        '',
        'Credits & more information at',
        'https://github.com/mipearson/dungeondash',
        '',
        `FPS: ${Math.round(this.game.loop.actualFps)}`,
      ]);

      this.lastUpdate = time;
    }
  }
}

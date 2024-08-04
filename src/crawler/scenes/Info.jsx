import Phaser from 'phaser';

const FONT_PATH = '/crawler/assets/fonts/';

export default class InfoScene extends Phaser.Scene {
  constructor() {
    super({ key: 'InfoScene' });
  }

  preload() {
    this.load.bitmapFont(
      'default',
      `${FONT_PATH}CasualEncounter.png`,
      `${FONT_PATH}CasualEncounter.fnt`
    );
  }

  create() {
    this.text = this.add.text(50, 50, '', { color: '#ffffff' });
    this.text = this.add.dynamicBitmapText(25, 25, 'default', '', 12);
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
        `FPS: ${Math.round(this.game.loop.actualFps)}`,
      ]);

      this.lastUpdate = time;
    }
  }
}

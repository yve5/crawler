import Phaser from 'phaser';

const ASSETS_PATH = 'crawler/assets/dungeon/';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image(`${ASSETS_PATH}tiles/dungeon_tiles_extruded.png`);
    this.load.tilemapTiledJSON(
      'dungeon',
      `${ASSETS_PATH}tiles/dungeon-01.json`
    );

    this.load.atlas(
      'faune',
      `${ASSETS_PATH}character/fauna.png`,
      `${ASSETS_PATH}character/fauna.json`
    );
    this.load.atlas(
      'lizard',
      `${ASSETS_PATH}enemies/lizard.png`,
      `${ASSETS_PATH}enemies/lizard.json`
    );
    this.load.atlas(
      'treasure',
      `${ASSETS_PATH}items/treasure.png`,
      `${ASSETS_PATH}items/treasure.json`
    );

    this.load.image('ui-heart-empty', `${ASSETS_PATH}ui/ui_heart_empty.png`);
    this.load.image('ui-heart-full', `${ASSETS_PATH}ui/ui_heart_full.png`);

    this.load.image('knife', `${ASSETS_PATH}weapons/weapon_knife.png`);
  }

  create() {
    this.scene.start('game');
  }
}

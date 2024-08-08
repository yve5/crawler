import Phaser from 'phaser';
import Enemy from './Enemy';
import Player from './Player';

export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DungeonScene' });
  }

  preload() {
    // Charger les assets
    this.load.image('tileset', '/crawler/assets/test/tileset.png');
    this.load.image('player', '/crawler/assets/test/player.png');
    this.load.image('enemy', '/crawler/assets/test/enemy.png');
  }

  create() {
    // Générer une carte simple avec un tableau 2D
    const level = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const tileSize = 32;

    this.map = this.make.tilemap({
      data: level,
      tileWidth: tileSize,
      tileHeight: tileSize,
    });
    this.tiles = this.map.addTilesetImage('tileset');
    this.layer = this.map.createLayer(0, this.tiles, 0, 0);

    // Configurer les collisions sur les murs (tuiles avec ID 0)
    this.layer.setCollision(0);

    // Créer le joueur
    this.player = new Player(this, tileSize * 2, tileSize * 2);

    // Créer un ennemi
    this.enemy = new Enemy(this, tileSize * 4, tileSize * 5);

    // Configurer les collisions
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.enemy, this.layer);
    this.physics.add.overlap(
      this.player,
      this.enemy,
      this.onPlayerHit,
      null,
      this
    );

    // Configurer les contrôles
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update(this.cursors);
    this.enemy.update();
  }

  onPlayerHit(player, enemy) {
    console.warn('Le joueur a été touché par un ennemi !');
    // Vous pouvez ajouter des mécanismes comme la réduction des points de vie ici.

    this.enemy.update();
  }
}

import Phaser from 'phaser';

// import { debugDraw } from '../utils/debug'
import { createLizardAnims } from '../anims/EnemyAnims';
import { createCharacterAnims } from '../anims/CharacterAnims';
import { createChestAnims } from '../anims/TreasureAnims';

import Lizard from '../enemies/Lizard';

// import '../characters/Faune'
// import Faune from '../characters/Faune'

// import { sceneEvents } from '../events/EventsCenter'
// import Chest from '../items/Chest'

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.scene.run('game-ui');

    createCharacterAnims(this.anims);
    createLizardAnims(this.anims);
    createChestAnims(this.anims);

    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16, 1, 2);

    // map.createStaticLayer('Ground', tileset);

    // this.knives = this.physics.add.group({
    //   classType: Phaser.Physics.Arcade.Image,
    //   maxSize: 3,
    // });

    // this.faune = this.add.faune(128, 128, 'faune');
    // this.faune.setKnives(this.knives);

    // const wallsLayer = map.createStaticLayer('Walls', tileset);

    // wallsLayer.setCollisionByProperty({ collides: true });

    // const chests = this.physics.add.staticGroup({
    //   classType: Chest,
    // });
    // const chestsLayer = map.getObjectLayer('Chests');
    // chestsLayer.objects.forEach((chestObj) => {
    //   chests.get(
    //     chestObj.x + chestObj.width * 0.5,
    //     chestObj.y - chestObj.height * 0.5,
    //     'treasure'
    //   );
    // });

    // this.cameras.main.startFollow(this.faune, true);

    this.lizards = this.physics.add.group({
      classType: Lizard,
      createCallback: (go) => {
        const lizGo = go;
        lizGo.body.onCollide = true;
      },
    });

    // const lizardsLayer = map.getObjectLayer('Lizards');
    // lizardsLayer.objects.forEach((lizObj) => {
    //   this.lizards.get(
    //     lizObj.x + lizObj.width * 0.5,
    //     lizObj.y - lizObj.height * 0.5,
    //     'lizard'
    //   );
    // });

    // this.physics.add.collider(this.faune, wallsLayer);
    // this.physics.add.collider(this.lizards, wallsLayer);

    // this.physics.add.collider(
    //   this.faune,
    //   chests,
    //   this.handlePlayerChestCollision,
    //   undefined,
    //   this
    // );

    // this.physics.add.collider(
    //   this.knives,
    //   wallsLayer,
    //   this.handleKnifeWallCollision,
    //   undefined,
    //   this
    // );
    // this.physics.add.collider(
    //   this.knives,
    //   this.lizards,
    //   this.handleKnifeLizardCollision,
    //   undefined,
    //   this
    // );

    // this.playerLizardsCollider = this.physics.add.collider(
    //   this.lizards,
    //   this.faune,
    //   this.handlePlayerLizardCollision,
    //   undefined,
    //   this
    // );
  }

  handlePlayerChestCollision(obj1, obj2) {
    const chest = obj2;
    this.faune.setChest(chest);
  }

  handleKnifeWallCollision(obj1) {
    this.knives.killAndHide(obj1);
  }

  handleKnifeLizardCollision(obj1, obj2) {
    this.knives.killAndHide(obj1);
    this.lizards.killAndHide(obj2);
  }

  handlePlayerLizardCollision(obj1, obj2) {
    const lizard = obj2;

    const dx = this.faune.x - lizard.x;
    const dy = this.faune.y - lizard.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

    this.faune.handleDamage(dir);

    // sceneEvents.emit('player-health-changed', this.faune.health);

    if (this.faune.health <= 0) {
      this.playerLizardsCollider?.destroy();
    }
  }

  update() {
    if (this.faune) {
      this.faune.update(this.cursors);
    }
  }
}

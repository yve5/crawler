import Phaser from 'phaser';
import Dungeoneer from 'dungeoneer';

import Tile from './Tile';
import Slime from './Slime';
import Graphics from '../assets/Graphics';
// import DungeonScene from '../scenes/DungeonScene';
import { TILE_TYPE_NONE, TILE_TYPE_WALL } from '../assets/constants';

export default class Map {
  constructor(width, height, scene) {
    const dungeon = Dungeoneer.build({ width, height });
    this.rooms = dungeon.rooms;

    this.width = width;
    this.height = height;

    this.tiles = [];
    for (let y = 0; y < height; y += 1) {
      this.tiles.push([]);
      for (let x = 0; x < width; x += 1) {
        const tileType = Tile.tileTypeFor(dungeon.tiles[x][y].type);
        this.tiles[y][x] = new Tile(tileType, x, y, this);
      }
    }

    const toReset = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const tile = this.tiles[y][x];
        if (tile.type === TILE_TYPE_WALL && tile.isEnclosed()) {
          toReset.push({ y, x });
        }
      }
    }

    toReset.forEach((d) => {
      this.tiles[d.y][d.x] = new Tile(TILE_TYPE_NONE, d.x, d.y, this);
    });

    const roomNumber = Math.floor(Math.random() * dungeon.rooms.length);

    const firstRoom = dungeon.rooms[roomNumber];
    this.startingX = Math.floor(firstRoom.x + firstRoom.width / 2);
    this.startingY = Math.floor(firstRoom.y + firstRoom.height / 2);

    this.tilemap = scene.make.tilemap({
      tileWidth: Graphics.environment.width,
      tileHeight: Graphics.environment.height,
      width,
      height,
    });

    const dungeonTiles = this.tilemap.addTilesetImage(
      Graphics.environment.name,
      Graphics.environment.name,
      Graphics.environment.width,
      Graphics.environment.height,
      Graphics.environment.margin,
      Graphics.environment.spacing
    );

    const groundLayer = this.tilemap
      .createBlankDynamicLayer('Ground', dungeonTiles, 0, 0)
      .randomize(
        0,
        0,
        this.width,
        this.height,
        Graphics.environment.indices.floor.outerCorridor
      );

    this.slimes = [];

    for (let index = 0; index < dungeon.rooms.length; index += 1) {
      const room = dungeon.rooms[index];

      groundLayer.randomize(
        room.x - 1,
        room.y - 1,
        room.width + 2,
        room.height + 2,
        Graphics.environment.indices.floor.outer
      );

      if (!(room.height < 4 || room.width < 4)) {
        const roomTL = this.tilemap.tileToWorldXY(room.x + 1, room.y + 1);
        const roomBounds = this.tilemap.tileToWorldXY(
          room.x + room.width - 1,
          room.y + room.height - 1
        );
        const numSlimes = Phaser.Math.Between(1, 3);

        for (let i = 0; i < numSlimes; i += 1) {
          this.slimes.push(
            new Slime(
              Phaser.Math.Between(roomTL.x, roomBounds.x),
              Phaser.Math.Between(roomTL.y, roomBounds.y),
              scene
            )
          );
        }
      }
    }
    this.tilemap.convertLayerToStatic(groundLayer).setDepth(1);

    const wallLayer = this.tilemap.createBlankDynamicLayer(
      'Wall',
      dungeonTiles,
      0,
      0
    );

    this.doorLayer = this.tilemap.createBlankDynamicLayer(
      'Door',
      dungeonTiles,
      0,
      0
    );

    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        const tile = this.tiles[y][x];
        if (tile.type === TILE_TYPE_WALL) {
          wallLayer.putTileAt(tile.spriteIndex(), x, y);
        } else if (tile.type === 'TILE_TYPE_DOOR') {
          this.doorLayer.putTileAt(tile.spriteIndex(), x, y);
        }
      }
    }
    wallLayer.setCollisionBetween(0, 0x7f);
    const collidableDoors = [
      Graphics.environment.indices.doors.horizontal,
      Graphics.environment.indices.doors.vertical,
    ];
    this.doorLayer.setCollision(collidableDoors);

    this.doorLayer.setTileIndexCallback(
      collidableDoors,
      (_, tile) => {
        this.doorLayer.putTileAt(
          Graphics.environment.indices.doors.destroyed,
          tile.x,
          tile.y
        );
        this.tileAt(tile.x, tile.y).open();
        scene.fov.recalculate();
      },
      this
    );
    this.doorLayer.setDepth(3);

    this.wallLayer = this.tilemap.convertLayerToStatic(wallLayer);
    this.wallLayer.setDepth(2);
  }

  tileAt(x, y) {
    if (y < 0 || y >= this.height || x < 0 || x >= this.width) {
      return null;
    }
    return this.tiles[y][x];
  }

  withinRoom(x, y) {
    return (
      this.rooms.find((r) => {
        const { top, left, right, bottom } = r.getBoundingBox();
        return (
          y >= top - 1 && y <= bottom + 1 && x >= left - 1 && x <= right + 1
        );
      }) !== undefined
    );
  }
}

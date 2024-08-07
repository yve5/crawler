import Graphics from '../assets/Graphics';
import {
  TILE_TYPE_DOOR,
  TILE_TYPE_NONE,
  TILE_TYPE_WALL,
} from '../assets/constants';

export default class Tile {
  static tileTypeFor(type) {
    if (type === 'wall') {
      return TILE_TYPE_WALL;
    }
    if (type === 'door') {
      return TILE_TYPE_DOOR;
    }
    return TILE_TYPE_NONE;
  }

  constructor(type, x, y, map) {
    this.type = type;
    this.collides = type !== TILE_TYPE_DOOR;
    this.map = map;
    this.x = x;
    this.y = y;
    this.seen = false;
    this.desiredAlpha = 1;
    this.corridor = !map.withinRoom(x, y);
  }

  open() {
    this.collides = false;
  }

  neighbours() {
    return {
      n: this.map.tileAt(this.x, this.y - 1),
      s: this.map.tileAt(this.x, this.y + 1),
      w: this.map.tileAt(this.x - 1, this.y),
      e: this.map.tileAt(this.x + 1, this.y),
      nw: this.map.tileAt(this.x - 1, this.y - 1),
      ne: this.map.tileAt(this.x + 1, this.y - 1),
      sw: this.map.tileAt(this.x - 1, this.y + 1),
      se: this.map.tileAt(this.x + 1, this.y + 1),
    };
  }

  isEnclosed() {
    return (
      Object.values(this.neighbours()).filter(
        (t) => !t || (t.type === TILE_TYPE_WALL && t.corridor === this.corridor)
      ).length === 8
    );
  }

  spriteIndex() {
    const modifier = this.type === TILE_TYPE_WALL && this.corridor ? 8 : 0;
    return this.rawIndex() + modifier;
  }

  rawIndex() {
    const neighbours = this.neighbours();

    const n =
      neighbours.n &&
      neighbours.n.type === TILE_TYPE_WALL &&
      neighbours.n.corridor === this.corridor;
    const s =
      neighbours.s &&
      neighbours.s.type === TILE_TYPE_WALL &&
      neighbours.s.corridor === this.corridor;
    const w =
      neighbours.w &&
      neighbours.w.type === TILE_TYPE_WALL &&
      neighbours.w.corridor === this.corridor;
    const e =
      neighbours.e &&
      neighbours.e.type === TILE_TYPE_WALL &&
      neighbours.e.corridor === this.corridor;

    const wDoor = neighbours.w && neighbours.w.type === TILE_TYPE_DOOR;
    const eDoor = neighbours.e && neighbours.e.type === TILE_TYPE_DOOR;

    const i = Graphics.environment.indices.walls;

    if (this.type === TILE_TYPE_WALL) {
      if (n && e && s && w) {
        return i.intersections.n_e_s_w;
      }
      if (n && e && s) {
        return i.intersections.n_e_s;
      }
      if (n && s && w) {
        return i.intersections.n_s_w;
      }
      if (e && s && w) {
        return i.intersections.e_s_w;
      }
      if (n && e && w) {
        return i.intersections.n_e_w;
      }

      if (e && s) {
        return i.intersections.e_s;
      }
      if (e && w) {
        return i.intersections.e_w;
      }
      if (s && w) {
        return i.intersections.s_w;
      }
      if (n && s) {
        return i.intersections.n_s;
      }
      if (n && e) {
        return i.intersections.n_e;
      }
      if (n && w) {
        return i.intersections.n_w;
      }

      if (w && eDoor) {
        return i.intersections.e_door;
      }
      if (e && wDoor) {
        return i.intersections.w_door;
      }

      if (n) {
        return i.intersections.n;
      }
      if (s) {
        return i.intersections.s;
      }
      if (e) {
        return i.intersections.e;
      }
      if (w) {
        return i.intersections.w;
      }

      return i.alone;
    }

    if (this.type === TILE_TYPE_DOOR) {
      if (n || s) {
        return Graphics.environment.indices.doors.vertical;
      }
      return Graphics.environment.indices.doors.horizontal;
    }

    return 0;
  }
}

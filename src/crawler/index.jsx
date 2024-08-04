import React from 'react';
import Phaser from 'phaser';
import Game from '../shared/Container';

import Info from './scenes/Info';
import Dungeon from './scenes/Dungeon';
import Reference from './scenes/Reference';

const Home = () => (
  <Game
    options={{
      type: Phaser.WEBGL,
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      render: {
        pixelArt: true,
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: {
            y: 0,
          },
        },
      },
      scene: [Dungeon, Info, Reference],
      //   scale: { mode: Phaser.Scale.RESIZE },
      banner: {
        hidePhaser: true,
      },
    }}
  />
);

export default Home;

import React from 'react';
import Phaser from 'phaser';

import Game from '../shared/Container';
import DungeonScene from './DungeonScene';

const Home = () => (
  <Game
    options={{
      type: Phaser.AUTO,
      width: 32 * 11,
      height: 32 * 11,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
      scene: [DungeonScene],
    }}
  />
);

export default Home;

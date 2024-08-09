import React from 'react';
import Phaser from 'phaser';

import Game from '../shared/Container';
import CheckersScene from './CheckersScene';

const Home = () => (
  <Game
    options={{
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: CheckersScene,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    }}
  />
);

export default Home;

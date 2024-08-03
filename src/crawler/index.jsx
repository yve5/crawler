import React from 'react';
import Phaser from 'phaser';
import Game from '../shared/Container';
// import Main from './scenes/Main';

import Info from './scenes/Info';

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
      scene: [
        // DungeonScene,
        Info,
        // ReferenceScene,
      ],
      //   scale: { mode: Phaser.Scale.RESIZE },
      banner: {
        hidePhaser: true,
      },
    }}
  />
);

export default Home;

import React from 'react';
import Phaser from 'phaser';

import Game from './scenes/Game';
import GameUI from './scenes/GameUI';
import Preloader from './scenes/Preloader';
import Container from '../shared/Container';

const Home = () => (
  <Container
    options={{
      type: Phaser.AUTO,
      width: 400,
      height: 250,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: [Preloader, Game, GameUI],
      scale: {
        zoom: 2,
      },
    }}
  />
);

export default Home;

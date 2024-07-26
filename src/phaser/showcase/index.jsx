import React from 'react';
import Game from '../nested/Game';
import Scene from './Scene';

const Home = () => (
  <Game
    options={{
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
        },
      },
      scene: [Scene],
      banner: {
        hidePhaser: true,
      },
    }}
  />
);

export default Home;

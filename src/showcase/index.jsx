import React from 'react';
import Game from '../shared/Container';
import Main from './scenes/Main';

const Home = () => (
  <Game
    options={{
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 200,
          },
        },
      },
      scene: [Main],
      banner: {
        hidePhaser: true,
      },
    }}
  />
);

export default Home;

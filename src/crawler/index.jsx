import React from 'react';
import Phaser from 'phaser';
// import SceneWatcherPlugin from 'phaser-plugin-scene-watcher';

import Game from '../shared/Container';
import InfoScene from './scenes/InfoScene';
import DungeonScene from './scenes/DungeonScene';
import ReferenceScene from './scenes/ReferenceScene';

const Home = () => (
  <Game
    options={{
      type: Phaser.WEBGL,
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      render: { pixelArt: true },
      physics: {
        default: 'arcade',
        arcade: { debug: false, gravity: { y: 0 } },
      },
      scene: [DungeonScene, InfoScene, ReferenceScene],

      //   scale: { mode: Phaser.Scale.RESIZE },
      // banner: {
      //   hidePhaser: true,
      // },
      // plugins: {
      //   global: [{ key: 'SceneWatcher', plugin: SceneWatcherPlugin, start: true }],
      // },
    }}
  />
);

export default Home;

import Phaser from 'phaser';
import ReferenceScene from './scenes/ReferenceScene.jsx';
import DungeonScene from './scenes/DungeonScene.jsx';
import InfoScene from './scenes/InfoScene.jsx';
// import SceneWatcherPlugin from 'phaser-plugin-scene-watcher';

new Phaser.Game({
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  render: { pixelArt: true },
  physics: { default: 'arcade', arcade: { debug: false, gravity: { y: 0 } } },
  scene: [DungeonScene, InfoScene, ReferenceScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  // plugins: {
  //   global: [{ key: 'SceneWatcher', plugin: SceneWatcherPlugin, start: true }],
  // },
});

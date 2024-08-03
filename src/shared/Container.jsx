import React, { useEffect, useRef } from 'react';
import { AUTO, Game } from 'phaser';

const GameContainer = ({ options }) => {
  const container = useRef(null);
  const game = useRef(null);

  useEffect(() => {
    if (!game.current) {
      game.current = new Game({
        ...options,
        type: AUTO,
        parent: container.current,
      });
    }

    return () => {
      if (!game.current) {
        game.current.destroy(true);
        game.current = null;
      }
    };
  }, []);

  return <div className="Game" ref={container} />;
};

export default GameContainer;

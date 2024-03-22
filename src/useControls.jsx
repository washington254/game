import { useState, useEffect } from 'react';

export const useControls = () => {
  const keys = { KeyW: 'forward', KeyS: 'backward', KeyA: 'left', KeyD: 'right', KeyE: 'interact' };
  const buttons = { 0: 'leftClick', 2: 'rightClick' };
  const moveFieldByKey = (key) => keys[key];
  const moveFieldByButton = (button) => buttons[button];

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    interact: false,
    leftClick: false,
    rightClick: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) =>
      setMovement((m) => ({
        ...m,
        [moveFieldByKey(e.code)]: true,
      }));
    const handleKeyUp = (e) =>
      setMovement((m) => ({
        ...m,
        [moveFieldByKey(e.code)]: false,
      }));
    const handleMouseDown = (e) =>
      setMovement((m) => ({
        ...m,
        [moveFieldByButton(e.button)]: true,
      }));
    const handleMouseUp = (e) =>
      setMovement((m) => ({
        ...m,
        [moveFieldByButton(e.button)]: false,
      }));

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [moveFieldByKey, moveFieldByButton]);

  return movement;
};

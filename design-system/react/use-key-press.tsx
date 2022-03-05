import { useState, useEffect } from "react";

// Hook
export function useKeyPress(targetKey: KeyboardEvent["key"]): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }: KeyboardEvent): void {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export function areKeysPressed(keys: any = [], keysPressed: any = []) {
  const required = new Set(keys);
  for (var elem of keysPressed) {
    required.delete(elem);
  }
  return required.size === 0;
}

export default function useMultiKeyPress() {
  const [keysPressed, setKeyPressed] = useState(
    new Set<KeyboardEvent["key"]>([])
  );

  function downHandler({ key }: KeyboardEvent) {
    setKeyPressed(keysPressed.add(key));
  }

  const upHandler = ({ key }: KeyboardEvent) => {
    keysPressed.delete(key);
    setKeyPressed(keysPressed);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keysPressed;
}

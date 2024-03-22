import { create } from 'zustand';

const createCharacterSlice = create((set) => ({
  direction: 'left',
  setDirection: (direction) => {
    set(() => ({ direction }));
  },
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  setPosition: (position) => set({ position }),
}));

export default createCharacterSlice;

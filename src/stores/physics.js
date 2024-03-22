import { create } from 'zustand';

const createPhysicsSlice = create((set) => ({
  hoverableObjects: [],
  addObjectAsHoverable: (object) => {
    set((state) => {
      if (state.hoverableObjects.find((element) => element.uuid === object.uuid)) return {};
      return {
        hoverableObjects: state.hoverableObjects.concat(object),
      };
    });
  },
  hoveredObject: null,
  setObjectAsHovered: (object) => {
    set(() => ({ hoveredObject: object }));
  },
}));

export default createPhysicsSlice;

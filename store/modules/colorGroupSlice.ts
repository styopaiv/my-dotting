import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pixelDataElement } from "./pixelData";

export type ColorGroup = {
  [key: string]: Exclude<pixelDataElement, "name">[];
};

export type PixelIndexInner = {
  [key: string]: string | undefined;
};
export type PixelIndexNested = {
  [key: string]: PixelIndexInner;
};

export interface ColorGroupState {
  data: ColorGroup;
  getNameByPixelIndex: PixelIndexNested;
}
const initialState: ColorGroupState = {
  data: {},
  getNameByPixelIndex: {},
};

const ColorGroupSlice = createSlice({
  name: "colorGroupSlice",
  initialState,
  reducers: {
    changeGroupName(
      state,
      action: PayloadAction<{ originalKey: string; newKey: string }>
    ) {
      const data = [...state.data[action.payload.originalKey]];
      state.data[action.payload.newKey] = data;
      delete state.data[action.payload.originalKey];
    },
    appendToGroup(
      state,
      action: PayloadAction<{
        key: string;
        data: Exclude<pixelDataElement, "name">[];
      }>
    ) {
      if (state.data[action.payload.key]) {
        console.log("existsststs");
        state.data[action.payload.key] = state.data[action.payload.key].concat(
          action.payload.data
        );
      } else {
        state.data[action.payload.key] = action.payload.data;
      }

      for (const pixelElement of action.payload.data) {
        const rowIndex = pixelElement.rowIndex;
        const columnIndex = pixelElement.columnIndex;
        const previousName =
          state.getNameByPixelIndex[rowIndex] &&
          state.getNameByPixelIndex[rowIndex][columnIndex];
        if (previousName) {
          let pixelElementIndexToDelete: undefined | number = undefined;
          if (state.data[previousName]) {
            for (let i = 0; i < state.data[previousName].length; i++) {
              const stateElement = state.data[previousName][i];
              if (
                stateElement.rowIndex === rowIndex &&
                stateElement.columnIndex === columnIndex
              ) {
                pixelElementIndexToDelete = i;
              }
            }
            if (pixelElementIndexToDelete) {
              state.data[previousName] = state.data[previousName].filter(
                (item, index) => index !== pixelElementIndexToDelete
              );
              if (state.data[previousName].length === 0) {
                delete state.data[previousName];
              }
            }
          }
        }
        if (!state.getNameByPixelIndex[rowIndex]) {
          state.getNameByPixelIndex[rowIndex] = {};
        }
        console.log("redux color group", Object.keys(state.data));
        console.log(
          "redux elements",
          state.data[Object.keys(state.data)[0]].length
        );
        state.getNameByPixelIndex[rowIndex][columnIndex] = action.payload.key;
      }
    },
  },
});

const { reducer, actions } = ColorGroupSlice;
export const { changeGroupName, appendToGroup } = actions;
export default reducer;

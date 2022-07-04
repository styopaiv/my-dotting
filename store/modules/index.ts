import { combineReducers } from "@reduxjs/toolkit";
import mouseEvent from "./mouseEvent";
import { undoable } from "../helper/undoable";
import pixelData from "./pixelData";
import pixelHistory from "./pixelHistory";
import brush from "./brush";
import selectedGroup from "./selectedGroup";
import draggableWindow from "./draggableWindow";
import docSlice from "./docSlice";
import colorGroupSlice from "./colorGroupSlice";

const rootReducer = combineReducers({
  mouseEvent,
  pixelData,
  pixelHistory,
  brush,
  selectedGroup,
  draggableWindow,
  docSlice,
  colorGroupSlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

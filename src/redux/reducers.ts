import EditorReducer from "../editorReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({editor: EditorReducer});

export default rootReducer;

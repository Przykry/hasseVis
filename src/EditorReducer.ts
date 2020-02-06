
const initialState = {

  };

const editorReducer = (state: any, action: any) => {
    if (typeof state === 'undefined') {
        return initialState;
      }
    switch(action.type){
        default:
            return state;
    }
}

export function onChangeEditor(value: String) {
    return {
        type: "ON_CHANGE_EDITOR",
        value
    };
};

export default editorReducer;
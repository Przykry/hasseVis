
import * as React from 'react'
import { connect } from 'react-redux'
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { onChangeEditor } from './editorReducer';


interface IEditorProps {
    onChangeEditor: (value: String) => void;
}


export class Editor extends React.Component<IEditorProps> {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const { onChangeEditor } = this.props;
        return (
            <div>
                <div/>
                <TextField
                    onChange={(e, v) => onChangeEditor(v)}
                    placeholder="Edytor"
                    label="Edytor"
                    multiline
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    editor: state
})

const mapDispatchToProps = dispatch => {
    return {
        onChangeEditor: (value: String) => dispatch(onChangeEditor(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)

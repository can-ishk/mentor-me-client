import React, { useContext } from "react";
import MDEditor, {
    commands,
    EditorContext
} from "@uiw/react-md-editor";


const PreviewButton = () => {
    const { preview, dispatch } = useContext(EditorContext);
    const click = () => {
        dispatch({
            preview: preview === "edit" ? "preview" : "edit"
        });
    };
    if (preview === "edit") {
        return (
            <button onClick={click}>Preview</button>
        );
    }
    return (
        <button onClick={click}>Edit</button>
    );
};


export default function MarkdownEditor({value, setValue}){
    const codePreview = {
        name: "preview",
        keyCommand: "preview",
        value: "preview",
        icon: <PreviewButton/>
      };

    return (
        <MDEditor
        value={value}
        preview="edit"
        extraCommands={[codePreview]}
        onChange={(val) => {
          setValue(val);
        }}
      />
    )
}

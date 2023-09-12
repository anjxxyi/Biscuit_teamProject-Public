import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'draft-js/dist/Draft.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'


// ***** Check below if using *****
// import EditorForm from '../components/layout/EditorForm'

function EditorForm () {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log(editorState);

  return (
    <div className="editorContent">
      <Editor
        wrapperClassName="editorWrapper"
        editorClassName="editorInner"
        toolbarClassName="editorToolbar"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          colorpicker: { display: false },
        }} 
        placeholder="Please Enter Text."
        localization={{locale: 'ko'}}
        defaultEditorState={editorState}
        onEditorStateChange={setEditorState}
      />
      <div className="codeView">
        <textarea
          className="editorTextArea"
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    </div>
  )
}

export default EditorForm
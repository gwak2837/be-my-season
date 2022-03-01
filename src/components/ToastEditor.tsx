import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { Editor, EditorProps } from '@toast-ui/react-editor'
import { LegacyRef } from 'react'

type EditorPropsWithRef = EditorProps & { editorRef: LegacyRef<Editor> }

function ToastEditor(props: EditorPropsWithRef) {
  return (
    <Editor
      initialEditType="wysiwyg"
      plugins={[colorSyntax]}
      ref={props.editorRef}
      usageStatistics={false}
      {...props}
    />
  )
}

export default ToastEditor

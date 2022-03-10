import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { Editor, EditorProps } from '@toast-ui/react-editor'
import { LegacyRef, useEffect, useState } from 'react'

type EditorPropsWithRef = EditorProps & { editorRef: LegacyRef<Editor> }

function ToastEditor(props: EditorPropsWithRef) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(false)
  }, [props.initialValue])

  useEffect(() => {
    setShow(true)
  }, [show])

  return show ? (
    <Editor
      initialEditType="wysiwyg"
      height="min(max(25rem, 50vh), 50rem)"
      plugins={[colorSyntax]}
      ref={props.editorRef}
      usageStatistics={false}
      {...props}
    />
  ) : null
}

export default ToastEditor

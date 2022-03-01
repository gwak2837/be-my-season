import '@toast-ui/editor/dist/toastui-editor.css'

import { Viewer, ViewerProps } from '@toast-ui/react-editor'

function ToastViewer(props: ViewerProps) {
  return <Viewer initialValue="Hello world" usageStatistics={false} {...props} />
}

export default ToastViewer

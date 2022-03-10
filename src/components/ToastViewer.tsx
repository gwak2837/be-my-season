import '@toast-ui/editor/dist/toastui-editor.css'

import { Viewer, ViewerProps } from '@toast-ui/react-editor'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const MinHeight = styled.div`
  min-height: 50vh;
`

function ToastViewer(props: ViewerProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(false)
  }, [props.initialValue])

  useEffect(() => {
    setShow(true)
  }, [show])

  return show ? (
    <MinHeight>
      <Viewer initialValue="Hello world viewer" usageStatistics={false} {...props} />
    </MinHeight>
  ) : null
}

export default ToastViewer

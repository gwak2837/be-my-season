import '@toast-ui/editor/dist/toastui-editor.css'

import { Viewer, ViewerProps } from '@toast-ui/react-editor'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export const MinHeight = styled.div`
  min-height: 30vh;
`

function ToastViewer(props: ViewerProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(false)
  }, [props.initialValue])

  useEffect(() => {
    setShow(true)
  }, [show])

  return (
    <MinHeight>
      {show ? (
        <Viewer initialValue="Hello world viewer" usageStatistics={false} {...props} />
      ) : null}
    </MinHeight>
  )
}

export default ToastViewer

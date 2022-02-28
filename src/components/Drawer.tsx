import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { TABLET_MIN_WIDTH } from 'src/models/config'
import styled from 'styled-components'

const DrawerInput = styled.input`
  display: none;

  :checked ~ div {
    z-index: 8;
    background: #00000080;
  }

  :checked ~ section {
    right: 0;
  }
`

const DrawerBackground = styled.div`
  position: fixed;
  inset: 0 0 0 0;
  z-index: -1;

  background: #00000000;
  transition: all 0.3s ease-out;
`

const DrawerSection = styled.section`
  position: fixed;
  top: 0;
  right: -50vw;
  z-index: 9;
  max-width: 50vw;
  height: 100vh;

  overflow: hidden auto;
  transition: all 0.3s ease-in-out;
`

type Props = {
  children: ReactNode
  open: boolean
  setOpen: (e: boolean) => void
}

function Drawer({ children, open, setOpen }: Props) {
  function closeDrawer() {
    setOpen(false)
  }

  useEffect(() => {
    function closeOnEscapeKey(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      const bodyStyle = document.body.style
      const scrollY = window.scrollY

      document.addEventListener('keydown', closeOnEscapeKey, false)
      bodyStyle.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', closeOnEscapeKey, false)
        document.body.removeAttribute('style')
        window.scrollTo(0, scrollY) // For Safari 15
      }
    }
  }, [open, setOpen])

  return globalThis.document
    ? createPortal(
        <div>
          <DrawerInput checked={open} readOnly type="checkbox" />
          <DrawerBackground onClick={closeDrawer} />
          <DrawerSection>{children}</DrawerSection>
        </div>,
        document.body
      )
    : null
}

export default Drawer

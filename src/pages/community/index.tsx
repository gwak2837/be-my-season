import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import { LegacyRef, ReactElement, useRef } from 'react'
import PageHead from 'src/components/PageHead'
import CommunityLayout from 'src/layouts/CommunityLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })

const description = ''

export default function CommunityAllPage() {
  const editorRef = useRef<Editor>(null)

  return (
    <PageHead title="커뮤니티 - Be:MySeason" description={description}>
      <button
        onClick={() => {
          console.log(editorRef.current?.getInstance().getHTML())
        }}
      >
        ss
      </button>
      <ToastEditor editorRef={editorRef} />
    </PageHead>
  )
}

CommunityAllPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <CommunityLayout>{page}</CommunityLayout>
    </NavigationLayout>
  )
}

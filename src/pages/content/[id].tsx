import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useRef } from 'react'
import { toast } from 'react-toastify'
import { decodeType } from 'src/components/ContentCard'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

const FlexGap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const description = ''

export default function ContentPage() {
  const router = useRouter()
  const contentId = (router.query.id ?? '') as string

  // Fetch content
  const { data, error } = useSWR(
    () => (contentId ? `/api/content/${contentId}` : null),
    defaultFetcher
  )
  const content = data?.content
  const previousContent = data?.previousContent
  const nextContent = data?.nextContent

  // Update content if user is admin
  const { data: user } = useAuth()
  const editorRef = useRef<Editor>(null)
  const { mutate } = useSWRConfig()

  async function updateContent() {
    if (editorRef.current) {
      const response = await fetch(`/api/content/${contentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: editorRef.current.getInstance().getHTML() }),
      })

      if (response.ok) {
        toast.success('수정에 성공했습니다')
        mutate(`/api/content/${contentId}`)
      } else {
        const result = await response.json()
        toast.warn(result.message)
      }
    }
  }

  return (
    <PageHead title="컨텐츠 - Be:MySeason" description={description}>
      <FlexGap>
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
        {'>'}
        <Link href="/content" passHref>
          <a>Content</a>
        </Link>
        {'>'}
        {content ? (
          <Link href={`/content/${decodeType(content.type).toLowerCase()}`} passHref>
            <a>{decodeType(content.type)}</a>
          </Link>
        ) : (
          <div>loading</div>
        )}
      </FlexGap>

      {content ? (
        <>
          <h3>{content.title}</h3>
          <div>
            {content.nickname} | {new Date(content.creation_time).toLocaleDateString()}
          </div>

          <div>--------------</div>

          {user?.isAdmin ? (
            <>
              <button onClick={updateContent}>수정하기</button>
              <ToastEditor editorRef={editorRef} initialValue={content.description} />
            </>
          ) : (
            <ToastViewer initialValue={content.description} />
          )}

          {nextContent ? (
            <Link href={`/content/${nextContent.id}`} passHref>
              <a>
                <div>{nextContent.title}</div>
              </a>
            </Link>
          ) : (
            <div>다음글이 없습니다.</div>
          )}
          {previousContent ? (
            <Link href={`/content/${previousContent.id}`} passHref>
              <a>
                <div>{previousContent.title}</div>
              </a>
            </Link>
          ) : (
            <div>이전글이 없습니다.</div>
          )}
        </>
      ) : error ? (
        <div>error</div>
      ) : (
        <div>loading</div>
      )}

      <Link href="/content" passHref>
        <a>목록</a>
      </Link>
    </PageHead>
  )
}

ContentPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

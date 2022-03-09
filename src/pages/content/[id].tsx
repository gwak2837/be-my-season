import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { decodeContentType } from 'src/components/ContentCard'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import { MarginAuto } from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import DownFilledArrow from 'src/svgs/down-filled-arrow.svg'
import UpFilledArrow from 'src/svgs/up-filled-arrow.svg'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

const FlexGap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  * {
    color: #000;
  }
`

const H2 = styled.h2`
  color: #7a583a;
  margin: 0.4rem 0;
`

const H5 = styled.h5`
  color: #c9c9c9;
  font-weight: 400;
  margin: 1.5rem 0;
`

export const HorizontalBorder = styled.div`
  border-top: 1px solid #7a583a;
  width: 100%;
  margin: 1rem 0;
`

const RightAlign = styled.div`
  display: flex;
  justify-content: end;
  padding: 1rem;
  margin: 2rem 0 0;
`

const Button = styled.button`
  background: #de684a;
  color: #fff;
  padding: 1rem;
  text-align: center;
  width: 10rem;
`

export const Button1 = styled.div`
  background: #de684a;
  color: #fff;
  padding: 0.5rem;
  text-align: center;
  width: 5rem;
`

const Margin = styled.div`
  margin: 1rem 0 4rem;
`

export const FlexCenterA = styled.a`
  display: flex;
  align-items: center;
  gap: 3rem;

  color: #000;
  padding: 0 1rem;
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

  // Refresh toast editor
  const [isRefreshing, setIsRefreshing] = useState(true)

  function refresh() {
    setIsRefreshing(false)
  }

  useEffect(() => {
    setIsRefreshing(true)
  }, [isRefreshing])

  return (
    <PageHead title="컨텐츠 - Be:MySeason" description={description}>
      <MarginAuto>
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
            <Link href={`/content/${decodeContentType(content.type).toLowerCase()}`} passHref>
              <a>{decodeContentType(content.type)}</a>
            </Link>
          ) : (
            <div>loading</div>
          )}
        </FlexGap>

        {content ? (
          <>
            <H2>{content.title}</H2>
            <H5>
              {content.nickname} | {new Date(content.creation_time).toLocaleDateString()}
            </H5>

            <HorizontalBorder />

            <Margin>
              {isRefreshing &&
                (user?.isAdmin ? (
                  <>
                    <RightAlign>
                      <Button onClick={updateContent}>수정하기</Button>
                    </RightAlign>
                    <ToastEditor editorRef={editorRef} initialValue={content.description} />
                  </>
                ) : (
                  <ToastViewer initialValue={content.description} />
                ))}
            </Margin>

            <HorizontalBorder />
            {nextContent ? (
              <Link href={`/content/${nextContent.id}`} passHref>
                <FlexCenterA onClick={refresh} role="button" tabIndex={0}>
                  <UpFilledArrow />
                  <div>{nextContent.title}</div>
                </FlexCenterA>
              </Link>
            ) : (
              <div>다음글이 없습니다.</div>
            )}
            <HorizontalBorder />
            {previousContent ? (
              <Link href={`/content/${previousContent.id}`} passHref>
                <FlexCenterA onClick={refresh} role="button" tabIndex={0}>
                  <DownFilledArrow />
                  <div>{previousContent.title}</div>
                </FlexCenterA>
              </Link>
            ) : (
              <div>이전글이 없습니다.</div>
            )}
            <HorizontalBorder />
          </>
        ) : error ? (
          <div>error</div>
        ) : (
          <div>loading</div>
        )}

        <Link href="/content" passHref>
          <a>
            <Button1>목록</Button1>
          </a>
        </Link>
      </MarginAuto>
    </PageHead>
  )
}

ContentPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

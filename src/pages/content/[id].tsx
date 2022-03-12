import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { decodeContentType } from 'src/components/ContentCard'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import { MarginAuto } from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import DownFilledArrow from 'src/svgs/down-filled-arrow.svg'
import UpFilledArrow from 'src/svgs/up-filled-arrow.svg'
import { defaultFetcher } from 'src/utils'
import styled, { css } from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

import { FlexEndCenter, OrangeButton, WhiteButton } from '../introduce'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

export const FlexCenterGap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  * {
    color: #000;
  }
`

export const H2 = styled.h2`
  color: #7a583a;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
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

export const FlexCenterA = styled.a<{ hide?: boolean }>`
  display: flex;
  align-items: center;
  gap: 3rem;

  color: #000;
  padding: 0 1rem;

  ${(p) =>
    p.hide &&
    css`
      > svg {
        visibility: hidden;
      }
    `}
`

export const BigInput = styled.input`
  font-size: 1.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  box-shadow: 0 0 0 1px #bebebe;
  width: 100%;
`

const description = ''

export default function ContentPage() {
  const router = useRouter()
  const contentId = (router.query.id ?? '') as string

  const { data: user } = useAuth()
  const { mutate } = useSWRConfig()

  // Fetch content
  const { data, error } = useSWR(
    () => (contentId ? `/api/content/${contentId}` : null),
    defaultFetcher,
    {
      onSuccess: (response) => {
        setTitle(response.content.title)
      },
    }
  )
  const content = data?.content
  const previousContent = data?.previousContent
  const nextContent = data?.nextContent

  // Update content
  const editorRef = useRef<Editor>(null)
  const [title, setTitle] = useState('')

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateContent() {
    if (editorRef.current) {
      setIsUpdateLoading(true)

      const response = await fetch(`/api/content/${contentId}`, {
        method: 'PUT',
        headers: {
          authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description: editorRef.current.getInstance().getHTML(),
        }),
      })

      if (response.ok) {
        toast.success('수정에 성공했습니다')
        mutate(`/api/content/${contentId}`)
        setIsUpdateMode(false)
      } else {
        toast.warn(await response.text())
      }

      setIsUpdateLoading(false)
    }
  }

  // Delete content
  const [isDeletionLoading, setIsDeletionLoading] = useState(false)

  async function deleteContent() {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/content/${contentId}`, {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    if (response.ok) {
      toast.success('삭제에 성공했습니다')
      mutate(`/api/content/${contentId}`)
      mutate('/api/content')
      router.replace('/content')
    } else {
      toast.warn(await response.text())
    }

    setIsDeletionLoading(false)
  }

  // Toggle editor/viewer mode
  const [isUpdateMode, setIsUpdateMode] = useState(false)

  function beingUpdate() {
    setIsUpdateMode(true)
  }

  function cancelUpdating() {
    setIsUpdateMode(false)
  }

  return (
    <PageHead title="컨텐츠 - Be:MySeason" description={description}>
      <MarginAuto>
        <FlexCenterGap>
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
        </FlexCenterGap>

        {content ? (
          <>
            {isUpdateMode ? (
              <BigInput
                placeholder="제목을 입력해주세요"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            ) : (
              <H2>{content.title}</H2>
            )}
            <H5>
              {content.nickname} | {new Date(content.creation_time).toLocaleDateString()}
            </H5>

            <HorizontalBorder />

            <FlexEndCenter>
              {user?.isAdmin &&
                (isUpdateMode ? (
                  <>
                    <WhiteButton disabled={isUpdateLoading} onClick={cancelUpdating} type="reset">
                      취소
                    </WhiteButton>
                    <OrangeButton disabled={isUpdateLoading} onClick={updateContent} type="submit">
                      완료
                    </OrangeButton>
                  </>
                ) : (
                  <>
                    <WhiteButton disabled={isDeletionLoading} onClick={deleteContent}>
                      삭제하기
                    </WhiteButton>
                    <OrangeButton disabled={isDeletionLoading} onClick={beingUpdate}>
                      수정하기
                    </OrangeButton>
                  </>
                ))}
            </FlexEndCenter>

            <Margin>
              {content ? (
                isUpdateMode && user?.isAdmin ? (
                  <ToastEditor editorRef={editorRef} initialValue={content.description} />
                ) : (
                  <ToastViewer initialValue={content.description} />
                )
              ) : error ? (
                <div>error</div>
              ) : (
                <div>loading...</div>
              )}
            </Margin>

            <HorizontalBorder />
            {nextContent ? (
              <Link href={`/content/${nextContent.id}`} passHref>
                <FlexCenterA>
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
                <FlexCenterA>
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

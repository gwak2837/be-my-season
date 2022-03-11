import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import { MarginAuto } from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import DownFilledArrow from 'src/svgs/down-filled-arrow.svg'
import UpFilledArrow from 'src/svgs/up-filled-arrow.svg'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

import { BigInput, Button1, FlexCenterA, H2, HorizontalBorder } from '../content/[id]'
import { FlexEndCenter, OrangeButton, WhiteButton } from '../introduce'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

const Margin = styled.div`
  margin: 1rem 0 4rem;
`

const description = ''

export default function ProjectBeforePage() {
  const router = useRouter()
  const projectId = (router.query.id ?? '') as string
  const { mutate } = useSWRConfig()
  const { data: user } = useAuth()

  // Fetch project
  const { data, error } = useSWR(
    () => (projectId ? `/api/project/${projectId}` : null),
    defaultFetcher,
    {
      onSuccess: (project) => {
        setTitle(project.project.title)
      },
    }
  )
  const project = data?.project
  const previousProject = data?.previousProject
  const nextProject = data?.nextProject

  // Update project if user is admin
  const editorRef = useRef<Editor>(null)
  const [title, setTitle] = useState('')

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateProject() {
    if (editorRef.current) {
      setIsUpdateLoading(true)

      const response = await fetch(`/api/project/${projectId}`, {
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
        mutate(`/api/project/${projectId}`)
        setIsUpdateMode(false)
      } else {
        toast.warn(await response.text())
      }

      setIsUpdateLoading(false)
    }
  }

  // Delete content
  const [isDeletionLoading, setIsDeletionLoading] = useState(false)

  async function deleteProject() {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/project/${projectId}`, {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    if (response.ok) {
      toast.success('삭제에 성공했습니다')
      mutate(`/api/content/${projectId}`)
      mutate('/api/content')
      router.replace('/project')
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
    <PageHead title="프로젝트 - Be:MySeason" description={description}>
      <MarginAuto>
        {project ? (
          <>
            <FlexEndCenter>
              {user?.isAdmin &&
                (isUpdateMode ? (
                  <>
                    <WhiteButton disabled={isUpdateLoading} onClick={cancelUpdating} type="reset">
                      취소
                    </WhiteButton>
                    <OrangeButton disabled={isUpdateLoading} onClick={updateProject} type="submit">
                      완료
                    </OrangeButton>
                  </>
                ) : (
                  <>
                    <WhiteButton disabled={isDeletionLoading} onClick={deleteProject}>
                      삭제하기
                    </WhiteButton>
                    <OrangeButton disabled={isDeletionLoading} onClick={beingUpdate}>
                      수정하기
                    </OrangeButton>
                  </>
                ))}
            </FlexEndCenter>

            <Margin>
              {project ? (
                isUpdateMode && user?.isAdmin ? (
                  <>
                    <BigInput
                      placeholder="제목을 입력해주세요"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    <ToastEditor editorRef={editorRef} initialValue={project.description} />
                  </>
                ) : (
                  <>
                    <H2>{project.title}</H2>
                    <ToastViewer initialValue={project.description} />
                  </>
                )
              ) : error ? (
                <div>error</div>
              ) : (
                <div>loading...</div>
              )}
            </Margin>

            <HorizontalBorder />
            {nextProject ? (
              <Link href={`/project/${nextProject.id}`} passHref>
                <FlexCenterA>
                  <UpFilledArrow />
                  <div>{nextProject.title}</div>
                </FlexCenterA>
              </Link>
            ) : (
              <div>다음 프로젝트가 없습니다.</div>
            )}
            <HorizontalBorder />
            {previousProject ? (
              <Link href={`/project/${previousProject.id}`} passHref>
                <FlexCenterA>
                  <DownFilledArrow />
                  <div>{previousProject.title}</div>
                </FlexCenterA>
              </Link>
            ) : (
              <div>이전 프로젝트가 없습니다.</div>
            )}
            <HorizontalBorder />
          </>
        ) : error ? (
          <div>error</div>
        ) : (
          <div>loading</div>
        )}

        <Link href="/project/before" passHref>
          <a>
            <Button1>목록</Button1>
          </a>
        </Link>
      </MarginAuto>
    </PageHead>
  )
}

ProjectBeforePage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

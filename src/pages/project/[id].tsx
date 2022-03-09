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

import { Button1, FlexCenterA, HorizontalBorder } from '../content/[id]'

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

  // Fetch project
  const { data, error } = useSWR(
    () => (projectId ? `/api/project/${projectId}` : null),
    defaultFetcher
  )
  const project = data?.project
  const previousProject = data?.previousProject
  const nextProject = data?.nextProject

  // Update project if user is admin
  const { data: user } = useAuth()
  const editorRef = useRef<Editor>(null)

  async function updateProject() {
    if (editorRef.current) {
      const response = await fetch(`/api/project/${projectId}`, {
        method: 'PUT',
        headers: {
          authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: editorRef.current.getInstance().getHTML(),
        }),
      })

      if (response.ok) {
        toast.success('수정에 성공했습니다')
        mutate(`/api/project/${projectId}`)
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
    <PageHead title="프로젝트 - Be:MySeason" description={description}>
      <MarginAuto>
        {project ? (
          <>
            <Margin>
              {isRefreshing &&
                (user?.isAdmin ? (
                  <>
                    <button onClick={updateProject}>수정하기</button>
                    <ToastEditor editorRef={editorRef} initialValue={project.description} />
                  </>
                ) : (
                  <ToastViewer initialValue={project.description} />
                ))}
            </Margin>

            <HorizontalBorder />
            {nextProject ? (
              <Link href={`/project/${nextProject.id}`} passHref>
                <FlexCenterA onClick={refresh} role="button" tabIndex={0}>
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
                <FlexCenterA onClick={refresh} role="button" tabIndex={0}>
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

import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { decodeCommunityType } from 'src/components/CommunityCard'
import PageHead from 'src/components/PageHead'

import useAuth from 'src/hooks/useAuth'
import CommunityLayout from 'src/layouts/CommunityLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher, formatNumber } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'
import { Sticky, ReviewCreationForm, ReviewCard, QnACreationForm, QnACard } from '../program/[id]'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

const FlexGap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const OverflowAuto = styled.div`
  overflow: auto;
  height: calc(100vh - 5rem);
`

const description = ''

export default function CommunityPage() {
  const router = useRouter()
  const communityId = (router.query.id ?? '') as string

  // Community form
  const { getValues, resetField } = useForm({
    defaultValues: {
      description: '',
    },
  })

  // Fetch community
  const { data, error } = useSWR(
    () => (communityId ? `/api/community/${communityId}` : null),
    defaultFetcher,
    {
      onSuccess: (community) => {
        resetField('description', { defaultValue: community.description })
      },
    }
  )
  const community = data?.community
  const previousCommunity = data?.previousCommunity
  const nextCommunity = data?.nextCommunity

  // scrollIntoView
  const detailRef = useRef<HTMLDivElement>(null)
  function scrollToDetail() {
    detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const reviewRef = useRef<HTMLUListElement>(null)
  function scrollToReview() {
    reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const qnaRef = useRef<HTMLUListElement>(null)
  function scrollToQnA() {
    qnaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Update community if user is admin
  const { data: user } = useAuth()
  const editorRef = useRef<Editor>(null)
  const { mutate } = useSWRConfig()
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateCommunity() {
    if (editorRef.current) {
      setIsUpdateLoading(true)

      const response = await fetch(`/api/community/${communityId}`, {
        method: 'PUT',
        headers: {
          authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: getValues('description'),
          detail: editorRef.current.getInstance().getHTML(),
        }),
      })

      if (response.ok) {
        toast.success('수정에 성공했습니다')
        mutate(`/api/community/${communityId}`)
      } else {
        const result = await response.json()
        toast.warn(result.message)
      }

      setIsUpdateLoading(false)
    }
  }

  // Join community
  async function joinCommunity() {
    const response = await fetch(`/api/community/${communityId}/join`, {
      method: 'POST',
    })

    if (response.ok) {
      toast.success('커뮤니티 참가 신청했습니다')
      mutate(`/api/community/${communityId}/join`)
    } else {
      const result = await response.text()
      toast.warn(result)
    }
  }

  // Pay community
  async function payCommunity() {
    const response = await fetch(`/api/community/${communityId}/review`, {
      method: 'POST',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('결제를 완료했습니다')
      mutate(`/api/community/${communityId}/review`)
    } else {
      const result = await response.text()
      toast.warn(result)
    }
  }

  // Fetch community reviews
  const { data: reviews, error: reviewsError } = useSWR(
    () => (communityId ? `/api/community/${communityId}/review` : null),
    defaultFetcher
  )

  // Fetch community QnAs
  const { data: qnas, error: qnasError } = useSWR(
    () => (communityId ? `/api/community/${communityId}/qna` : null),
    defaultFetcher
  )

  return (
    <PageHead title="커뮤니티 - Be:MySeason" description={description}>
      <OverflowAuto>
        <FlexGap>
          <Link href="/" passHref>
            <a>Home</a>
          </Link>
          {'>'}
          <Link href="/community" passHref>
            <a>Community</a>
          </Link>
          {'>'}
          {community ? (
            <Link href={`/community/${decodeCommunityType(community.type).toLowerCase()}`} passHref>
              <a>{decodeCommunityType(community.type)}</a>
            </Link>
          ) : (
            <div>loading</div>
          )}
        </FlexGap>

        {community ? (
          <>
            <h3>{community.title}</h3>
            <div>{formatNumber(community.price)} 원</div>
            <p>{community.description}</p>
            {community.price > 0 ? (
              <button onClick={payCommunity}>결제하기</button>
            ) : (
              <button onClick={joinCommunity}>참가하기</button>
            )}

            <div>--------------</div>

            <Sticky>
              <button onClick={scrollToDetail}>상세정보</button>
              <button onClick={scrollToReview}>후기</button>
              <button onClick={scrollToQnA}>Q&A</button>
            </Sticky>

            <div ref={detailRef}>
              {user?.isAdmin ? (
                <>
                  <button disabled={isUpdateLoading} onClick={updateCommunity}>
                    수정하기
                  </button>
                  <ToastEditor editorRef={editorRef} initialValue={community.detail} />
                </>
              ) : (
                <ToastViewer initialValue={community.detail} />
              )}
            </div>

            <ReviewCreationForm />
            <ul ref={reviewRef}>
              {reviews ? (
                reviews.length > 0 ? (
                  reviews.map((review: any) => <ReviewCard key={review.id} review={review} />)
                ) : (
                  <div>리뷰가 없어요</div>
                )
              ) : reviewsError ? (
                <div>reviews error</div>
              ) : (
                <div>reviews loading...</div>
              )}
            </ul>

            <QnACreationForm />
            <ul ref={qnaRef}>
              {qnas ? (
                qnas.length > 0 ? (
                  qnas.map((qna: any) => <QnACard key={qna.id} qna={qna} />)
                ) : (
                  <div>QnA가 없어요</div>
                )
              ) : qnasError ? (
                <div>qna error</div>
              ) : (
                <div>qna loading...</div>
              )}
            </ul>

            {nextCommunity ? (
              <Link href={`/community/${nextCommunity.id}`} passHref>
                <a>
                  <div>{nextCommunity.title}</div>
                </a>
              </Link>
            ) : (
              <div>다음글이 없습니다.</div>
            )}
            {previousCommunity ? (
              <Link href={`/community/${previousCommunity.id}`} passHref>
                <a>
                  <div>{previousCommunity.title}</div>
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

        <Link href="/community" passHref>
          <a>목록</a>
        </Link>
      </OverflowAuto>
    </PageHead>
  )
}

CommunityPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

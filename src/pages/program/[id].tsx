import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import { decodeProgramType } from 'src/components/ProgramCard'
import useAuth from 'src/hooks/useAuth'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher, formatNumber } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

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

export const Sticky = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
`

export function ReviewCard({ review }: any) {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { mutate } = useSWRConfig()
  const { data: user } = useAuth()

  // Update review
  const { getValues, setValue, register } = useForm({
    defaultValues: {
      title: review.title,
      description: review.description,
      point: review.point,
    },
  })

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const [isReviewUpdating, setIsReviewUpdating] = useState(false)

  function beingUpdate() {
    setIsReviewUpdating(true)
  }

  function cancelUpdating() {
    setIsReviewUpdating(false)
    setValue('title', '')
    setValue('description', '')
    setValue('point', 0)
  }

  async function updateReview(reviewId: number) {
    setIsUpdateLoading(true)

    const response = await fetch(`/api/program/${programId}/review`, {
      method: 'PUT',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviewId,
        title: getValues('title'),
        description: getValues('description'),
        point: getValues('point'),
      }),
    })

    if (response.ok) {
      toast.success('리뷰를 수정했습니다')
      mutate(`/api/program/${programId}/review`)
    } else {
      const result = await response.text()
      toast.warn(result)
    }

    setIsUpdateLoading(false)
    setIsReviewUpdating(false)
  }

  // Delete review
  const [isDeletionLoading, setIsDeletionLoading] = useState(false)

  async function deleteReview(reviewId: number) {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/program/${programId}/review?reviewId=${reviewId}`, {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    if (response.ok) {
      toast.success('리뷰를 삭제했습니다')
      mutate(`/api/program/${programId}/review`)
    } else {
      const result = await response.text()
      toast.warn(result)
    }

    setIsDeletionLoading(false)
  }

  return (
    <li>
      <div>
        {isReviewUpdating ? (
          <>
            <input {...register('title')} />
            <textarea {...register('description')} />
            <input {...register('point')} type="number" />
          </>
        ) : (
          <>
            <h4>{review.title}</h4>
            <p>{review.description}</p>
            <div>{review.point}</div>
          </>
        )}
      </div>

      {user.userId === review.author_id && (
        <>
          {isReviewUpdating ? (
            <>
              <button disabled={isUpdateLoading} onClick={cancelUpdating}>
                취소
              </button>
              <button disabled={isUpdateLoading} onClick={() => updateReview(review.id)}>
                완료
              </button>
            </>
          ) : (
            <button onClick={beingUpdate}>수정</button>
          )}
          {!isReviewUpdating && (
            <button disabled={isDeletionLoading} onClick={() => deleteReview(review.id)}>
              삭제
            </button>
          )}
        </>
      )}
    </li>
  )
}

export function QnACard({ qna }: any) {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { mutate } = useSWRConfig()
  const { data: user } = useAuth()

  // Update QnA
  const { getValues, register, reset } = useForm({
    defaultValues: {
      title: qna.title,
      description: qna.description,
    },
  })

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const [isQnAUpdating, setIsQnAUpdating] = useState(false)

  function beingUpdate() {
    setIsQnAUpdating(true)
  }

  function cancelUpdating() {
    setIsQnAUpdating(false)
    reset()
  }

  async function updateQnA(qnaId: number) {
    setIsUpdateLoading(true)

    const response = await fetch(`/api/program/${programId}/qna`, {
      method: 'PUT',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qnaId,
        title: getValues('title'),
        description: getValues('description'),
      }),
    })

    if (response.ok) {
      toast.success('QnA를 수정했습니다')
      mutate(`/api/program/${programId}/qna`)
    } else {
      const result = await response.text()
      toast.warn(result)
    }

    setIsUpdateLoading(false)
    setIsQnAUpdating(false)
  }

  // Delete QnA
  const [isDeletionLoading, setIsDeletionLoading] = useState(false)

  async function deleteQnA(qnaId: number) {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/program/${programId}/qna?qnaId=${qnaId}`, {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    if (response.ok) {
      toast.success('QnA를 삭제했습니다')
      mutate(`/api/program/${programId}/qna`)
    } else {
      const result = await response.text()
      toast.warn(result)
    }

    setIsDeletionLoading(false)
  }

  return (
    <li>
      <div>
        {isQnAUpdating ? (
          <>
            <input {...register('title')} />
            <textarea {...register('description')} />
          </>
        ) : (
          <>
            <h4>{qna.title}</h4>
            <p>{qna.description}</p>
          </>
        )}
      </div>

      {user.userId === qna.author_id && (
        <>
          {isQnAUpdating ? (
            <>
              <button disabled={isUpdateLoading} onClick={cancelUpdating}>
                취소
              </button>
              <button disabled={isUpdateLoading} onClick={() => updateQnA(qna.id)}>
                완료
              </button>
            </>
          ) : (
            <button onClick={beingUpdate}>수정</button>
          )}
          {!isQnAUpdating && (
            <button disabled={isDeletionLoading} onClick={() => deleteQnA(qna.id)}>
              삭제
            </button>
          )}
        </>
      )}
    </li>
  )
}

export function ReviewCreationForm() {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { data: user } = useAuth()
  const { mutate } = useSWRConfig()
  const [isCreationLoading, setIsCreationLoading] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      point: 0,
    },
  })

  // Create review
  async function createReview({ title, description, point }: any) {
    if (!user?.userId) {
      router.replace('/login')
      sessionStorage.setItem('redirectionUrlAfterLogin', router.asPath)
      return
    }

    setIsCreationLoading(true)

    const response = await fetch(`/api/program/${programId}/review`, {
      method: 'POST',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, point }),
    })

    if (response.ok) {
      toast.success('리뷰를 작성했습니다')
      mutate(`/api/program/${programId}/review`)
    } else {
      const result = await response.text()
      toast.warn(result)
    }

    setIsCreationLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(createReview)}>
      <input
        disabled={!user?.userId}
        {...register('title', {
          required: '리뷰 제목을 입력해주세요',
          minLength: {
            value: 5,
            message: '리뷰 제목을 5글자 이상 입력해주세요',
          },
          maxLength: {
            value: 100,
            message: '리뷰 제목을 100글자 이하로 입력해주세요',
          },
        })}
      />
      <textarea
        disabled={!user?.userId}
        {...register('description', {
          required: '리뷰 내용을 입력해주세요',
          minLength: {
            value: 10,
            message: '리뷰 내용을 10글자 이상 입력해주세요',
          },
          maxLength: {
            value: 1000,
            message: '리뷰 내용을 1000글자 이하로 입력해주세요',
          },
        })}
      />
      <input
        disabled={!user?.userId}
        type="number"
        {...register('point', {
          required: '리뷰 점수를 입력해주세요',
          min: {
            value: 1,
            message: '리뷰 점수를 1점 이상 입력해주세요',
          },
          max: {
            value: 5,
            message: '리뷰 점수를 5점 이하로 입력해주세요',
          },
        })}
      />
      <button disabled={isCreationLoading} type="submit">
        생성
      </button>
    </form>
  )
}

export function QnACreationForm() {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { data: user } = useAuth()
  const { mutate } = useSWRConfig()
  const [isCreationLoading, setIsCreationLoading] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  })

  // Create QnA
  async function createQnA({ title, description }: any) {
    if (!user?.userId) {
      router.replace('/login')
      sessionStorage.setItem('redirectionUrlAfterLogin', router.asPath)
      return
    }

    setIsCreationLoading(true)

    const response = await fetch(`/api/program/${programId}/qna`, {
      method: 'POST',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })

    if (response.ok) {
      toast.success('QnA를 작성했습니다')
      mutate(`/api/program/${programId}/qna`)
    } else {
      const result = await response.json()
      toast.warn(result.message)
    }

    setIsCreationLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(createQnA)}>
      <input
        disabled={!user?.userId}
        {...register('title', {
          required: 'QnA 제목을 입력해주세요',
          minLength: {
            value: 5,
            message: 'QnA 제목을 5글자 이상 입력해주세요',
          },
          maxLength: {
            value: 100,
            message: 'QnA 제목을 100글자 이하로 입력해주세요',
          },
        })}
      />
      <textarea
        disabled={!user?.userId}
        {...register('description', {
          required: 'QnA 내용을 입력해주세요',
          minLength: {
            value: 10,
            message: 'QnA 내용을 10글자 이상 입력해주세요',
          },
          maxLength: {
            value: 1000,
            message: 'QnA 내용을 1000글자 이하로 입력해주세요',
          },
        })}
      />
      <button disabled={isCreationLoading} type="submit">
        생성
      </button>
    </form>
  )
}

const description = ''

export default function ProgramPage() {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  // Program form
  const { getValues, resetField } = useForm({
    defaultValues: {
      description: '',
    },
  })

  // Fetch program
  const { data, error } = useSWR(
    () => (programId ? `/api/program/${programId}` : null),
    defaultFetcher,
    {
      onSuccess: (program) => {
        resetField('description', { defaultValue: program.description })
      },
    }
  )
  const program = data?.program
  const previousProgram = data?.previousProgram
  const nextProgram = data?.nextProgram

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

  // Update program if user is admin
  const { data: user } = useAuth()
  const editorRef = useRef<Editor>(null)
  const { mutate } = useSWRConfig()
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateProgram() {
    if (editorRef.current) {
      setIsUpdateLoading(true)

      const response = await fetch(`/api/program/${programId}`, {
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
        mutate(`/api/program/${programId}`)
      } else {
        const result = await response.json()
        toast.warn(result.message)
      }

      setIsUpdateLoading(false)
    }
  }

  // Join program
  async function joinProgram() {
    const response = await fetch(`/api/program/${programId}/join`, {
      method: 'POST',
    })

    if (response.ok) {
      toast.success('프로그램 참가 신청했습니다')
      mutate(`/api/program/${programId}/join`)
    } else {
      const result = await response.text()
      toast.warn(result)
    }
  }

  // Pay program
  async function payProgram() {
    const response = await fetch(`/api/program/${programId}/review`, {
      method: 'POST',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('결제를 완료했습니다')
      mutate(`/api/program/${programId}/review`)
    } else {
      const result = await response.text()
      toast.warn(result)
    }
  }

  // Fetch program reviews
  const { data: reviews, error: reviewsError } = useSWR(
    () => (programId ? `/api/program/${programId}/review` : null),
    defaultFetcher
  )

  // Fetch program QnAs
  const { data: qnas, error: qnasError } = useSWR(
    () => (programId ? `/api/program/${programId}/qna` : null),
    defaultFetcher
  )

  // Refresh toast editor
  const [isRefreshing, setIsRefreshing] = useState(true)

  function refresh() {
    setIsRefreshing(false)
  }

  useEffect(() => {
    setIsRefreshing(true)
  }, [isRefreshing])

  return (
    <PageHead title="프로그램 - Be:MySeason" description={description}>
      <OverflowAuto>
        <FlexGap>
          <Link href="/" passHref>
            <a>Home</a>
          </Link>
          {'>'}
          <Link href="/program" passHref>
            <a>Program</a>
          </Link>
          {'>'}
          {program ? (
            <Link href={`/program/${decodeProgramType(program.type).toLowerCase()}`} passHref>
              <a>{decodeProgramType(program.type)}</a>
            </Link>
          ) : (
            <div>loading</div>
          )}
        </FlexGap>

        {program ? (
          <>
            <h3>{program.title}</h3>
            <div>{formatNumber(program.price)} 원</div>
            <p>{program.description}</p>
            {program.price > 0 ? (
              <button onClick={payProgram}>결제하기</button>
            ) : (
              <button onClick={joinProgram}>참가하기</button>
            )}

            <div>--------------</div>

            <Sticky>
              <button onClick={scrollToDetail}>상세정보</button>
              <button onClick={scrollToReview}>후기</button>
              <button onClick={scrollToQnA}>Q&A</button>
            </Sticky>

            <div ref={detailRef}>
              {isRefreshing &&
                (user?.isAdmin ? (
                  <>
                    <button disabled={isUpdateLoading} onClick={updateProgram}>
                      수정하기
                    </button>
                    <ToastEditor editorRef={editorRef} initialValue={program.detail} />
                  </>
                ) : (
                  <ToastViewer initialValue={program.detail} />
                ))}
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

            {nextProgram ? (
              <Link href={`/program/${nextProgram.id}`} passHref>
                <a onClick={refresh} role="button" tabIndex={0}>
                  <div>{nextProgram.title}</div>
                </a>
              </Link>
            ) : (
              <div>다음글이 없습니다.</div>
            )}
            {previousProgram ? (
              <Link href={`/program/${previousProgram.id}`} passHref>
                <a onClick={refresh} role="button" tabIndex={0}>
                  <div>{previousProgram.title}</div>
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

        <Link href="/program" passHref>
          <a>목록</a>
        </Link>
      </OverflowAuto>
    </PageHead>
  )
}

ProgramPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

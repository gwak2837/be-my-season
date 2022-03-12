import type { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import { decodeProgramType } from 'src/components/ProgramCard'
import useAuth from 'src/hooks/useAuth'
import { MarginAuto } from 'src/layouts/IntroduceLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import DownFilledArrow from 'src/svgs/down-filled-arrow.svg'
import UpFilledArrow from 'src/svgs/up-filled-arrow.svg'
import { defaultFetcher, formatNumber, resizeTextareaHeight, submitWhenShiftEnter } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

import { TextArea } from '../contact/faq'
import { BigInput, Button1, FlexCenterA, FlexCenterGap, HorizontalBorder } from '../content/[id]'
import { FlexEndCenter, OrangeButton, WhiteButton } from '../introduce'
import { NumberInput } from './create'

const ToastEditor = dynamic(() => import('src/components/ToastEditor'), { ssr: false })
const ToastViewer = dynamic(() => import('src/components/ToastViewer'), { ssr: false })

export const Sticky = styled.div`
  position: sticky;
  top: 5rem;
  z-index: 1;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  background: #fff;
`

const BrownButton = styled.button<{ selected?: boolean }>`
  background: ${(p) => (p.selected ? '#7A583A' : '#F9F9F9')};
  box-shadow: 0 0 0 1px ${(p) => (p.selected ? '#7A583A' : '#eee')};
  color: ${(p) => (p.selected ? '#fff' : '#7A583A')};
  padding: 1rem;
`

export function ReviewCard({ review }: any) {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { mutate } = useSWRConfig()
  const { data: user } = useAuth()

  // Update review
  const { getValues, setValue, register, reset } = useForm({
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
    reset()
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
      toast.warn(await response.text())
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
      toast.warn(await response.text())
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
      toast.warn(await response.text())
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
      toast.warn(await response.text())
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

  function checkLogin() {
    if (!user?.userId) {
      router.replace('/login')
      sessionStorage.setItem('redirectionUrlAfterLogin', router.asPath)
    }
  }

  // Create review
  async function createReview({ title, description, point }: any) {
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
      toast.warn(await response.text())
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
      <button disabled={isCreationLoading} onClick={checkLogin} type="submit">
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

  function checkLogin() {
    if (!user?.userId) {
      router.replace('/login')
      sessionStorage.setItem('redirectionUrlAfterLogin', router.asPath)
    }
  }

  // Create QnA
  async function createQnA({ title, description }: any) {
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
      <button disabled={isCreationLoading} onClick={checkLogin} type="submit">
        생성
      </button>
    </form>
  )
}

const FlexWrapGap = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 3rem;
  margin: 5rem 0;

  > div {
    flex-grow: 1;
  }
`

const Relative = styled.div`
  position: relative;
  min-width: 200px;
  min-height: 200px;
`

const H3 = styled.h2`
  color: #7a583a;
  margin: 1rem 0 2rem;
`

const PrimaryText = styled.div`
  font-size: 1.3rem;
  color: #7a583a;
  margin: 1rem 0;
`

const P = styled.p`
  color: #999999;
  margin: 1rem 0 3rem;
  min-height: 5rem;
`

const PrimaryBigButton = styled.button`
  background: #de684a;
  color: #fff;
  font-size: 1.3rem;
  padding: 1rem;
  width: 100%;
`

const Margin = styled.div`
  padding: 8rem 0;
`

const DisplayNoneIf = styled.div<{ display: boolean }>`
  display: ${(p) => (p.display ? 'block' : 'none')};
`

const description = ''

export default function ProgramPage() {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { data: user } = useAuth()
  const { mutate } = useSWRConfig()

  // Fetch program
  const { data, error } = useSWR(
    () => (programId ? `/api/program/${programId}` : null),
    defaultFetcher,
    {
      onSuccess: (response) => {
        console.log('👀 - response', response.program)
        resetField('title', { defaultValue: response.program.title })
        resetField('price', { defaultValue: response.program.price })
        resetField('description', { defaultValue: response.program.description })
        resetField('imageUrl', { defaultValue: response.program.imageUrl })
        resetField('type', { defaultValue: response.program.type })
      },
    }
  )
  const program = data?.program
  const previousProgram = data?.previousProgram
  const nextProgram = data?.nextProgram

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

  // Update program
  const { register, reset, resetField } = useForm({
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      imageUrl: '',
      type: 0,
    },
  })

  const editorRef = useRef<Editor>(null)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateProgram({ title, price, description, imageUrl, type }: any) {
    if (editorRef.current) {
      setIsUpdateLoading(true)

      const response = await fetch(`/api/program/${programId}`, {
        method: 'PUT',
        headers: {
          authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          price,
          description,
          detail: editorRef.current.getInstance().getHTML(),
          imageUrl,
          type,
        }),
      })

      if (response.ok) {
        toast.success('수정에 성공했습니다')
        mutate(`/api/program/${programId}`)
      } else {
        toast.warn(await response.text())
      }

      setIsUpdateLoading(false)
    }
  }

  // Delete program
  const [isDeletionLoading, setIsDeletionLoading] = useState(false)

  async function deleteProgram() {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/program/${programId}`, {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    if (response.ok) {
      toast.success('삭제에 성공했습니다')
      mutate(`/api/program/${programId}`)
      mutate('/api/program')
      router.replace('/program')
    } else {
      toast.warn(await response.text())
    }

    setIsDeletionLoading(false)
  }

  // Join program
  async function joinProgram() {
    const response = await fetch(`/api/program/${programId}/join`, {
      method: 'POST',
    })

    if (response.ok) {
      toast.success('프로그램 참가 신청을 완료했습니다')
      mutate(`/api/program/${programId}/join`)
    } else {
      toast.warn(await response.text())
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
      toast.warn(await response.text())
    }
  }

  // Toggle editor/viewer mode
  const [isUpdateMode, setIsUpdateMode] = useState(false)

  function beingUpdate(e: any) {
    e.preventDefault()
    setIsUpdateMode(true)
  }

  function cancelUpdating() {
    setIsUpdateMode(false)
    reset()
  }

  return (
    <PageHead title="프로그램 - Be:MySeason" description={description}>
      <MarginAuto>
        <FlexCenterGap>
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
        </FlexCenterGap>

        {user?.isAdmin &&
          (isUpdateMode ? (
            <FlexEndCenter>
              <WhiteButton disabled={isUpdateLoading} onClick={cancelUpdating} type="reset">
                취소
              </WhiteButton>
              <OrangeButton disabled={isUpdateLoading} onClick={updateProgram} type="submit">
                완료
              </OrangeButton>
            </FlexEndCenter>
          ) : (
            <FlexEndCenter>
              <WhiteButton disabled={isDeletionLoading} onClick={deleteProgram}>
                삭제하기
              </WhiteButton>
              <OrangeButton disabled={isDeletionLoading} onClick={beingUpdate}>
                수정하기
              </OrangeButton>
            </FlexEndCenter>
          ))}

        <DisplayNoneIf display={isUpdateMode}>
          <BigInput
            placeholder="제목을 입력해주세요"
            {...register('title', { required: '제목을 입력해주세요' })}
          />
          <NumberInput
            placeholder="프로그램 가격을 입력해주세요"
            type="number"
            {...register('price', { required: '프로그램 가격을 입력해주세요' })}
          />
          <TextArea
            onKeyDown={submitWhenShiftEnter}
            onInput={resizeTextareaHeight}
            placeholder="프로그램 설명을 입력해주세요"
            {...register('description', { required: '프로그램 설명을 입력해주세요' })}
          />
        </DisplayNoneIf>

        {program ? (
          <>
            {!isUpdateMode && (
              <FlexWrapGap>
                <Relative>
                  <Image
                    src={program.image_url ?? '/images/sample.png'}
                    alt="program cover"
                    layout="fill"
                    objectFit="cover"
                  />
                </Relative>
                <div>
                  <H3>{program.title}</H3>
                  <PrimaryText>{formatNumber(program.price)} 원</PrimaryText>
                  <HorizontalBorder color="#E5C6AD" />
                  <P>{program.description}</P>
                  {program.price > 0 ? (
                    <PrimaryBigButton onClick={payProgram}>결제하기</PrimaryBigButton>
                  ) : (
                    <PrimaryBigButton onClick={joinProgram}>참가하기</PrimaryBigButton>
                  )}
                </div>
              </FlexWrapGap>
            )}

            <Sticky>
              <BrownButton onClick={scrollToDetail} selected>
                상세정보
              </BrownButton>
              <BrownButton onClick={scrollToReview}>후기</BrownButton>
              <BrownButton onClick={scrollToQnA}>Q&A</BrownButton>
            </Sticky>

            <Margin ref={detailRef}>
              {isUpdateMode ? (
                <ToastEditor editorRef={editorRef} initialValue={program.detail} />
              ) : (
                <ToastViewer initialValue={program.detail} />
              )}
            </Margin>

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

            <HorizontalBorder />
            {nextProgram ? (
              <Link href={`/program/${nextProgram.id}`} passHref>
                <FlexCenterA>
                  <UpFilledArrow />
                  <div>{nextProgram.title}</div>
                </FlexCenterA>
              </Link>
            ) : (
              <FlexCenterA hide>
                <UpFilledArrow />
                <div>다음글이 없습니다.</div>
              </FlexCenterA>
            )}
            <HorizontalBorder />
            {previousProgram ? (
              <Link href={`/program/${previousProgram.id}`} passHref>
                <FlexCenterA>
                  <DownFilledArrow />
                  <div>{previousProgram.title}</div>
                </FlexCenterA>
              </Link>
            ) : (
              <FlexCenterA hide>
                <UpFilledArrow />
                <div>이전글이 없습니다.</div>
              </FlexCenterA>
            )}
            <HorizontalBorder />
          </>
        ) : error ? (
          <div>error</div>
        ) : (
          <div>loading</div>
        )}

        <Link href="/program" passHref>
          <a>
            <Button1>목록</Button1>
          </a>
        </Link>
      </MarginAuto>
    </PageHead>
  )
}

ProgramPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

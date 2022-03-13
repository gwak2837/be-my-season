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
import QnACreationForm from 'src/components/QnACreationForm'
import ReviewCreationForm, {
  CreationTextArea,
  FlexWrap,
  Input2,
} from 'src/components/ReviewCreationForm'
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
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: review.title,
      description: review.description,
      point: review.point,
    },
  })

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const [isReviewUpdating, setIsReviewUpdating] = useState(false)

  function beingUpdate(e: any) {
    e.preventDefault()
    setIsReviewUpdating(true)
  }

  function cancelUpdating() {
    setIsReviewUpdating(false)
    reset()
  }

  async function updateReview({ title, description, point }: any) {
    setIsUpdateLoading(true)

    const response = await fetch(`/api/program/${programId}/review`, {
      method: 'PUT',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: review.id,
        title,
        description,
        point,
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

  async function deleteReview() {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/program/${programId}/review?reviewId=${review.id}`, {
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
      <form onSubmit={handleSubmit(updateReview)}>
        <div>
          {isReviewUpdating ? (
            <>
              <FlexWrap>
                <Input2
                  disabled={isUpdateLoading}
                  placeholder="리뷰 제목을 입력해주세요"
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
                <NumberInput
                  disabled={isUpdateLoading}
                  placeholder="리뷰 점수를 입력해주세요"
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
              </FlexWrap>
              <CreationTextArea
                disabled={isUpdateLoading}
                onKeyDown={submitWhenShiftEnter}
                placeholder="리뷰 내용을 입력해주세요"
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
            </>
          ) : (
            <>
              <h4>{review.title}</h4>
              <p>{review.description}</p>
              <div>{review.point}</div>
            </>
          )}
        </div>

        {user.userId === review.user__id && (
          <FlexEndCenter>
            {isReviewUpdating ? (
              <>
                <WhiteButton disabled={isUpdateLoading} onClick={cancelUpdating} type="reset">
                  취소
                </WhiteButton>
                <OrangeButton disabled={isUpdateLoading} type="submit">
                  완료
                </OrangeButton>
              </>
            ) : (
              <>
                <WhiteButton disabled={isDeletionLoading} onClick={deleteReview} type="button">
                  삭제
                </WhiteButton>
                <OrangeButton onClick={beingUpdate} type="button">
                  수정
                </OrangeButton>
              </>
            )}
          </FlexEndCenter>
        )}
      </form>
    </li>
  )
}

function QnACard({ qna }: any) {
  const router = useRouter()
  const programId = (router.query.id ?? '') as string

  const { mutate } = useSWRConfig()
  const { data: user } = useAuth()

  // Update QnA
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: qna.title,
      description: qna.description,
    },
  })

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const [isQnAUpdating, setIsQnAUpdating] = useState(false)

  function beingUpdate(e: any) {
    e.preventDefault()
    setIsQnAUpdating(true)
  }

  function cancelUpdating() {
    setIsQnAUpdating(false)
    reset()
  }

  async function updateQnA({ title, description }: any) {
    setIsUpdateLoading(true)

    const response = await fetch(`/api/program/${programId}/qna`, {
      method: 'PUT',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: qna.id,
        title,
        description,
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

  async function deleteQnA() {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/program/${programId}/qna?qnaId=${qna.id}`, {
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
      <form onSubmit={handleSubmit(updateQnA)}>
        <div>
          {isQnAUpdating ? (
            <>
              <Input2 {...register('title')} />
              <CreationTextArea {...register('description')} />
            </>
          ) : (
            <>
              <h4>{qna.title}</h4>
              <p>{qna.description}</p>
            </>
          )}
        </div>

        {user.userId === qna.user__id && (
          <FlexEndCenter>
            {isQnAUpdating ? (
              <>
                <WhiteButton disabled={isUpdateLoading} onClick={cancelUpdating} type="reset">
                  취소
                </WhiteButton>
                <OrangeButton disabled={isUpdateLoading} type="submit">
                  완료
                </OrangeButton>
              </>
            ) : (
              <>
                <WhiteButton disabled={isDeletionLoading} onClick={deleteQnA} type="button">
                  삭제
                </WhiteButton>
                <OrangeButton onClick={beingUpdate} type="button">
                  수정
                </OrangeButton>
              </>
            )}
          </FlexEndCenter>
        )}
      </form>
    </li>
  )
}

export const FlexWrapGap = styled.div`
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
  min-width: 300px;
  min-height: 300px;
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

const DisplayNoneIf = styled.div<{ condition: boolean }>`
  display: ${(p) => (p.condition ? 'none' : 'grid')};
  gap: 1rem;
  margin: 0 0 2rem;
`

const GridGap = styled.div`
  display: grid;
  gap: 0.5rem;

  > input {
    margin: 0;
  }
`

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  box-shadow: 0 0 0 1px #bebebe;
  width: 100%;
`

const GridUl = styled.ul`
  display: grid;
  gap: 1rem;
  margin: 2rem 0;
`

const MarginH4 = styled.h5`
  margin: 1rem 0;
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

  const reviewRef = useRef<HTMLDivElement>(null)
  function scrollToReview() {
    reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const qnaRef = useRef<HTMLDivElement>(null)
  function scrollToQnA() {
    qnaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Update program
  const { getValues, register, reset, resetField } = useForm({
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
          title: getValues('title'),
          price: getValues('price'),
          description: getValues('description'),
          detail: editorRef.current.getInstance().getHTML(),
          imageUrl: getValues('imageUrl'),
          type: getValues('type'),
        }),
      })

      if (response.ok) {
        toast.success('수정에 성공했습니다')
        mutate(`/api/program/${programId}`)
      } else {
        toast.warn(await response.text())
      }

      setIsUpdateLoading(false)
      setIsUpdateMode(false)
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

        <DisplayNoneIf condition={!isUpdateMode}>
          <GridGap>
            <label htmlFor="title">제목</label>
            <BigInput
              id="title"
              placeholder="제목을 입력해주세요"
              {...register('title', { required: '제목을 입력해주세요' })}
            />
          </GridGap>
          <GridGap>
            <label htmlFor="imageUrl">커버 이미지 URL</label>
            <Input id="imageUrl" placeholder="제목을 입력해주세요" {...register('imageUrl')} />
          </GridGap>
          <GridGap>
            <label htmlFor="price">가격</label>
            <NumberInput
              id="price"
              placeholder="프로그램 가격을 입력해주세요"
              type="number"
              {...register('price', { required: '프로그램 가격을 입력해주세요' })}
            />
          </GridGap>
          <GridGap>
            <label htmlFor="description">설명</label>
            <TextArea
              id="description"
              onKeyDown={submitWhenShiftEnter}
              onInput={resizeTextareaHeight}
              placeholder="프로그램 설명을 입력해주세요"
              {...register('description', { required: '프로그램 설명을 입력해주세요' })}
            />
          </GridGap>
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

            <HorizontalBorder color="#E5C6AD" ref={reviewRef} />

            <ReviewCreationForm />
            <MarginH4>리뷰 {reviews?.length ?? '...'}개</MarginH4>
            <GridUl>
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
            </GridUl>

            <HorizontalBorder color="#E5C6AD" ref={qnaRef} />

            <QnACreationForm />
            <MarginH4>QnA {qnas?.length ?? '...'}개</MarginH4>
            <GridUl>
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
            </GridUl>

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

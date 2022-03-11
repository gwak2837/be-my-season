import { useRouter } from 'next/router'
import { Fragment, ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import FAQLayout from 'src/layouts/FAQLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import faq from 'src/pages/api/faq'
import user from 'src/pages/api/user'
import { HorizontalBorder } from 'src/pages/content/[id]'
import { FlexEndCenter, OrangeButton, WhiteButton } from 'src/pages/introduce'
import DownFilledArrow from 'src/svgs/down-filled-arrow.svg'
import UpFilledArrow from 'src/svgs/up-filled-arrow.svg'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  box-shadow: 0 0 0 1px #bebebe;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  box-shadow: 0 0 0 1px #bebebe;
`

const FlexGap = styled.div`
  display: flex;
  gap: 0.5rem;
`

const GridGap = styled.div`
  display: grid;
  gap: 0.5rem;
`

function FAQCreationForm() {
  const router = useRouter()

  const { data: user } = useAuth()
  const { mutate } = useSWRConfig()
  const [isCreationLoading, setIsCreationLoading] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      category: 0,
      title: '',
      description: '',
    },
  })

  // Create FAQ
  async function createFAQ({ category, title, description }: any) {
    if (!user?.userId) {
      router.replace('/login')
      sessionStorage.setItem('redirectionUrlAfterLogin', router.asPath)
      return
    }

    setIsCreationLoading(true)

    const response = await fetch(`/api/faq`, {
      method: 'POST',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, title, description }),
    })

    if (response.ok) {
      toast.success('FAQ를 작성했습니다')
      mutate(`/api/faq`)
      mutate(`/api/faq?category=${category}`)
    } else {
      const result = await response.json()
      toast.warn(result.message)
    }

    setIsCreationLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(createFAQ)}>
      <GridGap>
        <FlexGap>
          <select disabled={isCreationLoading} {...register('category')}>
            <option value={0}>Payment</option>
            <option value={1}>Refund</option>
            <option value={2}>Program</option>
          </select>
          <OrangeButton disabled={isCreationLoading} type="submit">
            생성
          </OrangeButton>
        </FlexGap>
        <Input
          disabled={isCreationLoading}
          placeholder="FAQ 제목을 입력해주세요"
          {...register('title', {
            required: 'FAQ 제목을 입력해주세요',
            minLength: {
              value: 5,
              message: 'FAQ 제목을 5글자 이상 입력해주세요',
            },
            maxLength: {
              value: 100,
              message: 'FAQ 제목을 100글자 이하로 입력해주세요',
            },
          })}
        />
        <TextArea
          disabled={isCreationLoading}
          placeholder="FAQ 내용을 입력해주세요"
          {...register('description', {
            required: 'FAQ 내용을 입력해주세요',
            minLength: {
              value: 10,
              message: 'FAQ 내용을 10글자 이상 입력해주세요',
            },
            maxLength: {
              value: 1000,
              message: 'FAQ 내용을 1000글자 이하로 입력해주세요',
            },
          })}
        />
      </GridGap>
    </form>
  )
}

const MinWidth = styled.div`
  min-width: 15rem;
`

const FlexBetweenCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`

const P = styled.p`
  margin: 1rem 0;
`

const HorizontalBorderGrey = styled(HorizontalBorder)`
  border-color: #eee;
`

function decodeFAQType(type: number) {
  switch (type) {
    case 0:
      return '결제 관련'
    case 1:
      return '환불 관련'
    case 2:
      return '프로그램'
    default:
      return ''
  }
}

function FAQCard({ faq }: any) {
  const router = useRouter()

  const { data: user } = useAuth()
  const { mutate } = useSWRConfig()

  // Toggle opening body
  const [isOpen, setIsOpen] = useState(false)

  function toggleOpen() {
    setIsOpen((prev) => !prev)
  }

  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  async function updateContent() {
    return toast.warn('구현 중')

    setIsUpdateLoading(true)

    const response = await fetch(`/api/faq/${faq.id}`, {
      method: 'PUT',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '',
        description: '',
      }),
    })

    if (response.ok) {
      toast.success('수정에 성공했습니다')
      mutate(`/api/faq`)
      setIsUpdateMode(false)
    } else {
      toast.warn(await response.text())
    }

    setIsUpdateLoading(false)
  }

  // Delete content
  const [isDeletionLoading, setIsDeletionLoading] = useState(false)

  async function deleteContent() {
    setIsDeletionLoading(true)

    const response = await fetch(`/api/faq/${faq.id}`, {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    if (response.ok) {
      toast.success('삭제에 성공했습니다')
      mutate('/api/faq')
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
    <MinWidth key={faq.id}>
      <HorizontalBorder />
      <FlexBetweenCenter onClick={toggleOpen}>
        <Grid>
          <h4>{decodeFAQType(faq.category)}</h4>
          <div>{faq.title}</div>
        </Grid>
        <button>{isOpen ? <UpFilledArrow /> : <DownFilledArrow />}</button>
      </FlexBetweenCenter>
      {isOpen && (
        <>
          <HorizontalBorderGrey />
          <P>{applyLineBreak(faq.description)}</P>

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
        </>
      )}
    </MinWidth>
  )
}

export function applyLineBreak(line: string) {
  return line.split('\n').map((title, i) => (
    <Fragment key={i}>
      {title}
      <br />
    </Fragment>
  ))
}

const description = ''

export default function FAQPage() {
  const { data: user } = useAuth()

  // Fetch FAQ
  const { data: faqs, error } = useSWR('/api/faq', defaultFetcher)

  return (
    <PageHead title="자주 묻는 질문 - Be:MySeason" description={description}>
      {user?.isAdmin && <FAQCreationForm />}
      {faqs ? (
        faqs.map((faq: any) => <FAQCard key={faq.id} faq={faq} />)
      ) : error ? (
        <div>error</div>
      ) : (
        <div>loading</div>
      )}
      <HorizontalBorder />
    </PageHead>
  )
}

FAQPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <FAQLayout>{page}</FAQLayout>
    </NavigationLayout>
  )
}

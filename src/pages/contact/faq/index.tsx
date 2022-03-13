import { useRouter } from 'next/router'
import { Fragment, ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import FAQCard from 'src/components/FAQCard'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import FAQLayout from 'src/layouts/FAQLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { HorizontalBorder } from 'src/pages/content/[id]'
import { OrangeButton } from 'src/pages/introduce'
import { defaultFetcher, resizeTextareaHeight, submitWhenShiftEnter } from 'src/utils'
import styled from 'styled-components'
import useSWR, { useSWRConfig } from 'swr'

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  box-shadow: 0 0 0 1px #bebebe;
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 20vh;
  max-height: 50vh;
  padding: 0.5rem 1rem;

  box-shadow: 0 0 0 1px #bebebe;
  outline: none;
  resize: none;
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
    reset,
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
      reset()
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
          onKeyDown={submitWhenShiftEnter}
          onInput={resizeTextareaHeight}
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

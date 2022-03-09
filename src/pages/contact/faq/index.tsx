import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import FAQLayout from 'src/layouts/FAQLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import useSWR, { useSWRConfig } from 'swr'

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
      <select disabled={isCreationLoading} {...register('category')}>
        <option value={0}>Payment</option>
        <option value={1}>Refund</option>
        <option value={2}>Program</option>
      </select>
      <input
        disabled={isCreationLoading}
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
      <textarea
        disabled={isCreationLoading}
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
      <button disabled={isCreationLoading} type="submit">
        생성
      </button>
    </form>
  )
}

const description = ''

export default function FAQPage() {
  const { data: user } = useAuth()

  // Fetch FAQ
  const { data: faqs, error } = useSWR('/api/faq', defaultFetcher)

  return (
    <PageHead title="자주 묻는 질문 - Be:MySeason" description={description}>
      {user?.isAdmin === 1 && <FAQCreationForm />}
      {faqs ? (
        faqs.map((faq: any) => (
          <li key={faq.id}>
            <pre>{JSON.stringify(faq, null, 2)}</pre>
          </li>
        ))
      ) : error ? (
        <div>error</div>
      ) : (
        <div>loading</div>
      )}
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

import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import FAQLayout from 'src/layouts/FAQLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import useSWR, { useSWRConfig } from 'swr'

const description = ''

export default function FAQPage() {
  const { data: user } = useAuth()

  // Fetch FAQ
  const { data: programFAQs, error } = useSWR(`/api/faq?category=2`, defaultFetcher)

  return (
    <PageHead title="프로그램 관련 FAQ - Be:MySeason" description={description}>
      {programFAQs ? (
        programFAQs.map((faq: any) => (
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

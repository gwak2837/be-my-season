import { ReactElement } from 'react'
import FAQCard from 'src/components/FAQCard'
import PageHead from 'src/components/PageHead'
import FAQLayout from 'src/layouts/FAQLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { HorizontalBorder } from 'src/pages/content/[id]'
import { defaultFetcher } from 'src/utils'
import useSWR from 'swr'

const description = ''

export default function FAQPage() {
  // Fetch FAQ
  const { data: refundFAQs, error } = useSWR(`/api/faq?category=1`, defaultFetcher)

  return (
    <PageHead title="환불 관련 FAQ - Be:MySeason" description={description}>
      {refundFAQs ? (
        refundFAQs.map((faq: any) => <FAQCard key={faq.id} faq={faq} />)
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

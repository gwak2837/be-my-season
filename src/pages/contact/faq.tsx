import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function FAQPage() {
  return (
    <PageHead title="자주 묻는 질문 - Be:MySeason" description={description}>
      faq
    </PageHead>
  )
}

FAQPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}

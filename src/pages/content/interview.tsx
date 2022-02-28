import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import ContentLayout from 'src/layouts/ContentLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function InterviewsPage() {
  return (
    <PageHead title="인터뷰 - Be:MySeason" description={description}>
      interview
    </PageHead>
  )
}

InterviewsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ContentLayout>{page}</ContentLayout>
    </NavigationLayout>
  )
}

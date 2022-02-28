import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import ContentLayout from 'src/layouts/ContentLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function ContentsPage() {
  return (
    <PageHead title="모든 컨텐츠 - Be:MySeason" description={description}>
      all
    </PageHead>
  )
}

ContentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ContentLayout>{page}</ContentLayout>
    </NavigationLayout>
  )
}

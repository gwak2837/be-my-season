import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import ContentLayout from 'src/layouts/ContentLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function ColumnsPage() {
  return (
    <PageHead title="컬럼 - Be:MySeason" description={description}>
      columns
    </PageHead>
  )
}

ColumnsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ContentLayout>{page}</ContentLayout>
    </NavigationLayout>
  )
}

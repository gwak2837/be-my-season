import { ReactElement, useState } from 'react'
import ContentCard from 'src/components/ContentCard'
import PageHead from 'src/components/PageHead'
import ContentLayout from 'src/layouts/ContentLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import useSWR from 'swr'

import { Ul, buttonCount } from '.'

const description = ''

export default function ColumnsPage() {
  const [big, setBig] = useState(0)
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(`/api/content?type=0&page=${page - 1}`, defaultFetcher)

  return (
    <PageHead title="컬럼 - Be:MySeason" description={description}>
      <Ul>
        {data
          ? data.contents.map((content: any) => <ContentCard key={content.id} content={content} />)
          : error
          ? 'error'
          : 'loading'}
      </Ul>

      <ol>
        <button onClick={() => setBig(big - 1)}>{'<'}</button>
        {Array.from(Array(buttonCount).keys()).map((key) => (
          <button key={key} onClick={() => setPage(buttonCount * big + key + 1)}>
            {buttonCount * big + key + 1}
          </button>
        ))}
        <button onClick={() => setBig(big + 1)}>{'>'}</button>
      </ol>
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

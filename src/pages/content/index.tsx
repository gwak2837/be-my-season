import { ReactElement, useState } from 'react'
import ContentCard from 'src/components/ContentCard'
import PageHead from 'src/components/PageHead'
import ContentLayout from 'src/layouts/ContentLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR from 'swr'

export const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem 1rem;
`

export const buttonCount = 3
const description = ''

export default function ContentsPage() {
  const [big, setBig] = useState(0)
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(`/api/content?page=${page - 1}`, defaultFetcher)

  return (
    <PageHead title="모든 컨텐츠 - Be:MySeason" description={description}>
      <Ul>
        {data
          ? data.contents.map((content: any) => (
              <ContentCard key={content.id} content={content} showType />
            ))
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

ContentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ContentLayout>{page}</ContentLayout>
    </NavigationLayout>
  )
}

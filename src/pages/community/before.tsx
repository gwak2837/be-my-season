import { ReactElement, useState } from 'react'
import CommunityCard from 'src/components/CommunityCard'
import PageHead from 'src/components/PageHead'
import CommunityLayout from 'src/layouts/CommunityLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher } from 'src/utils'
import useSWR from 'swr'

import { Ul, buttonCount } from '../content'

const description = ''

export default function CommunityBeforePage() {
  const [big, setBig] = useState(0)
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(`/api/community?type=0&page=${page - 1}`, defaultFetcher)

  return (
    <PageHead title="예정된 커뮤니티 - Be:MySeason" description={description}>
      <Ul>
        {data
          ? data.communities.map((community: any) => (
              <CommunityCard key={community.id} community={community} />
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

CommunityBeforePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <CommunityLayout>{page}</CommunityLayout>
    </NavigationLayout>
  )
}

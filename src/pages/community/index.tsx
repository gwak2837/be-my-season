import { ReactElement, useState } from 'react'
import CommunityCard from 'src/components/CommunityCard'
import PageHead from 'src/components/PageHead'
import CommunityLayout from 'src/layouts/CommunityLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import LeftArrow from 'src/svgs/left-arrow.svg'
import RightArrow from 'src/svgs/right-arrow.svg'
import { defaultFetcher } from 'src/utils'
import useSWR from 'swr'

import { Button, Ol, Ul, buttonCount } from '../content'

const description = ''

export default function CommunityAllPage() {
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(`/api/community?page=${page - 1}`, defaultFetcher)

  // Buttons
  const [big, setBig] = useState(0)

  function goToPreviousPage() {
    setBig(big - 1)
    setPage(buttonCount * big + 1)
  }

  function goToNextPage() {
    setBig(big + 1)
    setPage(buttonCount * (big + 1) + 2)
  }

  return (
    <PageHead title="모든 커뮤니티 - Be:MySeason" description={description}>
      <Ul>
        {data
          ? data.communities.map((community: any) => (
              <CommunityCard key={community.id} community={community} showType />
            ))
          : error
          ? 'error'
          : 'loading'}
      </Ul>

      <Ol>
        <Button disabled={big === 0} onClick={goToPreviousPage}>
          <LeftArrow />
        </Button>
        {Array.from(Array(buttonCount).keys()).map((key) => (
          <Button key={key} onClick={() => setPage(buttonCount * big + key + 1)}>
            {buttonCount * big + key + 1}
          </Button>
        ))}
        <Button onClick={goToNextPage}>
          <RightArrow />
        </Button>
      </Ol>
    </PageHead>
  )
}

CommunityAllPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <CommunityLayout>{page}</CommunityLayout>
    </NavigationLayout>
  )
}

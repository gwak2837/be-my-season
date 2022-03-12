import { ReactElement, useState } from 'react'
import CommunityCard from 'src/components/CommunityCard'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProgramLayout from 'src/layouts/ProgramLayout'
import LeftArrow from 'src/svgs/left-arrow.svg'
import RightArrow from 'src/svgs/right-arrow.svg'
import { defaultFetcher } from 'src/utils'
import useSWR from 'swr'

import { Button, Ol, Ul, buttonCount } from '../content'

const description = ''

export default function CommunityIngPage() {
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(`/api/community?type=1&page=${page - 1}`, defaultFetcher)

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
    <PageHead title="진행 중인 커뮤니티 - Be:MySeason" description={description}>
      <Ul>
        {data
          ? data.communities.map((community: any) => (
              <CommunityCard key={community.id} community={community} />
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
          <Button
            key={key}
            onClick={() => setPage(buttonCount * big + key + 1)}
            selected={page === buttonCount * big + key + 1}
          >
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

CommunityIngPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ProgramLayout>{page}</ProgramLayout>
    </NavigationLayout>
  )
}

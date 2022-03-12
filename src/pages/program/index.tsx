import Image from 'next/image'
import { ReactElement, useState } from 'react'
import PageHead from 'src/components/PageHead'
import ProgramCard from 'src/components/ProgramCard'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProgramLayout from 'src/layouts/ProgramLayout'
import LeftArrow from 'src/svgs/left-arrow.svg'
import RightArrow from 'src/svgs/right-arrow.svg'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR from 'swr'

import { Button, Ol, Ul, buttonCount } from '../content'

const description = ''

export default function ProgramsPage() {
  const [page, setPage] = useState(1)
  const { data: programs, error } = useSWR(`/api/program?page=${page - 1}`, defaultFetcher)

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
    <PageHead title="모든 프로그램 - Be:MySeason" description={description}>
      <Ul>
        {programs ? (
          programs.length > 0 ? (
            programs.map((program: any) => (
              <ProgramCard key={program.id} program={program} showType showStatus />
            ))
          ) : (
            <div>프로그램이 없습니다</div>
          )
        ) : error ? (
          <div>error</div>
        ) : (
          <div>loading</div>
        )}
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

ProgramsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ProgramLayout>{page}</ProgramLayout>
    </NavigationLayout>
  )
}

import Image from 'next/image'
import { ReactElement, useState } from 'react'
import PageHead from 'src/components/PageHead'
import ProgramCard from 'src/components/ProgramCard'
import NavigationLayout from 'src/layouts/NavigationLayout'
import ProgramLayout from 'src/layouts/ProgramLayout'
import { defaultFetcher } from 'src/utils'
import styled from 'styled-components'
import useSWR from 'swr'

import { Ul, buttonCount } from '../content'

const description = ''

export default function ReWProgramsPage() {
  const [big, setBig] = useState(0)
  const [page, setPage] = useState(1)
  const { data: programs, error } = useSWR(`/api/program?type=1&page=${page - 1}`, defaultFetcher)

  return (
    <PageHead title="Re-W - Be:MySeason" description={description}>
      <Ul>
        {programs
          ? programs.map((program: any) => <ProgramCard key={program.id} program={program} />)
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

ReWProgramsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ProgramLayout>{page}</ProgramLayout>
    </NavigationLayout>
  )
}

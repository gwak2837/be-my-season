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

export default function ProgramsPage() {
  const [big, setBig] = useState(0)
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(`/api/program?page=${page - 1}`, defaultFetcher)

  return (
    <PageHead title="모든 프로그램 - Be:MySeason" description={description}>
      <Ul>
        {data
          ? data.programs.map((program: any) => (
              <ProgramCard key={program.id} program={program} showType />
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

ProgramsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <ProgramLayout>{page}</ProgramLayout>
    </NavigationLayout>
  )
}

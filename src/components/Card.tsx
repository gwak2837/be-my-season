/* eslint-disable react/jsx-no-undef */
import Image from 'next/image'
import { SquareFrame } from 'src/styles/common'
import styled from 'styled-components'

const Li = styled.li`
  display: grid;
  gap: 0.5rem;

  background: #efefef;
`

type Props = {
  data: any
}

function Card({ data }: Props) {
  return (
    <Li>
      <SquareFrame>
        <Image src="/images/sample.png" alt="sample" layout="fill" objectFit="cover" />
      </SquareFrame>
      <h3>{data.title}</h3>
      <p>{data.contents}</p>
    </Li>
  )
}

export default Card

/* eslint-disable react/jsx-no-undef */
import Image from 'next/image'
import styled from 'styled-components'

const Li = styled.li`
  display: grid;
  gap: 0.5rem;

  background: #efefef;
`

const SqureFrame = styled.div`
  aspect-ratio: 1 / 1;
  position: relative;
`

type Props = {
  data: any
}

function Card({ data }: Props) {
  return (
    <Li>
      <SqureFrame>
        <Image src="/images/sample.png" alt="sample" layout="fill" objectFit="cover" />
      </SqureFrame>
      <h3>{data.title}</h3>
      <p>{data.contents}</p>
    </Li>
  )
}

export default Card

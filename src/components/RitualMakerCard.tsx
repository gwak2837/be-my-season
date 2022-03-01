import Image from 'next/image'
import { CircleFrame } from 'src/styles/common'

type Props = {
  ritualMaker: any
}

function RitualMakerCard({ ritualMaker }: Props) {
  return (
    <li>
      <CircleFrame>
        <Image
          src="/images/logo-transparent.png"
          alt="ritual-maker-profile-image"
          layout="fill"
          objectFit="cover"
        />
      </CircleFrame>
      <h3>{ritualMaker.name}</h3>
      <h5>{ritualMaker.department}</h5>
    </li>
  )
}

export default RitualMakerCard

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SquareFrame } from 'src/styles/common'
import { formatNumber } from 'src/utils'

export function decodeProgramType(type: number) {
  switch (type) {
    case 0:
      return 'Pre-W'
    case 1:
      return 'Re-W'
    case 2:
      return 'Re-turnship'
    default:
      return ''
  }
}

export function decodeProgramStatus(type: number) {
  switch (type) {
    case 0:
      return '예정'
    case 1:
      return '진행중'
    case 2:
      return '완료'
    default:
      return ''
  }
}

type Props = {
  program: any
  showType?: boolean
  showStatus?: boolean
}

function ProgramCard({ program, showType, showStatus }: Props) {
  const a = []
  if (showType) a.push(decodeProgramType(program.type))
  if (showStatus) a.push(decodeProgramStatus(program.status))

  return (
    <li>
      <Link href={`/program/${program.id}`} passHref>
        <a>
          <SquareFrame>
            <Image src="/images/logo-transparent.png" alt="logo" layout="fill" objectFit="cover" />
          </SquareFrame>
          <div>
            {(showType || showStatus) && `[${a.join(', ')}] `}
            {program.title}
          </div>
          <div>{formatNumber(program.price)}원</div>
        </a>
      </Link>
    </li>
  )
}

export default ProgramCard

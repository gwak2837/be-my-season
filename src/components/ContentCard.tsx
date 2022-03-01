import Image from 'next/image'
import { useRouter } from 'next/router'
import { SquareFrame } from 'src/styles/common'

type Props = {
  content: any
}

function ContentCard({ content }: Props) {
  const router = useRouter()

  function goToContentPage() {
    router.push(`/content/${content.id}`)
  }

  return (
    <li onClick={goToContentPage}>
      <SquareFrame>
        <Image src="/images/logo-transparent.png" alt="logo" layout="fill" objectFit="cover" />
      </SquareFrame>
      <h3>{content.title}</h3>
      <h5>{content.creationTime}</h5>
    </li>
  )
}

export default ContentCard

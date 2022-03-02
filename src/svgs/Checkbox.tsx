import styled from 'styled-components'

const TransitionRect = styled.rect`
  transition: fill 0.3s ease-out;
`

type Props = {
  isChecked: boolean
}

function Checkbox({ isChecked }: Props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <TransitionRect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="1.5"
        fill={isChecked ? '#DE684A' : '#fff'}
        stroke="#DE684A"
      />
      <path
        d="M3 7.5L5.38725 10.4841C6.20398 11.505 7.76455 11.4806 8.54899 10.4347L13 4.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
    </svg>
  )
}

export default Checkbox

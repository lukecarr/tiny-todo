import type { FunctionalComponent, JSX } from 'preact'

type Props = {
  newTab?: boolean
}

const Link: FunctionalComponent<JSX.HTMLAttributes<HTMLAnchorElement> & Props> = ({ newTab, children, ...props }) => {
  return <a
    font="semibold"
    underline="~ dotted hover:solid"
    {...(newTab && { target: '_blank', rel: 'noopener' })}
    {...props}
  >
    {children}
  </a>
}

export default Link
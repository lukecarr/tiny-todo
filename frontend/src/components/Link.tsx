import type { FunctionalComponent } from 'preact'

type Props = {
  newTab?: boolean
}

const Link: FunctionalComponent<JSX.HTMLAttributes<HTMLAnchorElement> & Props> = ({ newTab, children, ...props }) => {
  return <a
    class="font-semibold underline underline-dotted hover:underline-solid"
    {...(newTab && { target: '_blank', rel: 'noopener' })}
    {...props}
  >
    {children}
  </a>
}

export default Link
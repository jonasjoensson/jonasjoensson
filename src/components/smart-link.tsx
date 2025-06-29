import { Link, type LinkOptions } from "@tanstack/react-router"

type SmartLinkProps = {
  linkOptions: LinkOptions | undefined
  href: string | undefined
  children: React.ReactNode
  className?: string
}

export function SmartLink({
  href,
  linkOptions,
  children,
  className,
  ...props
}: SmartLinkProps) {
  console.log(href)
  if (href) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link {...linkOptions} className={className} {...props}>
      {children}
    </Link>
  )
}

import { Link, LinkOptions } from "@tanstack/react-router";

type SmartLinkProps = {
  linkOptions?: LinkOptions;
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
};

export function SmartLink({
  href,
  linkOptions,
  children,
  className,
  target,
  ...props
}: SmartLinkProps) {
  if (href) {
    return (
      <a
        href={href}
        className={className}
        target={target || "_blank"}
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link {...linkOptions} className={className} {...props}>
      {children}
    </Link>
  );
}

import React, { useRef, useState } from 'react'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const Button = ({
  children,
  href,
  onClick,
  target,
  className = '',
  size = 'md',
}: ButtonProps) => {
  const baseClasses =
    'flex items-center bg-white z-20 rounded-lg border border-solid border-black text-black shadow-[3px_3px_0_0_#000] transition-all duration-300'
  const pressedClasses = 'shadow-none translate-x-[3px] translate-y-[3px]'

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-xl',
    lg: 'py-3 px-6 text-2xl',
  }

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${className}`

  const [pressed, setPressed] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const animationDuration = 300
  // Delay before navigation or onClick, matching animation duration
  const handleClick = () => {
    setPressed(true)
    timeoutRef.current = setTimeout(() => {
      setPressed(false)
      if (href) {
        if (target === '_blank') {
          window.open(href, '_blank', 'noopener,noreferrer')
        } else {
          window.location.href = href
        }
      }
      if (onClick) {
        onClick()
      }
    }, animationDuration)
  }

  // Clean up timeout when button unmounts
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <button
      className={`${buttonClasses} ${pressed ? pressedClasses : ''}`}
      onMouseDown={handleClick}
      disabled={pressed}
      type="button"
    >
      {children}
    </button>
  )
}

export default Button

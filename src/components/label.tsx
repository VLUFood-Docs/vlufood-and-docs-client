import { cn } from '@/lib/utils'

interface LabelProps {
  size?: 'heading' | 'subheading' | 'body' | 'caption' | 'link'
  colorVariant?: 'primary' | 'secondary'
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

export default function Label({ size, colorVariant, className, children, onClick }: LabelProps) {
  // Xác định lớp CSS dựa trên thuộc tính size
  const sizeClasses = {
    heading: 'text-4xl font-bold',
    subheading: 'text-2xl font-semibold',
    body: 'text-base',
    caption: 'text-sm text-gray-500',
    link: 'text-blue-600 underline cursor-pointer',
  }

  // Xác định lớp CSS dựa trên thuộc tính colorVariant
  const colorClasses = {
    primary: 'text-primary', // Sử dụng lớp text-primary
    secondary: 'text-secondary', // Sử dụng lớp text-secondary
  }

  // Kết hợp các lớp CSS
  const classes = cn(size ? sizeClasses[size] : sizeClasses['heading'], colorVariant ? colorClasses[colorVariant] : '', className)

  return (
    <p className={classes} onClick={onClick}>
      {children}
    </p>
  )
}

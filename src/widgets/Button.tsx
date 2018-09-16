import * as React from 'react'

export interface IButtonProps {
  children: JSX.Element
  variant?: string
  primary?: boolean
  secondary?: boolean
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export const Button = (props: IButtonProps) => {
  const addClassName = (include: boolean, className: string) => {
    if (include) {
      buttonClassNames.push(className)
    }
  }

  const variantMapper = {
    bordered: 'bordered',
    contained: 'contained',
  }

  const buttonClassNames = ['widget-button']
  addClassName(!!props.className, props.className || '')
  addClassName(!!props.primary, 'primary')
  addClassName(!!props.secondary, 'secondary')
  addClassName(!!props.disabled, 'disabled')
  addClassName(!!props.fullWidth, 'full-width')
  addClassName(
    !!props.variant,
    props.variant ? variantMapper[props.variant] : ''
  )

  return (
    <div className={buttonClassNames.join(' ')} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

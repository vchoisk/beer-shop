import * as React from 'react'
import { isUndefined } from 'lodash'

export interface IButtonProps {
  children: JSX.Element
  variant?: string
  primary?: boolean | undefined
  secondary?: boolean | undefined
  disabled?: boolean | undefined
  className?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => {}
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
  addClassName(!isUndefined(props.className), props.className || '')
  addClassName(!isUndefined(props.primary), 'primary')
  addClassName(!isUndefined(props.secondary), 'secondary')
  addClassName(!isUndefined(props.disabled), 'disabled')
  addClassName(
    !isUndefined(props.variant),
    props.variant ? variantMapper[props.variant] : ''
  )

  return (
    <div className={buttonClassNames.join(' ')} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

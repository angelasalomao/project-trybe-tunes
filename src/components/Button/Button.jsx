import React from 'react'
import "./Button.css"

export const Button = ({children, dark, className, ...props}) => {
  const theme = dark ? 'button dark' : 'button'
  const buttonClass = `${className} ${theme}`

  return <button className={buttonClass} {...props}>{children}</button>
}
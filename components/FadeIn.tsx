"use client"

import React, { useEffect, useState } from 'react'

interface FadeInProps {
  show: boolean
  delay?: number
  className?: string
  children: React.ReactNode
}

export const FadeIn: React.FC<FadeInProps> = ({ show, delay = 0, className = '', children }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [show, delay])

  return (
    <div
      className={`transition-opacity duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}


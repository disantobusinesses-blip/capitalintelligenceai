'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ServiceType = 'landing-page' | 'full-package' | null

interface GetStartedModalContextValue {
  isOpen: boolean
  preselectedService: ServiceType
  openModal: (service?: ServiceType) => void
  closeModal: () => void
}

const GetStartedModalContext = createContext<GetStartedModalContextValue | undefined>(undefined)

export function GetStartedModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState<ServiceType>(null)

  return (
    <GetStartedModalContext.Provider
      value={{
        isOpen,
        preselectedService,
        openModal: (service = null) => {
          setPreselectedService(service)
          setIsOpen(true)
        },
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </GetStartedModalContext.Provider>
  )
}

export function useGetStartedModal() {
  const context = useContext(GetStartedModalContext)
  if (!context) {
    throw new Error('useGetStartedModal must be used within a GetStartedModalProvider')
  }
  return context
}

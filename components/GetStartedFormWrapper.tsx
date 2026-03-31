'use client'

import GetStartedForm from '@/components/GetStartedForm'
import { useGetStartedModal } from '@/context/GetStartedModalContext'

export default function GetStartedFormWrapper() {
  const { isOpen, preselectedService, closeModal } = useGetStartedModal()
  return (
    <GetStartedForm
      isOpen={isOpen}
      onClose={closeModal}
      preselectedService={preselectedService}
    />
  )
}

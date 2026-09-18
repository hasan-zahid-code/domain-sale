import { createFileRoute } from '@tanstack/react-router'
import DomainOfferForm from '../components/DomainOfferForm'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <DomainOfferForm />
    </div>
  )
}

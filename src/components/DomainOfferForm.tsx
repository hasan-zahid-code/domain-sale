import { useState } from 'react'

const FORM_NAME = 'domain-offer'

const initialFields = {
  price_offer_pkr: '',
  first_name: '',
  second_name: '',
  email: '',
  confirm_email: '',
  phone: '',
  comment: '',
}

export default function DomainOfferForm() {
  const [fields, setFields] = useState(initialFields)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields({ ...fields, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (fields.email.trim().toLowerCase() !== fields.confirm_email.trim().toLowerCase()) {
      setError('Email and Confirm Email do not match.')
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)

    setSubmitting(true)
    fetch('/form-domain-offer.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as never).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setError('Something went wrong submitting the form. Please try again.'))
      .finally(() => setSubmitting(false))
  }

  if (submitted) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Thank you for your offer</h2>
        <p className="text-slate-600">
          We&apos;ve received your submission and will contact you back within two business days with price and
          terms.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg px-4">
      <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">transprint.com.pk</h1>
      <p className="text-lg font-semibold text-slate-700 mb-4">This domain is for sale</p>
      <p className="mb-2 text-slate-600">
        If you are interested in purchasing this domain name, please submit this form.
      </p>
      <p className="mb-8 text-sm text-slate-500 italic">
        We will contact you back within two business days with price and terms.
      </p>

      <form
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <p className="hidden" style={{ display: 'none' }}>
          <label>
            Don&apos;t fill this out: <input name="bot-field" />
          </label>
        </p>

        <div>
          <label htmlFor="price_offer_pkr" className="block text-sm font-medium mb-2">
            Price Offer in PKR <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
              PKR
            </span>
            <input
              type="number"
              min="0"
              step="1"
              id="price_offer_pkr"
              name="price_offer_pkr"
              value={fields.price_offer_pkr}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-4 py-3 rounded-lg border focus:outline-none"
              placeholder="e.g. 150000"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">Offers under PKR 50,000 are usually not considered.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium mb-2">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={fields.first_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none"
              placeholder="First name"
            />
          </div>

          <div>
            <label htmlFor="second_name" className="block text-sm font-medium mb-2">
              Second Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="second_name"
              name="second_name"
              value={fields.second_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none"
              placeholder="Second name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            E-Mail <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="confirm_email" className="block text-sm font-medium mb-2">
            Confirm E-Mail <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="confirm_email"
            name="confirm_email"
            value={fields.confirm_email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            value={fields.comment}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none resize-none"
            placeholder="Anything else you'd like to add..."
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-8 py-3 border font-semibold rounded-lg disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Submit Offer'}
        </button>

        <p className="text-xs text-slate-500">*Fields are required (all except phone)</p>
      </form>
    </div>
  )
}

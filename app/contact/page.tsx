import ContactForm from '../components/ContactForm'

export const metadata = {
  title: 'Contact — Country Guitar Standard',
  description: 'Get in touch about guides, feedback, or collaboration.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <div className="border-l-4 border-barn pl-3 sm:pl-4">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream">Get in touch</h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-cream-muted">
          Have questions, feedback, or want to collaborate? I'd love to hear from you.
        </p>
      </div>

      <div className="mt-10 sm:mt-12">
        <ContactForm />
      </div>

      <div className="mt-12 sm:mt-16 space-y-4">
        <h2 className="font-display text-lg font-semibold text-cream">Other ways to reach me</h2>
        <ul className="text-sm text-cream-muted space-y-2">
          <li>
            <strong className="text-cream">Email:</strong> check the footer for contact
          </li>
          <li>
            <strong className="text-cream">Twitter:</strong> Connect on social media (coming soon)
          </li>
          <li>
            <strong className="text-cream">Newsletter:</strong> <a href="/" className="text-gold hover:underline">Subscribe via homepage</a>
          </li>
        </ul>
      </div>

      <p className="mt-10 sm:mt-12 text-xs sm:text-sm text-cream-muted">
        <a href="/" className="text-gold hover:underline">Back to home</a>
      </p>
    </div>
  )
}

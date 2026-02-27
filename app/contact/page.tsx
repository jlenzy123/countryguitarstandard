import ContactForm from '../components/ContactForm'

export const metadata = {
  title: 'Contact — Country Guitar Standard',
  description: 'Get in touch about guides, feedback, or collaboration.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 pb-16">
      <div className="pt-8">
        <p className="font-bebas text-sm uppercase tracking-[0.25em] text-accent mb-4">Contact</p>
        <h1 className="font-bebas text-4xl sm:text-5xl font-bold text-cream uppercase tracking-wide mb-4">Get in touch</h1>
        <p className="text-base sm:text-lg text-cream-muted leading-relaxed">
          Have questions, feedback, or want to collaborate? I'd love to hear from you.
        </p>
      </div>

      <div className="mt-10 sm:mt-12">
        <ContactForm />
      </div>

      <div className="mt-12 sm:mt-16 space-y-4">
        <h2 className="font-bebas text-2xl font-bold text-cream uppercase tracking-wide mb-4">Other ways to reach me</h2>
        <ul className="text-sm text-cream-muted space-y-2">
          <li>
            <strong className="text-cream">Email:</strong> check the footer for contact
          </li>
          <li>
            <strong className="text-cream">Twitter:</strong> Connect on social media (coming soon)
          </li>
          <li>
            <strong className="text-cream">Newsletter:</strong> <a href="/" className="text-accent hover:underline">Subscribe via homepage</a>
          </li>
        </ul>
      </div>

      <p className="mt-10 sm:mt-12 text-xs sm:text-sm text-cream-muted">
        <a href="/" className="text-accent hover:underline">Back to home</a>
      </p>
    </div>
  )
}

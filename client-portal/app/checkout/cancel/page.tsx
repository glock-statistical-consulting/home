export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Zahlung abgebrochen</h1>
        <p className="text-gray-600 mb-8">
          Du hast die Zahlung abgebrochen. Falls du Fragen hast, kontaktiere mich einfach.
        </p>
        <a
          href="/"
          className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700"
        >
          Zur&uuml;ck zur Startseite
        </a>
      </div>
    </main>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center p-4">
      <section style={{
        width: '100%',
        maxWidth: '600px',
        minHeight: '300px',
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
            404 - Page Not Found
          </h1>
          <p className="mb-8 text-lg text-white">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-opacity-90 transition-all"
          >
            Return Home
          </Link>
        </div>
      </section>
    </div>
  )
}
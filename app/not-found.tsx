export default function NotFound() {
  return (
    <section style={{
      backgroundImage: 'url(./not-found.webp)', 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '300px',
      height: '150px',
      borderRadius:40,
      position: 'relative'
    }}>
      <div className="place-items-center">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter text-black">
        404 - Page Not Found
      </h1>
      <p className="mb-4 text-black">Sorry, the page you are looking for does not exist.</p>
      </div>
    </section>
  )
}
import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <div className='flex items-center group space-x-10'>

      <h1 className="mb-8 text-2xl font-semibold tracking-tighter cursor-crosshair">
        My Portfolio
      </h1>
        <Image src={'/not-found.webp'} alt='profile photo'
        width={80}
        height={80} className='object-cover rounded-xl hover:scale-[1.4] transition-transform duration-500 group-hover:translate-x-10 hover:-translate-y-5' />
        </div>
      <p className="mb-4">
        {`I'm a tech enthusiast and problem solver, exploring the realms of software development and civil engineering. With a passion for programming, I dive deep into frameworks like Flutter, React, and Django, combining them with tools like Tailwind CSS for dynamic user interfaces. I value simplicity in code, favor static typing for robust development, and appreciate the elegance of dark mode for long coding sessions. As a civil engineering student, I integrate my love for mathematics and mechanics into structural designs, using tools like AutoCAD and SketchUp to bridge my technical and creative pursuits.`} </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}

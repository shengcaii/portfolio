import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I'm a tech enthusiast and problem solver, exploring the realms of software development and civil engineering. With a passion for programming, I dive deep into frameworks like Flutter, React, and Django, combining them with tools like Tailwind CSS for dynamic user interfaces. I value simplicity in code, favor static typing for robust development, and appreciate the elegance of dark mode for long coding sessions. As a civil engineering student, I integrate my love for mathematics and mechanics into structural designs, using tools like AutoCAD and SketchUp to bridge my technical and creative pursuits.`} </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}

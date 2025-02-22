import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <div className="flex items-center group space-x-6 md:space-x-10 my-4">
        <h1 className="mb-4 text-xl md:text-2xl font-semibold tracking-tighter">
          Hello, I'm <span className="text-blue-500">Thiha Aung</span> 👋
        </h1>
        <Image
          src="/me.webp"
          alt="profile photo"
          width={100}
          height={100}
          className=" rounded-md hover:scale-110 transition-transform duration-500 group-hover:translate-x-2 md:group-hover:translate-x-10 hover:-translate-y-2 md:hover:-translate-y-5"
        />
      </div>
      <p className="mb-4">
        I'm a civil engineering student at Technological University of Thanlyin, but I also enjoy web development as a hobby. I love finding ways to make things easier and more efficient, especially by automating tasks with programming tools and tricks. Along the way, I've learned a lot from great resources and authors who have helped me grow. I'm still learning and always open to new ideas and opportunities!
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}

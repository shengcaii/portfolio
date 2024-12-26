import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <div className="flex items-center group space-x-6 md:space-x-10 my-4">
        <h1 className="mb-4 text-xl md:text-2xl font-semibold tracking-tighter">
          Hello, I'm <span className="text-blue-500">Shengcai</span> 👋
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
        I'm a student at Technological University of Thanlyin studying civil engineering and also dive into web development as a hobby. I love to make things easier and more efficient especially in automated tasks by utitlizing the programming tricks and tools. There are a lot of resources and authors that had given me as a grip to climb up the ladder of programming. I'm still learning and I'm always open to new ideas and opportunities.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}

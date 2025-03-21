export default function Footer() {
  return (
    <footer className="px-8 border mt-1">
      <div className="max-w-xl py-4">
        <ul className="flex flex-row 
        space-x-4 md:space-x-8 text-neutral-600 dark:text-neutral-300">
          <li>
            <a
              className="group flex items-center transition-all duration-300 hover:text-neutral-800 dark:hover:text-neutral-100 hover:scale-105 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/shengcaii"
            >
              <p className="h-7 text-sm font-medium">github</p>
            </a>
          </li>
          <li>
            <a
              className="group flex items-center transition-all duration-300 hover:text-neutral-800 dark:hover:text-neutral-100 hover:scale-105 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
            >
              <p className="h-7 text-sm font-medium">rss</p>
            </a>
          </li>
        </ul>
        <p className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} MIT Licensed
        </p>
      </div>
    </footer>
  )
}

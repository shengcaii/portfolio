export default function Page() {
    return (
        <div>
            <h1 className="text-xl font-bold mb-10">My projects</h1>
            <p>
                I have been working on a few projects. Here are some of them:
            </p>
            <ul>
                <li className="hover:text-white text-sky-400"><a href="https://nyrddc.vercel.app" target="_blank">
                    Static site for My school
                </a>
                </li>
                <li>
                    <a href="https://thihaaung-auth.vercel.app" target="_blank" className="hover:text-white text-sky-400">
                        Luna, a dating app demo featuring authentication flow using supabase and Next.js
                    </a>
                </li>
            </ul>

        </div>
    )
}
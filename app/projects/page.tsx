
const projects = {
    "https://nyrddc.vercel.app": {
        name: "NYRDDC",
    },
    "https://thihaaung-auth.vercel.app": {
        name: "Luna, a dating app demo",
    },
    "https://shengcai-payload.vercel.app": {
        name: "Payload CMS",
    },
    "https://t.me/connectorhookbot": {
        name: "Telegram Bot"
    },
}

export default function Page() {
    return (
        <div>
            <h1 className="text-xl font-bold mb-10">My projects</h1>
            <p>
                I have been working on a few projects. Here are some of them:
            </p>
            <ul className="flex flex-col gap-2 mt-4">
                {Object.entries(projects).map(([path, { name }]) => {
                    return (
                        <a
                            key={path}
                            href={path}
                            className="transition-all text-sky-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative px-2"
                            target="_blank"
                        >
                            {name}
                        </a>
                    )
                })}
            </ul>

        </div>
    )
}
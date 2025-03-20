import useSWR from 'swr';

type Post = {
    _id: string;
    title: string;
    excerpt: string;
    slug: string;
    publishedAt: string;
};

const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data.posts;
};

export function usePosts() {
    const { data: posts, error, isLoading } = useSWR<Post[]>('/api/posts', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 600000, // Cache for 10 minutes
    });

    return {
        posts,
        isLoading,
        isError: error
    };
}
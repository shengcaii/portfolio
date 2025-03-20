import Link from 'next/link';
import { CreatePost } from 'app/components/create-post';

export const metadata = {
    title: 'Admin Dashboard',
    description: 'Manage your blog posts and site content.',
};

export default function AdminPage() {
    return (
        <section>
            <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-admin-card p-6 rounded-lg shadow-sm border border-admin-border">
                    <h2 className="text-admin-text text-xl font-medium mb-4">Quick Actions</h2>
                    <div className="space-y-2">
                        <Link
                            href="/admin/posts"
                            className="block w-full text-admin-text text-left px-4 py-2 bg-admin-action hover:bg-admin-action-hover rounded-md"
                        >
                            Manage Posts
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="block w-full text-admin-text text-left px-4 py-2 bg-admin-action hover:bg-admin-action-hover rounded-md"
                        >
                            Site Settings
                        </Link>
                    </div>
                </div>

                <div className="bg-admin-card p-6 rounded-lg shadow-sm border border-admin-border">
                    <h2 className="text-admin-text text-xl font-medium mb-4">Stats</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-admin-text-muted">Total Posts</p>
                            <p className="text-admin-text text-3xl font-bold">5</p>
                        </div>
                        <div>
                            <p className="text-admin-text-muted">Recent Views</p>
                            <p className="text-admin-text text-3xl font-bold">128</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-admin-card p-6 rounded-lg shadow-sm border border-admin-border">
                <h2 className="text-admin-text text-xl font-medium mb-4">Create New Post</h2>
                <CreatePost />
            </div>
        </section>
    );
}
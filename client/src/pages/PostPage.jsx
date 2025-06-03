import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if (!res.ok || !data.posts || data.posts.length === 0) {
                    setError(true);
                    return;
                }

                setPost(data.posts[0]);
                setError(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postSlug]);

    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            {loading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <Spinner size='xl' />
                </div>
            ) : error || !post ? (
                <p className='text-center mt-10'>Post not found</p>
            ) : (
                <>
                    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                        {post && post.title}
                    </h1>

                    <Link to={`/search?category=${post && post.category}`} className='mt-5 self-center'>
                        <Button color='gray' pill size='xs'>
                            {post && post.category}
                        </Button>
                    </Link>

                    <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' />

                    <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
                    </div>

                    <div dangerouslySetInnerHTML={{__html: post && post.content }} className='p-3 max-w-2xl mx-auto w-full post-content'>

                    </div>

                    <div className='max-w-4xl mx-auto w-full'>
                        <CallToAction />
                    </div>

                    <div>
                        <CommentSection postId={post._id} />
                    </div>
                </>
            )}
        </main>
    );
}

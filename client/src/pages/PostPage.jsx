import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';

import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);

    // Cargar el post actual
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
            } catch (err) {
                console.error('Error fetching post:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postSlug]);

    // Cargar posts recientes
    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts?limit=3');
                const data = await res.json();

                if (res.ok && Array.isArray(data.posts)) {
                    setRecentPosts(data.posts);
                } else {
                    console.warn('Expected an array of recent posts but got:', data);
                    setRecentPosts([]);
                }
            } catch (err) {
                console.error('Error fetching recent posts:', err.message);
                setRecentPosts([]);
            }
        };

        fetchRecentPosts();
    }, []);

    // Mientras carga
    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        );
    }

    // Si hay error o no hay post
    if (error || !post) {
        return <p className='text-center mt-10'>Post not found</p>;
    }

    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            {/* Título */}
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                {post.title}
            </h1>

            {/* Categoría */}
            <Link to={`/search?category=${post.category}`} className='self-center mt-5'>
                <Button color='gray' pill size='xs'>
                    {post.category}
                </Button>
            </Link>

            {/* Imagen */}
            <img
                src={post.image}
                alt={post.title}
                className='mt-10 p-3 max-h-[600px] w-full object-cover'
            />

            {/* Fecha y tiempo estimado de lectura */}
            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>
                    {(post.content.length / 1000).toFixed(0)} mins read
                </span>
            </div>

            {/* Contenido del post */}
            <div
                className='p-3 max-w-2xl mx-auto w-full post-content'
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Llamada a la acción */}
            <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div>

            {/* Sección de comentarios */}
            <CommentSection postId={post._id} />

            {/* Posts recientes */}
            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 justify-center w-full'>
                    {recentPosts.length > 0 ? (
                        recentPosts.map((post) => <PostCard key={post._id} post={post} />)
                    ) : (
                        <p>No recent posts found.</p>
                    )}
                </div>
            </div>
        </main>
    );
}

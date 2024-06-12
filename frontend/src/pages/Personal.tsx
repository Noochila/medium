import Avatar from 'react-avatar';
import CustomAppBar from '../Components/AppBar';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParticularBlog } from "../hooks/Myblogs";
import Loading from '../Components/Loading';
import axios from 'axios';

const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const ArticleList = () => {
    const navigate = useNavigate();
    const { articles, loading } = useParticularBlog();

    useEffect(() => {
        if (!localStorage.getItem('token') || !localStorage.getItem('userName')) {
            navigate('/signin');
        }
    }, [navigate]);

    const handleDelete = async (articleId: string) => {
        try {
            await axios.delete(`https://backend.manojnoochila.workers.dev/api/v1/blog/${articleId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // Refresh the articles after deletion
            navigate('/');
        } catch (error) {
            console.error('Failed to delete article:', error);
        }
    };

    const handleEdit = (articleId: string) => {
        navigate(`/editor?articleId=${articleId}`);
    };

    return (
        <>
            <CustomAppBar />
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <Loading />
                    ) : (
                        articles.map(article => (
                            <div key={article.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center space-x-2">
                                        <Avatar name={article.author.name} size="40" round={true} className="mr-2" />
                                        <span className="font-semibold">{article.author.name}</span>
                                        <span className="text-gray-500">{formatDate(article.createdAt)}</span>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: article.title }}></div>
                                <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: article.content.substring(0, 300) + '...' }}></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">{Math.ceil(Math.random() * 6)} min read</span>
                                    <div>
                                        <Link to={`/article/${article.id}`} className="text-blue-500 hover:underline mr-4">Read more</Link>
                                        <button onClick={() => handleEdit(article.id)} className="text-green-500 hover:underline mr-4">Edit</button>
                                        <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:underline">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default ArticleList;
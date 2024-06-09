/* eslint-disable no-useless-escape */
import CustomAppBar from './AppBar';
import { useParticularBlog } from '../hooks/ParticularBlog';
import Loading from './Loading';

const ArticlePage = () => {
    const { article, loading } = useParticularBlog();

    return (
        <>
            <CustomAppBar />
            <div className="min-h-screen bg-gray-100 p-8">
                {loading ? (
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md relative">
                                               <Loading />
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                                               <h1 className="text-4xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: article.title }} />
                        <p className="text-gray-500 mb-2">Author: {article.author.name}</p>
                        <p className="text-gray-500 mb-4">Posted on {new Date(article.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</p>
                        <div className="text-lg" dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>
                )}
            </div>
        </>
    );
};

export default ArticlePage;



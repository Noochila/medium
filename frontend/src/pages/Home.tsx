import Avatar from 'react-avatar';
import CustomAppBar from '../Components/AppBar';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBlogs } from "../hooks/Blogs";
import Loading from '../Components/Loading';
import Pagination from '@mui/material/Pagination';

const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const ArticleList = () => {
  const navigate = useNavigate();
  const { articles, loading } = useBlogs();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  useEffect(() => {
    if (!localStorage.getItem('token') || !localStorage.getItem('userName')) {
      navigate('/signin');
    }
  }, [navigate]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <CustomAppBar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <Loading />
          ) : (
            <>
              {currentArticles.map(article => (
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
                    <Link to={`/article/${article.id}`} className="text-blue-500 hover:underline">Read more</Link>
                  </div>
                </div>
              ))}
              <Pagination count={Math.ceil(articles.length / articlesPerPage)} page={currentPage} onChange={paginate} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleList;
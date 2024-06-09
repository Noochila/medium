import { useState, ChangeEvent, useEffect } from "react";
import { Editor } from "primereact/editor";
import axios from "axios";
import { BlogSchema, blogSchema, blogUpdateSchema } from "@manojnoochila/medium-common";
import SimpleAlert from "../Components/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import CustomAppBar from "../Components/AppBar";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function BasicDemo() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleId = queryParams.get('articleId');
    const [blog, setBlog] = useState<BlogSchema>({
        title: "",
        content: "",
        published: true
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (articleId) {
            axios.get(`https://backend.manojnoochila.workers.dev/api/v1/blog/${articleId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                const { title, content, published } = response.data.blog;
                setBlog({ title, content, published });
                console.log(response.data.blog)
            }).catch(err => console.error(err));
        } else {
            setBlog({ title: "", content: "", published: true });
        }
    }, [articleId]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const blogData = { title: blog.title, content: blog.content, published: blog.published };
            const validationResult = blogSchema.safeParse(blogData);

            if (!validationResult.success) {
                setLoading(false);
                const errorMessages = validationResult.error.issues.map(issue => issue.message).join(", ");
                console.error("Validation errors:", errorMessages);
                return <SimpleAlert message={errorMessages} />;
            }

            const method = articleId ? 'put' : 'post';
            const url = `https://backend.manojnoochila.workers.dev/api/v1/blog`;

            if (method === 'put') {
                const putData = {
                    title: blog.title,
                    content: blog.content,
                    published: blog.published,
                    postId: articleId
                };
                const putValidationResult = blogUpdateSchema.safeParse(putData);
                if (!putValidationResult.success) {
                    setLoading(false);
                    const errorMessages = putValidationResult.error.issues.map(issue => issue.message).join(", ");
                    console.error("Validation errors on PUT request:", errorMessages);
                    return <SimpleAlert message={errorMessages} />;
                }
                await axios.put(url, putData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            } else {
                await axios.post(url, blogData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }

            navigate("/")

            if (!articleId) {
                setBlog({ title: "", content: "", published: true }); // Clear the form if a new article is posted
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = `<h1 style="font-weight: bold; text-decoration: underline;">${e.target.value}</h1>`;
        setBlog({ ...blog, title: newTitle });
    };

    return (
        <>
            <CustomAppBar />
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
                <h2 className="text-2xl font-bold text-center mb-6">{articleId ? "Edit A Blog Post" : "Create A Blog Post"}</h2>
                <textarea
                    placeholder="Enter Title Here"
                    value={blog.title.replace(/<[^>]+>/g, '')} // Strip HTML for display in textarea
                    onChange={handleTitleChange}
                    className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-300 text-lg font-semibold"
                    style={{ fontWeight: 'bold', fontFamily: 'italic' }}
                />

                <Editor
                    placeholder="Write your content here..."
                    value={blog.content}
                    onTextChange={(e) => setBlog({ ...blog, content: e.htmlValue || '' })}
                    style={{ height: '320px' }}
                    className="border border-gray-300 rounded-lg p-4 focus:border-blue-500"
                />
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    disabled={loading}
                >
                    {loading ? <Box sx={{ display: 'flex' }}><CircularProgress size={24} /></Box> : 'Submit'}
                </button>
            </div>
        </>
    )
}


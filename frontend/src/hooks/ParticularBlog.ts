import { useEffect, useState } from "react";
import { BlogFrontendSchema } from "@manojnoochila/medium-common";
import { useParams } from "react-router-dom";
import axios from "axios";
export const useParticularBlog = () => {
    const { id } = useParams();
    
    const [article, setArticle] = useState<BlogFrontendSchema>({
        id: "",
        title: "",
        content: "",
        createdAt: "",
        authorId: "",
        author: { name: "" },
        published: false,
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        function fetchBlogs() {

            axios.get(`https://backend.manojnoochila.workers.dev/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res) => {
                setArticle(res.data.blog);
             
                setLoading(false);

            });
        }
        fetchBlogs();
    }, [id])

    return { article, loading };


}


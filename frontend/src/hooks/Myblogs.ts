
import { useEffect, useState } from "react";
import { BlogFrontendSchema } from "@manojnoochila/medium-common";
import axios from "axios";
export const useParticularBlog = () => {
    const [articles, setArticles] = useState<BlogFrontendSchema[]>([{
        id: "",
        title: "",
        content: "",
        createdAt: "",
        authorId: "",
        author: { name: "" },
        published: false,
    }]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        function fetchBlogs() {

            axios.get("https://backend.manojnoochila.workers.dev/api/v1/blog/myblogs", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res) => {
                setArticles(res.data.posts);
                setLoading(false);

            });
        }
        fetchBlogs();
    }, [])

    return { articles, loading };


}


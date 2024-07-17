import axios from "axios";
import { getAuthToken } from "../../utils/auth";
import { API_BASE_URL } from "../../api/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function usePostDetailService() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getPostDetails(postId);
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [postId]);

  const getPostDetails = async (postId) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${API_BASE_URL}/api/posts/view/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
      throw error;
    }
  };

  return { post, loading, error, getPostDetails };
}

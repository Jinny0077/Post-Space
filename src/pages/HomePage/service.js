import { useEffect, useState } from "react";
import { getAuthToken } from "../../utils/auth";
import axios from "axios";
import { API_BASE_URL } from "../../api/index";
import usePostDetailService from "../PostDetail/service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const createPostSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  tag: yup
    .array()
    .of(yup.string().required("Tag is required"))
    .min(1, "At least one tag is required"),
});

export default function useHomePageService() {
  const [currentPostId, setCurrentPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState("");
  const [totalAccounts, setTotalAccounts] = useState("");
  const [totalMyPosts, setTotalMyPosts] = useState("");
  const [open, setOpen] = useState(false);
  const [isAdminAcc, setIsAdminAcc] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmModalOpen = (postId) => {
    setCurrentPostId(postId);
    setOpen(true);
  };

  const handleConfirmModalClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeletePost(currentPostId);
    setOpen(false);
  };

  const getAllPosts = async (page, limit) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/posts/mypost`,
        { page, limit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = response.data;
      setPosts(resData.data);
      setTotalPages(resData.totalPages);
      setTotalMyPosts(resData.totalPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getAllPostAdmin = async (page, limit) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${API_BASE_URL}/api/posts?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = response.data;

      setTotalPosts(resData.totalPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  const getAllAccountsAdmin = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.get(` ${API_BASE_URL}/api/accounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = response.data;
      const savedEmail = localStorage.getItem("email");
      const isAdmin = resData.accounts.some(
        (account) => account.email === savedEmail && account.role === "admin"
      );
      setIsAdminAcc(isAdmin);
      setTotalAccounts(resData.accounts.length);
      return isAdmin;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  const handleDeletePost = async (postId) => {
    setLoading(true);
    setCurrentPostId(postId);
    try {
      const token = getAuthToken();
      const url = ` ${API_BASE_URL}/api/posts/delete/${postId}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: false,
      });

      if (response.status === 200) {
        getAllPosts(page, 10);
        getAllPostAdmin(page, 10);
      } else {
        console.error("Error deleting post:", response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllAccountsAdmin();
  }, []);

  useEffect(() => {
    getAllPostAdmin(page, 10);

    getAllPosts(page, 10);
  }, [page]);

  //-----------------------------Create Edit-------------------------------------------
  const { getPostDetails } = usePostDetailService();

  const {
    control,
    handleSubmit,
    formState: { errors: createError },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      tag: "",
    },
    resolver: yupResolver(createPostSchema),
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = async (id, edit) => {
    setIsModalVisible(true);
    try {
      setCurrentPostId(id);
      if (edit && id) {
        setIsEdit(true);
        const res = await getPostDetails(id);
        setValue("title", res.title);
        setValue("content", res.body);
        setValue("tag", res.tags);
      } else {
        reset();
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error in showModal:", error);
    }
  };

  const editPost = async (data) => {
    const token = getAuthToken();
    const url = `${API_BASE_URL}/api/posts/edit/${currentPostId}`;
    try {
      const response = await axios.put(
        url,
        {
          title: data.title,
          body: data.content,
          tags: data.tag,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: false,
        }
      );
      return response;
    } catch (error) {
      console.error("Error editing post:", error);
      throw error;
    }
  };

  const createPost = async (data) => {
    const token = getAuthToken();
    const url = `${API_BASE_URL}/api/posts/create`;
    try {
      const response = await axios.post(
        url,
        {
          title: data.title,
          body: data.content,
          tags: data.tag,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: false,
        }
      );

      return response;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const onSubmit = async (data, event) => {
    try {
      let response;
      if (isEdit && currentPostId) {
        // Editing an existing post
        response = await editPost(data);
      } else {
        // Creating a new post
        response = await createPost(data);
      }

      const status = response.status;
      if (status === 200 || status === 201) {
        reset();
        setIsModalVisible(false);
        getAllPosts(page, 10);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
    reset();
  };

  const handleEditClick = (postId) => {
    setCurrentPostId(postId);
    showModal(postId, "edit");
  };

  const currentPostIdValue = currentPostId || "";

  return {
    posts,
    totalPages,
    page,
    handlePageChange,
    totalPosts,
    totalAccounts,
    totalMyPosts,
    handleDeletePost,
    handleConfirmModalOpen,
    handleConfirmModalClose,
    handleConfirmDelete,
    open,
    currentPostId: currentPostIdValue,
    getAllPosts,
    handleConfirmModalOpen,
    handleConfirmModalClose,
    handleConfirmDelete,
    loading,

    //  create edit
    createError,
    control,
    handleSubmit,
    onSubmit,
    isModalVisible,
    isEdit,
    handleClose,
    handleEditClick,
    isAdminAcc,
    showModal,
  };
}

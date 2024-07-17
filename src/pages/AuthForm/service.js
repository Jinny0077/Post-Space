import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/index";

const authenticationSchema = (isLogin) =>
  yup.object({
    email: yup.string().required().label("Email"),
    password: yup
      .string()
      .required()
      .min(6, "Password must be at least 6 characters")
      .label("Password"),
    ...(isLogin
      ? {}
      : {
          username: yup.string().required().label("Username"),
          role: yup.string().required().label("Role"),
        }),
  });

export function useAuthentication() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isLogin = mode === "login";
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors: authenticationError },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
    resolver: yupResolver(authenticationSchema(isLogin)),
  });

  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const [msgModalStatus, setMsgModalStatus] = useState(null);
  const [msgModalMessage, setMsgModalMessage] = useState("");

  useEffect(() => {
    if (!mode) {
      navigate("/?mode=login");
    }
  }, [mode, navigate]);

  const handleLinkClick = () => {
    reset();
  };

  const login = async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/account/login`,
        {
          email: data.email,
          password: data.password,
        },
        { validateStatus: false }
      );

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/account/register`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
        },
        { validateStatus: false }
      );

      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setMsgModalStatus(null);
    setMsgModalMessage("");

    try {
      let response;
      if (isLogin) {
        response = await login(data);
      } else {
        response = await register(data);
      }

      const status = response.status;
      const message = response.data.message || response.data.error;

      setMsgModalStatus(status);
      setMsgModalMessage(message);
      setMsgModalOpen(true);

      if (status === 200 || status === 201) {
        const token = response.data.token;
        const email = response.data.email || response.data.account?.email;
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        reset();

        setTimeout(() => {
          setMsgModalOpen(false);
          navigate("/homepage");
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    setMsgModalOpen(false);
  };

  return {
    authenticationError,
    control,
    handleSubmit,
    onSubmit,
    handleLinkClick,
    handleCloseModal,
    msgModalOpen,
    msgModalStatus,
    msgModalMessage,
  };
}

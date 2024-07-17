import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import AuthForm from "./pages/AuthForm";
import HomePage from "./pages/HomePage";
import PostDetail from "./pages/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <AuthForm /> },
      {
        path: "homepage",
        element: <HomePage />,
        loader: tokenLoader,
      },
      {
        path: ":postId",
        element: <PostDetail />,
        loader: checkAuthLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

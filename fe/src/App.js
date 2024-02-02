import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginAdminPage from "./pages/LoginAdminPage";
import HomePage from "./pages/HomePage";
import Error from "./pages/Error";
import ImagePersonPage from "./pages/ImagePersonPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: "admin",
    element: <LoginAdminPage />,
  },
  {
    path: "admin/home",
    element: <HomePage />,
  },
  {
    path: "imageGallery",
    element: <ImagePersonPage />,
  },
  {
    path: "imageGallery/home",
    element: <HomePage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "registration",
    element: <RegistrationPage />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

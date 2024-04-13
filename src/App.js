import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/nabar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import { AuthContext } from "./authContext";
import { ProductContext } from "./productContext";
import Cart from "./components/cart";
import MyOrder from "./components/myOrder";
import { Error } from "./components/error";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/cart", element: <Cart /> },
        { path: "/myOrder", element: <MyOrder /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContext>
        <ProductContext>
          <RouterProvider router={browserRouter} />
        </ProductContext>
      </AuthContext>
    </>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Password } from './components/Password';
import { Profile } from './components/Profile';
import { Recovery } from './components/Recovery';
import { Register } from "./components/Register";
import { Reset } from './components/Reset';
import { Username } from './components/Username';
import { PageNotFound } from './components/PageNotFound';

// root route

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;

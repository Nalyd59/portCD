import Index1 from "./pages/Index1/Index1";
import Dashboard from "./pages/Auth/dashboard";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signup";
import PasswordForget from "./pages/Auth/password_forget";

const routes = [
  //Auth
  { path: "/signup", component: <SignUp /> },
  { path: "/login", component: <Login /> },
  { path: "/password_forget", component: <PasswordForget /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/", component: <Index1 /> },
];

export default routes;

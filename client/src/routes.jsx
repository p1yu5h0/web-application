import GlobalSignUp from "./pages/GlobalSignUp";
import Dashboard from "./pages/Dashboard";
import AccountSettings from "./pages/AccountSettings";
import Signin from "./pages/SignIn";
import SignUp from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./pages/Page404";
import ForgotPasswrod from "./pages/ForgotPassword";
import NewPass from "./pages/NewPass";
import EditProfile from "./pages/EditProfile";
import UserList from "./pages/UserList";
import Toast from "./pages/Toast";

export default function AllRoutes() {
  const token = localStorage.getItem("token")
  return (
    <Routes>
      <Route path="/" element={<GlobalSignUp />} /> 
      <Route path="/newpass" element={<NewPass />} />
      <Route path="/forgotpassword" element={<ForgotPasswrod />} /> 
      <Route path="/users" element={<UserList />} />
      {token && <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />}
      {token && <Route
        path="/settings"
        element={
          <Layout>
            <AccountSettings />
          </Layout>
        }
      />}
      {token && <Route
        path="/signin"
        element={
          <Layout>
            <Signin />
          </Layout>
        }
      />}
      {token && <Route
        path="/register"
        element={
          <Layout>
            <SignUp />
          </Layout>
        }
      />}
      {token && <Route
        path="/edit"
        element={
          <Layout>
            <EditProfile />
          </Layout>
        }
      />}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

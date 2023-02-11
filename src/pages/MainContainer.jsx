import { Navigate, Outlet, Link } from "react-router-dom";
import AuthButton from "./components/AuthButton";
import FullscreenLoading from "./components/FullscreenLoading";
import { HStack } from "@chakra-ui/react";

// TODO: include isAllowed prop to check if user is allowed to access the route
// https://www.robinwieruch.de/react-router-private-routes/

function AuthGuard({ user, loading }) {
  if (loading) return <FullscreenLoading loading={loading} />;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <AuthButton user={user} />
      <HStack spacing={4} color="blue" p={8}>
        <Link to="/">Home</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/profile">Profile</Link>
      </HStack>

      <Outlet />
    </>
  );
}

export default AuthGuard;

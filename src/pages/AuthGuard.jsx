import { Navigate, Outlet, Link } from "react-router-dom";
import { HStack, Spinner, Stack } from "@chakra-ui/react";
import AuthButton from "./components/AuthButton";

// TODO: include isAllowed prop to check if user is allowed to access the route
// https://www.robinwieruch.de/react-router-private-routes/

function AuthGuard({ user, loading }) {
  if (loading)
    return (
      <Stack alignItems="center" height="100vh" justifyContent="center">
        <Spinner color="red" size={{base: "md", sm: "lg"}} thickness="4px" speed="0.7s"/>
      </Stack>
    );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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

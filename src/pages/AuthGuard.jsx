import { Navigate, Outlet, Link } from "react-router-dom";
import { HStack } from "@chakra-ui/react";

// TODO: include isAllowed prop to check if user is allowed to access the route
// https://www.robinwieruch.de/react-router-private-routes/

function AuthGuard({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <>
        <HStack spacing={8} color="blue" p={8}>
          <Link to="/">Home</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/profile">Profile</Link>
        </HStack>

        <Outlet />
      </>
    );
  }
}

export default AuthGuard;

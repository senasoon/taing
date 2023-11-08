import { Navigate, Outlet } from 'react-router';

interface IAuthenticatedRoute {
  isAuthenticated: boolean;
}

const AuthenticatedRoute = ({ isAuthenticated }: IAuthenticatedRoute) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;

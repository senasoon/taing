import { Navigate, Outlet } from 'react-router';

interface IUnauthenticatedRoute {
  isAuthenticated: boolean;
}

const UnauthenticatedRoute = ({ isAuthenticated }: IUnauthenticatedRoute) => {
  if (isAuthenticated) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
};

export default UnauthenticatedRoute;

import { Reset as ResetCss } from 'styled-reset';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import ProfileCreate from './pages/ProfileCreate';
import ProfileEdit from './pages/ProfileEdit';
import SearchPage from './pages/SearchPage';
import { useAuthState } from './firebase/auth';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import LoadingSpinner from './components/loading/LoadingSpinner';

const App = () => {
  const { authState, init } = useAuthState();
  const isAuthenticated = !!authState.user;

  if (authState.isLoading) {
    return <LoadingSpinner />;
  }

  if (authState.error) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <BrowserRouter>
        <ResetCss />
        <GlobalStyle />
        {init ? (
          <Routes>
            <Route
              element={<AuthenticatedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route element={<Layout />}>
                <Route path="/profile-page" element={<ProfilePage />} />
                <Route path="/profile-edit" element={<ProfileEdit />} />
                <Route path="/profile-create" element={<ProfileCreate />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/search" element={<SearchPage />} />
              </Route>
            </Route>
            <Route
              element={
                <UnauthenticatedRoute isAuthenticated={isAuthenticated} />
              }
            >
              <Route element={<Layout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Route>
            </Route>
            <Route element={<Layout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        ) : (
          <></>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;

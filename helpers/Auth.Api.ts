import Cookies from 'js-cookie';

export const handleLogout = async () => {
  // Clear all auth-related cookies
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('user_data');

  // Clear any other auth-related data from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  // Redirect to sign-in page
  if (typeof window !== 'undefined') {
    window.location.href = '/sign-in';
  }
};

export const getAuthToken = () => {
  return Cookies.get('access_token');
};

export const setAuthToken = (token: string) => {
  Cookies.set('access_token', token, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  });
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!Cookies.get('access_token');
};

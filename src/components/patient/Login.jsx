import { LockClosedIcon } from '@heroicons/react/20/solid';
import Header from '../Header';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { checkSession, patientLogin } from '../../services/patientApi';

export default function Login() {
  const navigate = useNavigate();
  const [wrong, setWrong] = useState('');

  useEffect(() => {
    // Session validation logic
    const verifySession = async () => {
      try {
        const sessionResponse = await checkSession();
        if (sessionResponse?.status === 'authenticated') {
          navigate('/patient/dashboard', { state: sessionResponse?.data });
          localStorage.setItem('currentPage', 'Basic');
        }
      } catch (error) {
        console.log('No active session.');
      }
    };

    verifySession();
  }, [navigate]);

  // Handles login logic
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await patientLogin({ email, password });
      if (response?.status === 'authenticated') {
        navigate('/patient/dashboard', { state: response?.data });
        localStorage.setItem('currentPage', 'Basic');
      } else if (response?.status === 'wrongPassword') {
        setWrong('wrongPassword');
      } else {
        setWrong('emailNotRegistered');
      }
    } catch (error) {
      console.error('Error during login attempt');
      setWrong('loginError');
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Logo" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in as Patient
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <NavLink
                to="/patient/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </NavLink>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin} method="POST">
            <div className="-space-y-px rounded-md shadow-sm">
              {wrong === 'emailNotRegistered' && (
                <p className="text-red-500">Email is not registered</p>
              )}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
              {wrong === 'wrongPassword' && <p className="text-red-500">Wrong Password</p>}
              {wrong === 'loginError' && <p className="text-red-500">Login error. Try again later.</p>}
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

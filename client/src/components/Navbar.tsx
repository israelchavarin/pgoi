import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
      <Link to='/'>
        <h1 className='text-2xl font-bold'>Opportunities Manager</h1>
      </Link>
      <ul className='flex gap-x-2'>
        {isAuthenticated ? (
          <>
            <li>
              <Link to='/opportunities'>Opportunities</Link>
            </li>
            <li>
              <Link to='/orders'>Orders</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link
                to='/'
                onClick={logout}
                className='bg-indigo-500 px-4 py-1 rounded-sm'
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login' className='bg-indigo-500 px-4 py-1 rounded-sm'>
                Login
              </Link>
            </li>
            <li>
              <Link
                to='/registration'
                className='bg-indigo-500 px-4 py-1 rounded-sm'
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

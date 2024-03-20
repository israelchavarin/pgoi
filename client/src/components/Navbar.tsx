import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StyledButton from "./StyledButton";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className='bg-orange-300 my-3 flex justify-between items-center py-5 px-10 rounded-lg'>
      <Link to={isAuthenticated ? "/opportunities" : "/"}>
        <h1 className='text-2xl font-bold'>Opportunities Manager</h1>
      </Link>
      <ul className='flex gap-x-2'>
        {isAuthenticated ? (
          <div className='flex items-center gap-2'>
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
              <Link to='/' onClick={logout}>
                <StyledButton text='Logout' />
              </Link>
            </li>
          </div>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <StyledButton text='Login' />
              </Link>
            </li>
            <li>
              <Link to='/registration'>
                <StyledButton text='Register' />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

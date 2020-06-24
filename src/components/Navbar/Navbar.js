import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Typography from '../Typography';

import { UserContext } from '../../context/user';

import { ReactComponent as Logo } from '../../assets/pants.svg';

export default function (props) {
  const { currentUser } = useContext(UserContext);
  let isAdmin = currentUser.role === 'admin';
  let dashboardLink;

  isAdmin
    ? (dashboardLink = (
        <Link to="/dashboard" className="flex items-center justify-start">
          <Typography size="l" shouldBeBold isLink>
            Visit Dashboard
          </Typography>
        </Link>
      ))
    : (dashboardLink = null);

  const auth = currentUser.userId ? (
    <Link to={`/user/${currentUser.userId}`} className="flex flex-row justify-between items-center">
      <img src={currentUser.profilePicture} alt="tis you" className="rounded-md w-12 mr-4" />
      <Typography size="l" shouldBeBold isLink>
        {currentUser.username}
      </Typography>
    </Link>
  ) : (
    <>
      <Link to="/signup" className="rounded-md border-2 py-1 px-2 mr-4 border-blue-700 hover:border-blue-900">
        <Typography size="l" shouldBeBold isLink>
          Sign Up
        </Typography>
      </Link>
      <Link to="/signin" className="rounded-md border-2 py-1 px-2 border-blue-700 hover:border-blue-900">
        <Typography size="l" shouldBeBold isLink>
          Sign In
        </Typography>
      </Link>
    </>
  );

  return (
    <header className="border-b md:flex md:items-center md:justify-between shadow-lg px-10  pt-6 pb-4">
      <Link to="/" className="flex items-center justify-start">
        <Logo className="w-8 h-8 mr-2 text-blue-700 fill-current" />
        <Typography size="xl" shouldBeBold isLink>
          Frozen Pants
        </Typography>
      </Link>
      {dashboardLink}
      <div className="flex items-center justify-end">{auth}</div>
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '../Typography';

import { ReactComponent as Logo } from '../../assets/pants.svg';

export default function (props) {
  const { isAdmin = true } = props;

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

  return (
    <header className="border-b md:flex md:items-center md:justify-between shadow-lg px-10  pt-6 pb-4">
      <Link to="/" className="flex items-center justify-start">
        <Logo className="w-8 h-8 mr-2 text-blue-700 fill-current" />
        <Typography size="xl" shouldBeBold isLink>
          Frozen Pants
        </Typography>
      </Link>
      {dashboardLink}
      <div className="flex items-center justify-end">
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
      </div>
    </header>
  );
}

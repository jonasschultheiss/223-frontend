import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '../../components/Typography';
import { APIContext } from '../../context/api';
import { UserContext } from '../../context/user';

import { ReactComponent as Plus } from '../../assets/plus.svg';

export default function (props) {
  const [posts, setPosts] = useState([]);
  const { profilePicture } = useContext(APIContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {}, []);

  const createPosts = (
    <div>
      <Link to="/post/create" className="flex flex-row border p-2 rounded-md shadow-md">
        <Plus className="w-6 h-6 mr-2 text-blue-700 fill-current" />
        <Typography size="l" shouldBeBold isLink>
          Create new Post
        </Typography>
      </Link>
    </div>
  );

  return (
    <div className="flex flex-row m-32">
      {createPosts}
      <button
        onClick={async () => {
          console.log('res', await profilePicture.getProfilePicture(currentUser.userId));
        }}
      >
        Test button
      </button>
    </div>
  );
}

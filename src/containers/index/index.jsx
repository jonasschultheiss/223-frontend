import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '../../components/Typography';

export default function (props) {
  const [posts, setPosts] = useState([]);

  const createPosts = (
    <div>
      <Link to="/post/create">
        <Typography size="l" shouldBeBold isLink>
          Create new Post
        </Typography>
      </Link>
    </div>
  );

  return <div className="flex flex-row m-32">{createPosts}</div>;
}

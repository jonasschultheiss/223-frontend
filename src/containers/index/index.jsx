import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '../../components/Typography';
import { APIContext } from '../../context/api';
import { UserContext } from '../../context/user';

import Post from '../Post';

import { ReactComponent as Plus } from '../../assets/plus.svg';

export default function (props) {
  const [posts, setPosts] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const { post } = useContext(APIContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await post.getAll(pageIndex);
      console.log('fetchPosts -> res', res);
      setPosts([...res]);
    };
    fetchPosts();
  }, [pageIndex, post]);

  const createPosts = (
    <div className="flex flex-row">
      <div>
        <Link to="/post/create" className="flex flex-row border p-2 rounded-md shadow-md">
          <Plus className="w-6 h-6 mr-2 text-blue-700 fill-current" />
          <Typography shouldBeBold isLink>
            Create new Post
          </Typography>
        </Link>
      </div>

      <div className="flex flex-col ml-16">
        {posts.map((post, key) => {
          return <Post data={post} key={key} />;
        })}
      </div>
    </div>
  );

  return <div className="flex flex-row m-32">{createPosts}</div>;
}

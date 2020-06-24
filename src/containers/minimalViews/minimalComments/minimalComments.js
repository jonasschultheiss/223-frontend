import React, { useState, useEffect, useContext } from 'react';
import Typography from '../../../components/Typography';

import { UserContext } from '../../../context/user';
import { APIContext } from '../../../context/api';

export default function () {
  const { currentUser } = useContext(UserContext);
  const { comment } = useContext(APIContext);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await comment.getAllFromUser(currentUser.jwt, currentUser.userId);
    };
    fetchComments();
  }, [comment, currentUser.jwt, currentUser.userId]);

  return <p>hello</p>;
}

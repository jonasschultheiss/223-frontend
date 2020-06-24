import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { APIContext } from '../../context/api';
import Typography from '../Typography';
import { ReactComponent as Trash } from '../../assets/delete.svg';

export default function (props) {
  console.log('props', props);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const { comment } = useContext(APIContext);

  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  const removeCommentHandler = (e, commentId) => {
    e.preventDefault();
    comment.deleteComment(currentUser.jwt, commentId);
    const filteredComments = posts.filter((cmt) => cmt.id !== commentId);
    se([...filteredComments]);
  };

  return (
    <div className="p-4 flex flex-col border shadow-md rounded-md">
      <Typography shouldBeBold size="l">
        All Comments
      </Typography>
      {comments && comments.length !== 0 ? (
        comments.map((cmt, key) => {
          return (
            <>
              <div key={key} className="flex flex-row border p-2 my-2 rounded-md justify-between ">
                <Link to={`/post/${cmt.image.id}`} className="mr-2">
                  <Typography shouldBeBold isLink size="l">
                    Go to Post
                  </Typography>
                </Link>
                <Typography className="mr-2">"{cmt.text}"</Typography>
                {currentUser.userId === parseInt(id) || currentUser.role === 'admin' || currentUser.role === 'mod' ? (
                  <button className="ml-4 focus:outline-none" onClick={(e) => removeCommentHandler(e, cmt.id)}>
                    <Trash className="w-6 h-6 text-red-700 fill-current  outline-none" />
                  </button>
                ) : null}
              </div>
            </>
          );
        })
      ) : (
        <Typography>This user has not made any comments yet...</Typography>
      )}
    </div>
  );
}

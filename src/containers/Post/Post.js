import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { APIContext } from '../../context/api';
import { UserContext } from '../../context/user';
import Typography from '../../components/Typography';
import { ReactComponent as EmptyHeart } from '../../assets/emptyHeart.svg';
import { ReactComponent as FilledHeart } from '../../assets/filledHeart.svg';
import { ReactComponent as Trash } from '../../assets/delete.svg';
import defaultPb from '../../assets/pp.jpg';

export default function (props) {
  const { post, profilePicture, comment } = useContext(APIContext);
  const { currentUser } = useContext(UserContext);
  const { id, content, title, updateDate, user } = props.data;
  const history = useHistory();

  const [profilePic, setProfilePic] = useState();
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchProfilePic = async () => {
      const res = await profilePicture.getProfilePicture(user.id);
      setProfilePic(res.content);
    };

    const fetchComments = async () => {
      const res = await comment.getByPostId(id);
      setComments(res);
    };

    const fetchLikes = async () => {
      const res = await post.getLikes(id);
      const isAlreadyLiked = res.filter((like) => like.user.id === currentUser.userId);
      isAlreadyLiked.length !== 0 ? setIsLiked(true) : setIsLiked(false);
      setLikes(res);
    };

    fetchProfilePic();
    fetchLikes();
    fetchComments();
  }, [profilePicture, user.id, comment, id, post, currentUser.userId]);

  const likedHandler = async (e) => {
    e.preventDefault();
    if (isLiked) {
      await post.unlike(currentUser.userId, id);
      setLikes([...likes.filter((like) => like.user.id !== currentUser.userId)]);
      setIsLiked(false);
    } else {
      await post.like(currentUser.userId, id);
      setLikes([...likes, { user: { id: currentUser.userId } }]);
      setIsLiked(true);
    }
  };

  const newCommentChangedHandler = (e) => {
    setNewComment(e.target.value);
  };

  const postNewCommentHandler = (e) => {
    e.preventDefault();
    comment.createNewComment(currentUser.jwt, id, newComment);
    setNewComment('');
  };

  const handlePostDelete = async (e) => {
    e.preventDefault();
    await post.remove(currentUser.jwt, id);
    history.push('/');
  };

  let heart;

  if (isLiked) {
    heart = <FilledHeart className="w-6 h-6 text-pink-700 fill-current inline-block outline-none" />;
  } else {
    heart = <EmptyHeart className="w-6 h-6 text-pink-700 fill-current inline-block outline-none" />;
  }

  return (
    <div className="flex flex-col rounded-md border shadow-md mb-8">
      <div className="m-4 mb-0 flex flex-row">
        <Link className="flex flex-row" to={`/user/${user.id}`}>
          <img className="justify-start mr-4 w-6 h-6 rounded-full" src={profilePic || defaultPb} alt="Nice" />
          <Typography shouldBeBold isLink size="l">
            {user.username}
          </Typography>
        </Link>
        {currentUser.role === 'admin' || currentUser.role === 'mod' ? (
          <button className=" justify-end focus:outline-none ml-4" onClick={(e) => handlePostDelete(e)}>
            <Trash className="w-6 h-6 text-pink-700 fill-current  outline-none " />
          </button>
        ) : null}
      </div>
      <div className="border-t">
        <Link to={`/post/${id}`}>
          <img className=" w-112" src={content} alt="post content" />
        </Link>
      </div>
      <div className="flex flex-row border-t border-b p-4">
        {currentUser.userId ? (
          <button className=" mr-4 focus:outline-none" onClick={(e) => likedHandler(e)}>
            {heart}
          </button>
        ) : null}
        <Typography className="m-auto">{`${likes ? likes.length : 0} Likes`}</Typography>
      </div>
      {comments.length !== 0 ? (
        <div className="flex flex-col  px-4">
          {props.limited
            ? comments
                .reverse()
                .slice(0, 3)
                .map((cmt, k) => {
                  return (
                    <div key={k} className="flex flex-row my-1">
                      <Typography shouldBeBold>idk: </Typography>
                      <Typography>{cmt.text}</Typography>
                    </div>
                  );
                })
            : comments.map((cmt, k) => {
                return (
                  <div key={k} className="flex flex-row my-1">
                    <Typography shouldBeBold>idk: </Typography>
                    <Typography>{cmt.text}</Typography>
                  </div>
                );
              })}
        </div>
      ) : null}
      {currentUser.userId ? (
        <div className="flex flex-row border-t p-4">
          <input
            type="text"
            className="w-full outline-none p-1"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => newCommentChangedHandler(e)}
          />
          <button className="focus:outline-none" onClick={(e) => postNewCommentHandler(e)}>
            <Typography>Post</Typography>
          </button>
        </div>
      ) : null}
    </div>
  );
}

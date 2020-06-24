import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user';
import { APIContext } from '../../context/api';

import MinimalComment from '../../components/minimalViews/minimalComment';

export default function (props) {
  const { id } = useParams();
  const { currentUser, signOut, saveProfilePicture } = useContext(UserContext);
  const { user, comment, post } = useContext(APIContext);
  const [picture, setPicture] = useState([]);
  const [comments, setComments] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchComments = async () => {
      const res = await comment.getAllFromUser(currentUser.jwt, id);
      console.log('fetchComments -> res', res);
      setComments([...res]);
    };
    fetchComments();
  }, [comment, currentUser.jwt, id]);

  const onDrop = (picture) => {
    setPicture(picture);
  };

  const saveProfilePictureHandler = async () => {
    await saveProfilePicture(currentUser.userId, picture[0]);
  };

  const deleteUserHandler = async () => {
    await user.deleteUser(currentUser.jwt, currentUser.userId);
    signOut();
  };

  const isOwnPage = parseInt(id) === currentUser.userId;

  if (!currentUser.userId) {
    history.push('/');
  }
  return (
    <div className="flex flex-row">
      {isOwnPage ? (
        <div className="m-8 px-4 flex flex-col">
          <Typography size="l" shouldBeBold>
            Account management
          </Typography>
          <div className=" mt-2 flex flex-col p-2 border shadow-md rounded-md">
            <button onClick={() => signOut()} className="rounded-md border-2 py-1 px-2  border-blue-700 mb-4">
              <Typography size="m" shouldBeBold>
                Sign out
              </Typography>
            </button>
            <button onClick={() => deleteUserHandler()} className="rounded-md border-2 py-1 px-2  border-red-700">
              <Typography size="m" isError shouldBeBold>
                Delete account
              </Typography>
            </button>
          </div>
        </div>
      ) : null}

      {isOwnPage ? (
        <div className="m-8">
          <Typography size="l" shouldBeBold>
            Profile Picture
          </Typography>
          <ImageUploader
            {...props}
            withIcon={true}
            onChange={onDrop}
            buttonText="Choose image"
            label="Max file size: 2mb, accepted: jpg, png"
            singleImage
            withPreview
            imgExtension={['.jpg', '.png']}
            maxFileSize={2000000}
          />
          <button onClick={() => saveProfilePictureHandler()}>
            <Typography size="m" shouldBeBold>
              Save Picture
            </Typography>
          </button>
        </div>
      ) : null}
      <div className="m-8">
        <MinimalComment comments={comments} />
      </div>
    </div>
  );
}

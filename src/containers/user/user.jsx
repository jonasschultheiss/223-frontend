import React, { useState, useContext } from 'react';
import ImageUploader from 'react-images-upload';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user';
import { APIContext } from '../../context/api';

import MinimalComments from '../minimalViews/minimalComments';

export default function (props) {
  const { currentUser, signOut, saveProfilePicture } = useContext(UserContext);
  const { user } = useContext(APIContext);
  const [picture, setPicture] = useState([]);

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

  return (
    <div className="flex flex-row">
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
        <div className="m-8">
          <MinimalComments />
        </div>
      </div>
    </div>
  );
}

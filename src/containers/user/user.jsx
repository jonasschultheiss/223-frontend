import React, { useState, useContext } from 'react';
import ImageUploader from 'react-images-upload';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user';

export default function (props) {
  const { user, signOut, saveProfilePicture } = useContext(UserContext);
  const [picture, setPicture] = useState([]);
  console.log(picture);

  const onDrop = (picture) => {
    setPicture(picture);
  };

  const saveProfilePictureHandler = () => {
    saveProfilePicture(user.userId, picture[0]);
  };

  return (
    <div className="flex flex-row">
      <div className="m-8">
        <button onClick={() => signOut()}>
          <Typography size="m" shouldBeBold>
            Log out
          </Typography>
        </button>
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
          label="Max file size: 5mb, accepted: jpg, png"
          singleImage
          withPreview
          imgExtension={['.jpg', '.png']}
          maxFileSize={5242880}
        />
        <button onClick={() => saveProfilePictureHandler()}>
          <Typography size="m" shouldBeBold>
            Save Picture
          </Typography>
        </button>
      </div>
    </div>
  );
}

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

import { UserContext } from '../../context/user';

import Typography from '../../components/Typography';
import InputField from '../../components/InputField';

export default function (props) {
  const [title, setTitle] = useState('');
  const [picture, setPicture] = useState([]);

  const { currentUser } = useContext(UserContext);
  const history = useHistory();

  const titleChangedHandler = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const onDrop = (picture) => {
    setPicture(picture);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadPostHandler = async () => {
    const image = await toBase64(picture[0]);
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3000/image',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${JSON.stringify(currentUser.jwt)}`,
      },
      data: { text: title, imageText: image },
    });
    history.push(`/post/${res}`);
  };

  return (
    <div className="flex flex-col">
      <Typography size="l" shouldBeBold>
        Create a new Post
      </Typography>
      <InputField inputChangedHandler={titleChangedHandler} value={title} label="Title" />
      <ImageUploader
        {...props}
        withIcon={true}
        onChange={onDrop}
        buttonText="Choose post image"
        label="Max file size: 5mb, accepted: jpg, png"
        singleImage
        withPreview
        imgExtension={['.jpg', '.png']}
        maxFileSize={5242880}
      />
      <button onClick={uploadPostHandler}>
        <Typography size="m" shouldBeBold>
          Create post
        </Typography>
      </button>
    </div>
  );
}

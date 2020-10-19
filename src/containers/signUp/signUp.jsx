import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import InputField from '../../components/InputField';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user';

export default function () {
  const { currentUser, signUp } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const usernameChangedHandler = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const emailChangedHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const passwordChangedHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const reenteredPasswordChangedHandler = (event) => {
    event.preventDefault();
    setReenteredPassword(event.target.value);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signUp(username, email, password, reenteredPassword);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  let errorMessage = error ? (
    <Typography className="mx-auto block" isError shouldBeBold size="m">
      {error.message}
    </Typography>
  ) : null;

  return (
    <div className="mt-16  w-full md:w-1/4  md:rounded-md md:mx-auto rounded-md border shadow-xl p-8 flex flex-col">
      {currentUser.userid ? <Redirect to="/" /> : null}
      {errorMessage}
      <InputField inputChangedHandler={usernameChangedHandler} value={username} label="Username" shouldBeDisabled={loading} />
      <InputField inputChangedHandler={emailChangedHandler} value={email} label="E-Mail" type="email" shouldBeDisabled={loading} />
      <InputField inputChangedHandler={passwordChangedHandler} value={password} label="Password" type="password" shouldBeDisabled={loading} />
      <InputField
        inputChangedHandler={reenteredPasswordChangedHandler}
        value={reenteredPassword}
        label="Confirm Password"
        type="password"
        shouldBeDisabled={loading}
      />
      <button
        onClick={(event) => signUpHandler(event)}
        className="rounded-md border-2 py-1 px-2 border-blue-700 hover:border-blue-900 outline-none w-48 mx-auto mt-6"
        disabled={loading}
      >
        <Typography isLink size="l" shouldBeBold>
          Sign Up
        </Typography>
      </button>
    </div>
  );
}

import axios from '../axiosInstance';

const getProfilePicture = async (userId) => {
  const profilePicture = await axios.get(`/user/profilepicture/${userId}`);
  return profilePicture;
};

export default getProfilePicture;

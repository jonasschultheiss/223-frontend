import axios from '../axiosInstance';
import convertImageToString from '../../utils/convertImageToString';

const setProfilePicture = async (userId, file) => {
  const convertedPicture = await convertImageToString(file);
  await axios.post('/user/profilePicture', { userId: userId, text: convertedPicture });
  return convertedPicture;
};

export default setProfilePicture;

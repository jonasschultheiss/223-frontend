import axios from '../axiosInstance';
import convertImageToString from '../../utils/convertImageToString';

const createNew = async (jwt, image, title) => {
  const convertedPicture = await convertImageToString(image);
  const res = await axios.post(
    `/image`,
    { text: title, imageText: convertedPicture },
    {
      headers: {
        authorization: `Bearer ${JSON.stringify(jwt)}`,
      },
    }
  );
  return res;
};

export default createNew;

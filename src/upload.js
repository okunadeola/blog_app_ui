

import axios from 'axios'




const IMAGE_UPLOAD_PRESET = 'x5vjzzr8';
const CLOUDINARY_API_URL = 'https://api.cloudinary.com/v1_1/dv1cetenk/upload';

/**
 * * Upload image to cloudinary storage
 * @param {string} image_base64
 * @returns {string} uploaded image remote url
 */



const uploadImage = async image_base64 => {
  try {
    const payload = {
      file: `${image_base64}`,
      upload_preset: IMAGE_UPLOAD_PRESET,
    };

    const response = await axios.post(CLOUDINARY_API_URL, payload);
    return response?.data?.secure_url;
  } catch (error) {
    return error;
  }
};

export {uploadImage};
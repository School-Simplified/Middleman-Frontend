import axios from "axios";

export const getUserInfo = async () => {
  const token = localStorage.getItem("token")
  const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`);
  return response.data;
};
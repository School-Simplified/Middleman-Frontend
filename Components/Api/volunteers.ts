import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const scriptId = "16CDtcdnJV_2MxXdRUXRLmfWMm1cUewpzzFCd2QOf07BPXvQJx4LXxdh0";
type Volunteer = {
  fullName: string;
  strikes?: number;
  orgEmail?: string;
};

export const getVolunteers = async () => {
  const response = await axios.get(`${API_URL}/api/volunteers`);
  return response.data;
};

export const getVolunteerByID = async (id: number) => {
  const response = await axios.get(`${API_URL}/api/volunteers/${id}`);
  return response.data;
};

export const deleteVolunteer = async (id: number) => {
  const response = await axios.delete(`${API_URL}/api/volunteers/${id}`);
  return response.data;
};

export const createVolunteer = async (data: any) => {
  console.log(data);
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/api/volunteers`, data);
  const familyName = data.fullName.split(" ")[1];
  const givenName = data.fullName.split(" ")[0];
  const googleData = {
    primaryEmail: data.orgEmail,
    password: "schoolsimplified",
    name: { familyName, givenName },
    changePasswordAtNextLogin: true,
  };
  const googleResponse = await axios.post(
    `https://script.googleapis.com/v1/scripts/${scriptId}:run`,
    {
      function: "createUser",
      devMode: true,
      parameters: [googleData],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(googleResponse);
  if (response.data.error) {
    alert("Error while creating GSuite account: " + response.data.error);
  }
  return response.data;
};

export const updateVolunteer = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/api/volunteers/${id}`, data);
  return response.data;
};

export const getGoogleVolunteers = async () => {
  const token = localStorage.getItem("token");
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const body = {
    function: "listAllUsers",
    devMode: "true",
  };
  const response = await axios.post(
    `https://script.googleapis.com/v1/scripts/${scriptId}:run`,
    body,
    header
  );
  return response.data;
};

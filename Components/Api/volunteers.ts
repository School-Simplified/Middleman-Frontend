import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
const scriptId = "16CDtcdnJV_2MxXdRUXRLmfWMm1cUewpzzFCd2QOf07BPXvQJx4LXxdh0"
type Volunteer = {
  fullName: string;
  strikes?: number;
  orgEmail?: string;
};

export const getVolunteers = async () => {
  // //const { loading, error, data } = useQuery(getUsersQuery);
  // const { loading, error, data } = await client.query({
  //   query: volunteersQuery,
  // });

  // console.log(data);
  // //return result;
  // return data;

  const response = await axios.get(`${API_URL}/api/volunteers`);
  return response.data;
};

export const getVolunteerByID = async (id: number) => {
  const response = await axios.get(`${API_URL}/api/volunteers/${id}`)
  return response.data;
}

export const deleteVolunteer = async (id: number) => {
  const response = await axios.delete(`${API_URL}/api/volunteers/${id}`);
  return response.data;
};

export const createVolunteer = async (data: any) => {
  const response = await axios.post(`${API_URL}/api/volunteers`, data);
  return response.data;
};

export const updateVolunteer = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/api/volunteers/${id}`, data)
  return response.data;
}

export const getGoogleVolunteers = async () => {
  const token = localStorage.getItem("token")
  const header = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const body = {
    function: "listAllUsers",
    devMode: "true"
  }
  const response = await axios.post(`https://script.googleapis.com/v1/scripts/${scriptId}:run`, body, header);
  return response.data;
};
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
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
  console.log(id, data)
  const response = await axios.put(`${API_URL}/api/volunteers/${id}`, data)
  return response.data;
}

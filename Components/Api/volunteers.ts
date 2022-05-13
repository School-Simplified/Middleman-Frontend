import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const volunteersQuery = gql`
  query Volunteers {
    volunteers(limit: 20) {
      fullName
      strikes
      orgEmail
      departments
      ranks
      departmentDivision
      activityStatus
      contract
      breakDuration
      discordTag
      rodeID
    }
  }
`;

type Volunteer = {
  fullName: string;
  strikes?: number;
  orgEmail?: string;
};

const getVolunteers = async () => {
  //const { loading, error, data } = useQuery(getUsersQuery);
  const { loading, error, data } = await client.query({
    query: volunteersQuery,
  });

  console.log(data);
  //return result;
  return data;
};

export default getVolunteers;

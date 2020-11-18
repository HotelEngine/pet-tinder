const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Pet {
    name: String
    type: String
  }

  type Query {
    pets(latitude: Float, longitude: Float): [Pet]
  }
`;

const { RESTDataSource } = require("apollo-datasource-rest");

class PetFinder extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.petfinder.com/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }

  async getPets(latitude, longitude) {
    const res = await this.get(`v2/animals?location=${latitude},${longitude}`);
    console.log(JSON.stringify(res));
    return res.animals;
  }

}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    pets: async (_source, { latitude, longitude }, { dataSources }) => {
      return dataSources.petFinderApi.getPets(latitude, longitude);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      petFinderApi: new PetFinder(),
    };
  },
  context: () => {
    return {
      token:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJHdUdRSmcyR09ZZ0p6NEozSlFNWnM3eEQxS0hEVFZTeVFiMFZBVnVabkdlWjlNTzVQSiIsImp0aSI6ImY0NWEyNzRjY2E5MDQwMjUyNDBmNzQ4M2MwODAyMjRmNmJkZmQyYzE4ZWJiOGUwOGI0YzA5YmE3YmMxYzNmZjBhNzM5ZTg4MDNmYzliZGNjIiwiaWF0IjoxNjA1NzMzMjA0LCJuYmYiOjE2MDU3MzMyMDQsImV4cCI6MTYwNTczNjgwNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.VuBFiyrIel64Ubao-68xEFPJtyPpUJtTM2nr4S6YZiqYETQPb9TT1FIunh9Rn8QjPWA5g1l8VLzOGwpNAV8-QBfTQifqLt5AaVpI05HM23gPVDIEt6FZvHBUuW1m7wU-vNnyB9RBEjYFatU2Fn3RnkC3fhaURP5o4_Gc9coiElT5ESKIQNf5IcaUiTWnvbOc6uaxMM9efA-pbyh6ZvFoS8UGTcvSM3bnhR0u3pMm6Zd1tH-rkEQllJ4YYk2JpMYR0gVMTvXRGQvX_xUNj2PRVB_7Yx_094gZJrlnmMBVndtEidgHUs5jFicgKHEZazSklixD4PsV5HFw6Z25JbfA2Q"
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

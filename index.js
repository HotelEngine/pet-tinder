const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Pet {
    name: String
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
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJHdUdRSmcyR09ZZ0p6NEozSlFNWnM3eEQxS0hEVFZTeVFiMFZBVnVabkdlWjlNTzVQSiIsImp0aSI6IjdlMTM4NGU0ZjUwYWE2ZWUyMzU2NGYyM2VmYzU1N2ViNDY1ZGU1ZTM1YTgxNTM0ZjlhMzI5ODkxZDg3ZmI0OWQ2ZmYwOTZmY2VhZTIyYTdiIiwiaWF0IjoxNjA1NzI4NzI1LCJuYmYiOjE2MDU3Mjg3MjUsImV4cCI6MTYwNTczMjMyNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.UHlsmwmL8yKDnsmugfJ6Ugs6hKONz4mucuPU8y6jSaJxt9Nbaq3UC_jE0h8Kpg0PDZKG_q4N3HokSSDKSYwd6duoILXQIm1wXnXRidJ3GddRISa3fPsttBBOBem5RLmd7AIRHYbg05RDbAP3-tLy9M8wzj9Fy6HPpMcJOJ_5rlKztW6N2TD__ujGtzI9jdPilMcxqCHq6CDBMG6wwkAu084tYjgP54MxN8kzURslvM-hsOK6EXQpns9hZVIaoBIynOEHY7b89Fec2Kk00_cndO6ieq1mQ7nkB_LQZHtRFtXvlY7_oQMOOm6Nr1IjR0KI3rHumk1C3mRWFgQWbYLSYw"
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

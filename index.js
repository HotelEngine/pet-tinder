const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Pet {
    name: String
  }

  type Query {
    pets: [Pet]
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

  async getPets() {
    const res = this.get(`v2/animals`);
    console.log(JSON.stringify(res));
    return res;
  }
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    pets: async (_source, _args, { dataSources }) => {
      return dataSources.petFinderApi.getPets();
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
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJHdUdRSmcyR09ZZ0p6NEozSlFNWnM3eEQxS0hEVFZTeVFiMFZBVnVabkdlWjlNTzVQSiIsImp0aSI6IjI4NmEyNGE2MTUxNGI2N2Q2NTRlMzRhYzVkY2FiNzU4YmMyYmM1NDExNzJlM2ZmMGUyYWVhYTk1ZWYwZjNmZDMzYTVjZDhkNjZiNDBhNTRiIiwiaWF0IjoxNjA1NzIxNDE3LCJuYmYiOjE2MDU3MjE0MTcsImV4cCI6MTYwNTcyNTAxNywic3ViIjoiIiwic2NvcGVzIjpbXX0.bXLyBDWxpWCwz8rHJzjzfygokSr5AJT7kG4trmHK7tEoRc3bFkhIRBsbHid6Itak6vVVY6Zk3vvnM-IdyLZEpETk0TMe2gZt5wDXhXBz4rifYmjM1yA4sAD69xmKINvuZXCYfnlQDEfycCqW61DBUEqqWbaw1aPnM4g-4YSJRL8lk5W0_uj4xz5cr0thvtQI1KwkuZONnepdRacTSNXa07Rg_WGkv1WghwtPlSfcbsRQdd3_zf9wNdXFMsVov6swDE9lp-7_-A-sLcMQ1vehTsnyj4D_1c85WxnecvRzTSyculFVdFKYaLes9TC7FAIphxMsPU-a5B5exKK1UTazZA",
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

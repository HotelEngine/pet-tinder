const types = require("./schema/types/animal");
const resolvers = require("./schema/resolvers/animal");
const { ApolloServer } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");
const fetch = require("node-fetch");

class PetFinder extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.petfinder.com/";
  }

  async willSendRequest(request) {
    console.log("=========request");
    console.log(request);
    const token = await this.fetchToken();
    console.log("=========token");
    console.log(token);
    request.headers.set("Authorization", `Bearer ${token.access_token}`);
  }

  async getAnimals(latitude, longitude) {
    const res = await this.get(`v2/animals?location=${latitude},${longitude}`);
    console.log(JSON.stringify(res));
    return res.animals;
  }

  async fetchToken() {
    const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      body:
        "grant_type=client_credentials&client_id=85M6TbfBkHBVn40fafQRe4cxhnxHNuRSsnIBY4muX0FvlGagNh&client_secret=Pjw83sPa81uzI0zS0WavXz3gAX95Fp156SJIPLor",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const token = await response.json();
    return token;
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: types.typeDefs,
  resolvers: resolvers.resolvers,
  dataSources: () => {
    return {
      petFinderApi: new PetFinder(),
    };
  },
  context: () => {
    return {
      token:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJHdUdRSmcyR09ZZ0p6NEozSlFNWnM3eEQxS0hEVFZTeVFiMFZBVnVabkdlWjlNTzVQSiIsImp0aSI6IjEzNzNjMTUxZTkyZDA5Y2RlMDY2ZTlhNWM0YzJjNzc0Yjk2Y2FkN2I1NGVjMTQ1YzJhMjg4N2VlZjY3ZGUwYjI4NzA5YTQ2ODdhZWZkNDc4IiwiaWF0IjoxNjA1NzQyODk3LCJuYmYiOjE2MDU3NDI4OTcsImV4cCI6MTYwNTc0NjQ5Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.nQvgLEW5a74JxHARfQIMnw6QIQlFkbTdcDXP1D4JAXt0ar5ieF9HWdgf20DjpDPgq2_WKPy_iK23wt4HFoI2goFEYlC2LBqs1yHEqUkeuAArc5ddFz1xPhPmG4N247dO_2H-htk2R3IaDhS4fAm3yo_5d4GEUQIJrKU2O2T6DGt3yUVErsq15t2nW0siWQo-JlD6WcZq7V5bNd3mnrgALfMhhW1ns0ZI8ZkWxCMKVs7c8vVxTQI-3tpmp5SVEinMQKVJiRwQHr9j1ir1PNrKXZywoVOrIszRV3jLkIt5Iednu-uwCRTVISojeYWBaLG4m82obW6kXXxjNlNGHxbwOA",
    };
  },
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

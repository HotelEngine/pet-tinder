const types = require("./schema/types/animal");
const resolvers = require("./schema/resolvers/animal");
const { ApolloServer } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");
const fetch = require("node-fetch");
const querystring = require("querystring");
const PET_API_KEY = process.env.PET_API_KEY;
const PET_API_SECRET = process.env.PET_API_SECRET;

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

  async getAnimals(
    latitude,
    longitude,
    type,
    breed,
    distance,
    age,
    size,
    goodWithChildren,
    goodWithPets,
    status,
    coat
  ) {
    let q = querystring.stringify({
      type: type,
      distance: distance,
      age: age,
      size: size,
      status: status,
      coat: coat,
      breed: breed,
    });

    const res = await this.get(
      `v2/animals?location=${latitude},${longitude}&` + q
    );

    console.log(JSON.stringify(res));
    return res.animals;
  }

  async fetchToken() {
    const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      body: `grant_type=client_credentials&client_id=${PET_API_KEY}&client_secret=${PET_API_SECRET}`,
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
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

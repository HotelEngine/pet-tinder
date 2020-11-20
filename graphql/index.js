const types = require("./schema/types/animal");
const resolvers = require("./schema/resolvers/animal");
const { ApolloServer } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");
const fetch = require("node-fetch");
const { removeEmpty, serializedAnimalResponse } = require("./lib/utils");
const { PET_API_KEY, PET_API_SECRET } = require("./constants");

class PetFinder extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.petfinder.com/";
  }

  async willSendRequest(request) {
    console.log("=========request");
    console.log(request);
    const token = await this.fetchToken();
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
    let ratingCriteria = {
      type,
      age,
      size,
      status,
      coat,
      breed,
      good_with_children: goodWithChildren,
      good_with_pets: goodWithPets,
    };

    const sanitizedCriteria = removeEmpty(ratingCriteria);

    const res = await this.get(
      `v2/animals?location=${latitude},${longitude}&distance=${distance}&type=${type}`
    );

    return serializedAnimalResponse(res.animals, sanitizedCriteria);
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

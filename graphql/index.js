const { ApolloServer } = require("apollo-server");
const PetFinder = require("./data/pet-finder");
const { animalTypesTypeDefs } = require("./schema/types/animalTypes");
const { animalTypeDefs } = require("./schema/types/animals");

const { animalResolvers } = require("./schema/resolvers/animals");
const { animalTypeResolvers } = require("./schema/resolvers/animalTypes");

const server = new ApolloServer({
  typeDefs: [animalTypesTypeDefs, animalTypeDefs],
  resolvers: [animalResolvers, animalTypeResolvers],
  dataSources: () => {
    return {
      petFinderApi: new PetFinder(),
    };
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

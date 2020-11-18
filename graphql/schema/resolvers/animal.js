exports.resolvers = {
  Query: {
    animals: async (_source, { latitude, longitude }, { dataSources }) => {
      return dataSources.petFinderApi.getAnimals(latitude, longitude);
    },
  },
};

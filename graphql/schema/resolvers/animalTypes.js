exports.animalTypeResolvers = {
  Query: {
    animalTypes: async (_source, { _arguments }, { dataSources }) => {
      return dataSources.petFinderApi.getAnimalTypes();
    },
  },
};

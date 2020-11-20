exports.animalResolvers = {
  Query: {
    animals: async (
      _source,
      {
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
        coat,
      },
      { dataSources }
    ) => {
      return dataSources.petFinderApi.getAnimals(
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
      );
    },
  },
};

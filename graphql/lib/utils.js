const { REQUIRED_ANIMAL_ARG_NUM } = require("../constants");

module.exports.removeEmpty = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      newObj[key] = removeEmpty(obj[key]);
    } else if (obj[key] != null) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

module.exports.serializedAnimalResponse = (animals, sanitizedCriteria) => {
  const ratingCriteriaLength =
    Object.keys(sanitizedCriteria).length + REQUIRED_ANIMAL_ARG_NUM;
  return animals
    .map((res) => {
      let matchCount = REQUIRED_ANIMAL_ARG_NUM;
      Object.keys(sanitizedCriteria).forEach((key) => {
        res[key]
          ? res[key].toLowerCase() === sanitizedCriteria[key]
            ? matchCount++
            : null
          : null;
      });
      return {
        ...res,
        matchRating:
          matchCount > 0 ? (matchCount / ratingCriteriaLength) * 100 : 0,
      };
    })
    .sort((a, b) => {
      return b.matchRating - a.matchRating;
    });
};

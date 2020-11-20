const { RESTDataSource } = require("apollo-datasource-rest");
const fetch = require("node-fetch");
const { PET_API_KEY, PET_API_SECRET } = require("../constants");
const { removeEmpty } = require("../lib/utils");
const { REQUIRED_ANIMAL_ARG_NUM } = require("../constants");

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

  async getAnimalTypes() {
    const res = await this.get("v2/types");
    return res.types;
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
    let path = `v2/animals?location=${latitude},${longitude}&distance=${distance}`;
    if (type) {
      path = path + `&type=${type}`;
    }

    const res = await this.get(path);

    return this.serializedAnimalResponse(res.animals, sanitizedCriteria);
  }

  serializedAnimalResponse(animals, sanitizedCriteria) {
    const ratingCriteriaLength =
      Object.keys(sanitizedCriteria).length + REQUIRED_ANIMAL_ARG_NUM;
    return animals
      .filter((res) => {
        if (res.photos === undefined || res.photos.length == 0) {
          return false;
        }
        return true;
      })
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
  }
}
module.exports = PetFinder;

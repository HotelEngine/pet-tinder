const { gql } = require("apollo-server");

exports.animalTypesTypeDefs = gql`
  type Types {
    name: String
    genders: [String]
    colors: [String]
    coats: [String]
  }
`;

const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Pagination {
    count_per_page: Int
    total_count: Int
    current_page: Int
    total_pages: Int
  }

  type Organization {
    href: String
  }

  type Type {
    href: String
  }

  type Self {
    href: String
  }

  type Links {
    organization: Organization
    type: Type
    self: Self
  }

  type Address {
    address1: String
    address2: String
    city: String
    state: String
    postcode: String
    country: String
  }

  type Contact {
    email: String
    phone: String
    address: Address
  }

  type Environment {
    children: Boolean
    dogs: Boolean
    cats: Boolean
  }

  type Attributes {
    spayed_neutered: Boolean
    house_trained: Boolean
    declawed: Boolean
    special_needs: Boolean
    shots_current: Boolean
  }

  type Videos {
    embed: String
  }

  type Photos {
    small: String
    medium: String
    large: String
    full: String
  }

  type Colors {
    primary: String
    secondary: String
    tertiary: String
  }

  type Breeds {
    primary: String
    secondary: String
    mixed: Boolean
    unknown: Boolean
  }

  type Animals {
    id: Int
    organization_id: String
    url: String
    type: String
    species: String
    age: String
    gender: String
    size: String
    coat: String
    name: String
    description: String
    status: String
    published_at: String
    distance: Float
    _links: Links
    contact: Contact
    tags: [String]
    environment: Environment
    attributes: Attributes
    videos: [Videos]
    photos: [Photos]
    colors: Colors
    breeds: Breeds
  }

  type Query {
    animals(
      latitude: Float
      longitude: Float
      type: String
      breed: String
      distance: Int
      age: String
      size: String
      goodWithChildren: Boolean
      goodWithPets: Boolean
      status: String
      coat: String
    ): [Animals]
  }
`;

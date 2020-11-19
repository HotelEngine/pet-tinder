# pet-tinder
## Find your furry friend
Pet Adoption App

Hackathon 2020 project built with Apollo GraphQL on the backend and React Mobile on the frontend

### Backend

- clone this project
- run `npm install`
- to start server in local development: `npm run start-be`
  - server will be available via `localhost:4000`
  
- production backend is currently located at https://pet-tinder-hackathon.herokuapp.com/

#### Sample Queries

GraphQL Query:
```
query Query(
  $animalsLatitude: Float,
  $animalsLongitude: Float,
  $animalsType: String,
  $animalsDistance: Int,
  $animalsAge: String,
  $animalsSize: String,
  $animalsCoat: String,
  $animalsStatus: String,
  $animalsGoodWithChildren: Boolean
) {
  animals(
    latitude: $animalsLatitude,
    longitude: $animalsLongitude,
    type: $animalsType,
    distance: $animalsDistance,
    age: $animalsAge,
    size: $animalsSize,
    coat: $animalsCoat,
    status: $animalsStatus,
    goodWithChildren: $animalsGoodWithChildren
  ) {
    name,
    distance,
    type,
    age,
    size,
    status,
    coat,
    status,
    good_with_children
  }
}
```

variables:
```
{
  "animalsLatitude": 39.7698,
  "animalsLongitude": -105.0148,
  "animalsType": "dog",
  "animalsDistance": 500,
  "animalsAge": "adult",
  "animalsSize": "medium",
  "animalsStatus": "adoptable",
  "animalsGoodWithChildren": true
}
```


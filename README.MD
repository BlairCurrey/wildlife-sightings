# [Wildlife Sightings](https://mern-app-test.azurewebsites.net/)

Wildlife sightings allows you to report sightings of different wildlife and view reports that others have submitted. Features stateless user authentication using json web tokens (JWT) and a permission system. Follows the MVC design pattern using the MERN stack with Material UI. Utilizes Azure and MongoDB Atlas cloud services. [Visit the application.](https://mern-app-test.azurewebsites.net/) (May take ~1minute to load because it's hosted on Azure's shared tier.)

## API

This application utilizes a restful API which is consumed by a react frontend. Alternatively, the api can be accessed directly.

### All sightings
    
    /api/sightings

### Specific sighting

    /api/sightings/id
*id can be found from all sightings api call*

The same can be done for the `animals` endpoint.


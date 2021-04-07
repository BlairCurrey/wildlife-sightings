# [Wildlife Sightings](https://mern-app-test.azurewebsites.net/)

Wildlife sightings allows you to report sightings of different wildelife and view reports that others have submitted. Uses the MERN stack as well as Azure and MongoDB Atlas cloud services. [Visit the application.](https://mern-app-test.azurewebsites.net/)

## API

This application utilizes a restful API which is consumed by ar eact frontend. Alternatively, the api can be accessed directly.

### All sightings
    
    /api/sightings

### Specific sighting

    /api/sightings/id
*id can be found from all sightings api call*

The same can be done for the `animals` endpoint.


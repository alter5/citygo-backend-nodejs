<div align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/6a3e2d75-04c8-4f7e-8be5-f78724bb53d6" alt="CityGo Logo" width="250">
</div>

# Introduction
CityGo allows users to find vacation routes for any city. It is integrated with Google Maps to allow users to navigate the trip on their device.

### Tech Stack:
* The back-end uses Node.js and PostgreSQL for storing the trips
  * The pg-promise library is used for database connectivity
* To view the front-end of this application, see this [repo](https://github.com/alter5/citygo-frontend-angular "CityGo frontend repo"). 

# API Reference

### Cities Endpoints

- **Search for Cities**
   - Endpoint: `/cities/search`
   - Method: `GET`
   - Parameters: `queryString` (URL parameter)
   - Description: Searches for cities based on the provided query string.

- **Get Most Populous Cities**
   - Endpoint: `/cities/mostPopulous`
   - Method: `GET`
   - Description: Retrieves the most populous cities.

- **Get City by ID**
   - Endpoint: `/cities/getCityById/:cityId`
   - Method: `GET`
   - Parameters: `cityId`
   - Description: Retrieves a city by its ID.

### Trips Endpoints

- **Get Trip by ID**
   - Endpoint: `/trips/getTripById/:tripId`
   - Method: `GET`
   - Parameters: `tripId`
   - Description: Retrieves a trip by its ID.

- **Get Trips by City ID**
   - Endpoint: `/trips/getTripsByCity/:cityId`
   - Method: `GET`
   - Parameters: `cityId`
   - Description: Retrieves trips by a city's ID.

- **Create a Trip**
   - Endpoint: `/trips/createTrip`
   - Method: `POST`
   - Parameters: `tripDto` (request body)
   - Description: Creates a trip with the provided trip DTO.

- **Get Popular Trips**
   - Endpoint: `/trips/popularTrips`
   - Method: `GET`
   - Description: Retrieves the most popular trips.


# Setup
### Env file
  * First, get a copy of the .env file
    * This file contains environment variables, including the Google Maps and Unsplashed API keys
    * These variables are accessible from the config.js module for application-wide use

### Install Node
  * Install nvm and run the command "nvm install", and then "nvm use"
  * Then, install all packages with "npm i"

### Setting up PostgreSQL
  * Install PostgreSQL with "sudo apt update" and then "sudo apt install postgresql postgresql-contrib"
  * Start the server with "sudo service postgresql start"
  * Then, enter the psql shell with "sudo -u postgres psql" 
  * Set a db password: "postgres=# \password"

### Managing the database
Once PostgreSQL is installed, use the following commands to manage the db:
  * sudo service postgresql status for checking the status of your database.
  * sudo service postgresql start to start running your database.
  * sudo service postgresql stop to stop running your database.

### Initializing the database
Initalize the database by running the following script:
  * npm run create_database

### Start server
Finally, start the server by running
  * npm run dev



# Database Setup
### Database creation
The pg-promise library is used for sending database queries.

The Cities and Trips tables are created as follows:
```sql
CREATE TABLE cities(
  id serial primary key,
  city_name varchar(50),
  state varchar(50),
  population integer,
  latitude numeric(10, 6),
  longitude numeric(10, 6)
);

CREATE TABLE trips(
  id serial primary key,
  city_id int not null REFERENCES cities(id),
  title varchar(255) not null,
  destinations jsonb,
  description text,
  price_range int,
  duration int,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### Loading the Cities table
  
A .csv file containing every US city is loaded into the cities table. The file was retrieved from Data.gov.
```csv
city_name,state,population,latitude,longitude
Marysville,Washington,63269,48.0517637,-122.1770818
Perris,California,CA,72326,33.7825194,-117.22864779999999
Cleveland,Ohio,OH,390113,41.499320000000004,-81.6943605
```



# Unit Testing
Unit tests are written using Jest

### Testing Queries
In Jest, each test suite runs on a separate thread
* A new connection pool is created for every test suite, each containing a max of 3 connections
* Each test case is executed using a db transaction, which is then rolled back to prevent interfering with other test cases
  * Also if any query fails, the transaction is rolled back automatically in pg-promise
  * For example:
    ```javascript
    it("should return an error when unsuccessfully inserting a trip", async () => {
      await dbClient.tx(async (transaction) => {
        ...
  
        const responseAddTrip = await queries.addTrip(
          cityCreationDto,
          transaction
        )
  
        expect(responseAddTrip.success).toBe(false)
  
        const newTripId = responseAddTrip.data
        expect(newTripId).toBe(undefined)
  
        await queries.rollbackTransaction(transaction)
      })
    })

### Testing the Endpoints
The Supertest package is used to simulate requests to back-end endpoints, and receive their responses
* For example:
    ```javascript
    const request = require("supertest")
    const app = require("../app")
    
    jest.mock("../utils/queries")

    ...

      it("should retrieve all trips for a city", async () => {
        const mockResponse = {
          success: true,
          data: [{ title: "Short trip in Manchester" }, { title: "Tour Liverpool" }]
        }
    
        queries.getTripsByCityId.mockResolvedValueOnce(mockResponse)
        const city_id = 999

        const response = await request(app).get(url + "/getTripsByCity/" + city_id)

        expect(response.body.data[0].title).toEqual("Short trip in Manchester")
      })
    ```

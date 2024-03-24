<div align="center">
  <img src="https://github.com/alter5/city-go/assets/36527069/6a3e2d75-04c8-4f7e-8be5-f78724bb53d6" alt="CityGo Logo" width="250">
</div>

# Introduction
CityGo allows users to find vacation routes for any city. It is integrated with Google Maps to allow users to navigate the trip on their device.

### Tech Stack:
* The back-end uses Node.js and PostgreSQL for storing the trips
  * For connecting to the database, the pg-promise package is used
* To view the front-end of this application, see this [repo](https://github.com/alter5/citygo-frontend-angular "CityGo frontend repo"). 

# Setup
First, get a copy of the .env file
* This file contains environment variables, including the Google Maps and Unsplashed API keys
* These variables are accessible from the config.js module for application-wide use

Then, install nvm and run the command "nvm install" and then "nvm use"
Then, install all packages with "npm i"

Install PostgreSQL with "sudo apt update" and then "sudo apt install postgresql postgresql-contrib"
Start the server with "sudo service postgresql start"
Then, enter the psql shell with "sudo -u postgres psql" 
Set a db password: "postgres=# \password"

Once PostgreSQL is installed, use the following commands to manage the db:
  sudo service postgresql status for checking the status of your database.
  sudo service postgresql start to start running your database.
  sudo service postgresql stop to stop running your database.

Initalize the database by running the following script:
  npm run create_database

Finally, start the server by running
  npm run dev

# Unit Testing
Unit testing is done using Jest
### Testing the Endpoints
The Supertest package is used to simulate requests to back-end endpoints

### Testing the Database
In Jest, test suites run on their own threads
* A new connection pool is created for each test suite containing a max of 3 connections
* Each test case is executed using a db transaction, which is then rolled back to prevent interfering with other test cases
  * If a db query fails, the transaction is rolled back automatically in pg-promise
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
    ```

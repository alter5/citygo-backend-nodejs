First, get a copy of the .env file
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

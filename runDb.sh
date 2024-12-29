#!/bin/bash

## A simple script to run a MongoDB database using Docker.
## Make sure you run the next command before starting 
## docker pull mongo
## chmod +x ./runDb.sh

## Verify if it's running as sudo before trying
if [ "$(id -u)" -ne 0 ]; then
  echo "[!] - This script requires sudo privileges. Please run as sudo."
  exit 1
fi
containerName="MongoDBContainer" # Name of the docker container
username="admin" # Username of your mongo db
password="admin" # Password of your mongo db
dbPort="27017" # Default port for your mongoDB

# Remove the container if exists
docker container rm $containerName
# Start MongoDB container using Docker
docker run -d \
  --name $containerName \
  -p 127.0.0.1:$dbPort:$dbPort \
  -e MONGO_INITDB_ROOT_USERNAME=$username \
  -e MONGO_INITDB_ROOT_PASSWORD=$password \
  mongo

# Check if the container is running
docker container ls


# Output MongoDB URI
echo "-------------------------------------------------------------"
echo "[+] MongoDB URI: mongodb://$username:$password@127.0.0.1:$dbPort/"
echo "-------------------------------------------------------------"
echo "[+] - Your db is running now"
echo "  Username: $username"
echo "  Password: $password"
echo "-------------------------------------------------------------"
echo "[+] - Run the next command to test it"
echo 'mongosh --username admin --password admin'
echo "show dbs"

# Enter the running container after the command is executed
docker exec -it $containerName bash

# Inside the container, you can connect to MongoDB
# To execute the mongo command automatically, you can uncomment the line below if needed:
#mongosh --username $username --password $password --authenticationDatabase admin

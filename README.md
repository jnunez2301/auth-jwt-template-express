# Backend JWT Template

This a simple backend repository with authentication using bcrypt for hashing, jwt for token storage and some helpers to make petitions easier to read.

You can modify this code as you please, it's not final and it's not meant to be the best code alive, it's just for testing usage.

## How to run

Before starting make sure you meet the requirements for env variables creating an `.env` file with the variable names set at:
* [Environment](/environment/environment.js)

```bash
# install dependencies
npm install
# run the server
npm run dev
```

## Endpoints

### POST /register

Body:
```json
{
  "username": "newuser",
  "password": "password123",
  "secretAnswer": "mySecretAnswer"
}
```
Response (201):
```json
{
  "success": true,
  "message": "User newuser created successfully"
}
```
```bash
#Curl example
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "password": "password123", "secretAnswer": "mySecretAnswer"}'
```
### POST /login

Logs in with the registered user and obtains a jwt token on response body

Body:
```json
{
  "username": "existinguser",
  "password": "password123"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "<your_jwt_token>"
}
```
```bash
## Curl example
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "existinguser", "password": "password123"}'
```


### GET /profile

Gets profile information about the authenticated user

- This endpoint requires to have a valid JWT token in the Authorization headers, returns the username of the authenticated user

Headers:
* Authorization: Bearer <jwt_token>

Response(200):
```json
{
  "success": true,
  "message": "Welcome newuser",
  "data": {
    "username": "newuser"
  }
}
```
```bash
## Curl example
curl -X GET http://localhost:3000/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```
### Api Response
This API makes use of a common Api response in JSON format for all responses which includes.

```typescript
success: boolean
message: string
token?: string // optional
data?: unknown // optional
``` 

```bash
## API response example
{
  "success": true,
  "message": "Created new foo",
  "data": {
    foo: "bar"
  }
}
``` 

### runDb.sh

This example comes with a simple bash script to run your mongo db locally just in case you don't want to do that many extra steps when testing.

This requires `docker` to be installed in your machine
```bash
# To make it executable
chmod +x ./runDb.sh

# To run the database
sudo ./runDb.sh
``` 
## Middleware

Here is a list of the middlewares integrated on this template.

### verifyJwt
A simple middleware to return 403 (forbidden) in case you don't want an unauthenticated user to see or request that path
   ```javascript
   // It can be done at router level
   app.use("/api/auth", verifyJwt,authRouter);
   // Or it can be done at route level
   exampleRouter.get("/", verifyJwt, (req, res, next)=> {
    //...Your code
    next();
   })
   ```

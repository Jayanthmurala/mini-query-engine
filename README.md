# Mini Data Query Simulation Engine

This project is a lightweight backend service built for GrowthGear’s Backend Engineering Intern assignment. It simulates a simplified version of their Gen AI Analytics tool, allowing non-technical users to query data using natural language. The service processes queries, translates them into pseudo-SQL, and returns mock responses from an in-memory database.

## Features

- REST API with endpoints for querying, explaining, and validating natural language inputs.
- Basic query translation from English to pseudo-SQL.
- Mock responses based on sample sales and user data.
- Lightweight authentication using JSON Web Tokens (JWT).
- Error handling for invalid queries and unauthorized access.

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Jayanthmurala/mini-query-engine
   cd mini-query-engine
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This installs the required packages: `express`, `body-parser`, and `jsonwebtoken`.
3. **Start the Server**:

   ```bash
   npm start
   ```

   - The server will run on `http://localhost:3000` by default.
   - For development with auto-restart, use `npm run dev` (requires `nodemon`, installed as a dev dependency).

4. **Test Locally**:
   Use Postman to test the endpoints (see API Documentation below).

## Deployment

The project is deployed and live at:

**URL**: https://mini-query-engine-87k7.onrender.com

## Technical Stack

- **Language**: Node.js
- **Framework**: Express.js
- **Database**: In-memory storage
- **Dependencies**: express, body-parser, jsonwebtoken

## API Documentation

### Authentication

All endpoints (except `/api/login`) require a token in the Authorization header.

#### Get a Token

- **Endpoint**: `GET /api/login`
- **Description**: Generates a JWT token for authentication.
- **Response**:
  ```json
  { "token": "your-jwt-token" }
  ```
- **Postman Setup**:

  - **Method**: GET
  - **URL**: `https://mini-query-engine.onrender.com/api/login`
  - **No headers or body required.**

  **Copy the token** and use it in the Authorization header for other requests: `Authorization: your-jwt-token`.

### Endpoints

#### 1. `POST /api/query`

- **Description**: Processes a natural language query and returns a mock result.
- **Request Body**:
  ```json
  { "query": "string" }
  ```
- **Response Example**:
  ```json
  {
    "query": "What’s the total sales?",
    "pseudoSql": "SELECT SUM(amount) FROM sales",
    "result": { "totalSales": 12000 }
  }
  ```
- **Error Response (e.g., unsupported query)**:
  ```json
  { "error": "Sorry, I can’t process that query yet." }
  ```

#### 2. `POST /api/explain`

- **Description**: Breaks down how a query is processed, showing the steps taken.
- **Request Body**:
  ```json
  { "query": "string" }
  ```
- **Response Example**:
  ```json
  {
    "originalSql": "SELECT amount FROM sales WHERE month = ?",
    "steps": [
      "Read the user’s question",
      "Turned it into a database-like command",
      "Fetched the answer from the mock data"
    ]
  }
  ```
- **Error Response (e.g., missing query)**:
  ```json
  { "error": "You didn’t send a query!" }
  ```

#### 3. `POST /api/validate`

- **Description**: Checks if a query is feasible to process.
- **Request Body**:
  ```json
  { "query": "string" }
  ```
- **Response Example**:
  ```json
  { "isValid": true, "message": "Looks good!" }
  ```
- **Error Response (e.g., unsupported query)**:
  ```json
  { "isValid": false, "message": "I can’t handle that query." }
  ```

### Error Handling

- **Missing Token**:
  ```json
  {"error": "Please provide a token."} (401 Unauthorized)
  ```
- **Invalid Token**:
  ```json
  {"error": "Invalid token."} (401 Unauthorized)
  ```
- **Missing Query**:
  ```json
  {"error": "You didn’t send a query!"} (400 Bad Request)
  ```

## Sample Query Examples (Using Postman)

A Postman collection (`MiniQueryEngine.postman_collection.json`) is included in the repository with these examples pre-configured. Import it into Postman to get started.

### Example Queries:

#### Query: "What’s the total sales?"

- **Endpoint**: `POST /api/query`
- **Response**:
  ```json
  {
    "query": "What’s the total sales?",
    "pseudoSql": "SELECT SUM(amount) FROM sales",
    "result": { "totalSales": 12000 }
  }
  ```

#### Query: "Show me sales for January"

- **Endpoint**: `POST /api/query`
- **Response**:
  ```json
  {
    "query": "Show me sales for January",
    "pseudoSql": "SELECT amount FROM sales WHERE month = ?",
    "result": { "month": "January", "amount": 5000 }
  }
  ```

#### Query: "List all users"

- **Endpoint**: `POST /api/query`
- **Response**:
  ```json
  {
    "query": "List all users",
    "pseudoSql": "SELECT * FROM users",
    "result": [
      { "id": 1, "name": "Alice" },
      { "id": 2, "name": "Bob" }
    ]
  }
  ```

## Testing

### Postman Collection:

A Postman collection is included in the repo as `MiniQueryEngine.postman_collection.json`. Import it into Postman to test all endpoints with pre-configured requests, including authentication.

### Steps to Use Postman:

1. Download and install Postman from [postman.com]
2. Import `MiniQueryEngine.postman_collection.json` into Postman.
3. Start with the `GET /api/login` request to get a token.
4. Copy the token and paste it into the Authorization header of other requests in the collection.
5. Run the sample queries provided in the collection.

## Submission Details

- **GitHub Repository**: https://github.com/Jayanthmurala/mini-query-engine
- **Deployed URL**: https://mini-query-engine-87k7.onrender.com

Feel free to reach out if you have questions or need help testing!
->**jayanthmurala@gmail.com**
-> LinkedIn: www.linkedin.com/in/jayanth-murala-0045b2281

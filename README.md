# Mini Data Query Simulation Engine

This project is a lightweight backend service built for GrowthGear’s Backend Engineering Intern assignment. It simulates a simplified version of their Gen AI Analytics tool, allowing non-technical users to query data using natural language. The service processes queries, translates them into pseudo-SQL, and returns mock responses from an in-memory database.

## Features

- REST API with endpoints for querying, explaining, and validating natural language inputs.
- Basic query translation from English to pseudo-SQL.
- Mock responses based on sample sales and user data.
- Lightweight authentication using JSON Web Tokens (JWT).
- Error handling for invalid queries and unauthorized access.

## Setup Instructions

To run this project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Jayanthmurala/mini-query-engine
   cd mini-query-engine
   ```
2. **Endpoints**:

```bash
    Endpoint: GET /api/login,

```

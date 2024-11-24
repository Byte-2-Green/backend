# Backend Example

This is the backend for the project from Byte-2-Green, every microservice has its own folder

## Setup

1. Install Docker on your system.
2. Run `docker compose up` to start the application.

---

## Modules

We use the **ES6 module system** to import and export modules.

---

## `variables.env`

- Credentials to other services are stored in the `variables.env` file.
- This file is included in the template for demonstration purposes. 
- **Note:** It is a common practice not to include `variables.env` in a public repository.
- The file includes default key-value pairs to showcase its functionality.

---

## Ports

You can modify the server ports via the `variables.env` file:

- **Educational Service:** Runs on `port:3011`.
- **API Gateway:** Runs on `port:3010`.

---

## Containers

Refer to the `README.md` files within each container for detailed setup instructions.

---

# Food for Thought API Documentation

## Base URL

http://localhost:3011/

---

## Request/Response Example Summary

| **Method** | **Endpoint**                         | **Description**                                    | **Request Example**                                             | **Response Example**                                             |
|------------|--------------------------------------|----------------------------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------|
| `GET`      | `/foodForThought`                    | Get all food for thought                           | _No request body required_                                      | `[ { "id": "1", "thought": "Happiness depends on ourselves.", "category": "Motivation" } ]` |
| `POST`     | `/foodForThought`                    | Add a new food for thought                         | `{ "thought": "Some thought", "category": "Wisdom" }`           | `{ "id": "3", "thought": "Some thought", "category": "Wisdom" }` |
| `GET`      | `/foodForThought/:id`                | Get food for thought by ID                         | `/foodForThought/1`                                             | `{ "id": "1", "thought": "Happiness depends on ourselves.", "category": "Motivation" }` |
| `GET`      | `/foodForThought/category/:category` | Get food for thought by category                   | `/foodForThought/category/Motivation`                          | `[ { "id": "1", "thought": "Happiness depends on ourselves.", "category": "Motivation" } ]` |

---

## Error Responses

- **400 Bad Request:** Invalid input or malformed request.
  ```json
  {
    "error": "Invalid input data."
  }
  ```
- **404 Not Found: Resource not found.
  ```json
  {
    "error": "Food for thought not found."
  }
  ```
- **500 Internal Server Error: Unexpected server error.
  ```json
  {
    "error": "An error occurred while processing your request."
  }

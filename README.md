# InQool Frontend Interview

## Introduction

You are given a simple REST API and asked to create a web application. The API is a simple REST API with two entities - **user** and **animal**. You need to create a web application to interact with these entities.

## Task

Create a web application using React and TypeScript. If you prefer to use Next.js, that's fine too. You must communicate with a REST API to fetch and update data. For this application, we prefer client-side fetching over server-side.

We expect you to use some libraries for forms, fetching data, data validation, etc. We use React Hook Form, Tanstack Query and Zod in our company, it would be positive if you used them as well.

Page `/users`:

- Fetch a list of users from the API
- Display the list of users in a table
- Add a filter to the table to filter the users by name (in the future, there are plans to add more filters)
- Add a button to clear the filter
- Add a form to add a new user to the list
- Add a button to mark a user as banned
- Add a button to edit a user's details

Page `/animals`:

Now do the same for the second entity - **animal**.

---

**IMPORTANT**

When you finish, please add GitHub accounts - **DaliborPan** and **jan-ondruch** as collaborators. You're not required to deploy the application.

## API

Base url: `https://inqool-interview-api.vercel.app/api`

`Example call: GET https://inqool-interview-api.vercel.app/api/users`

The API is a simple REST API with the following endpoints:

**Person**

- GET /users
- GET /users/:id
- POST /users
- PATCH /users/:id
- DELETE /users/:id

**Animal**

- GET /animals
- GET /animals/:id
- POST /animals
- PATCH /animals/:id
- DELETE /animals/:id

**Seed**

- POST /seed

### GET /users

Entity **user** has the following fields:

```ts
- id: string
- name: string
- gender: "female" | "male" | "other"
- banned: boolean
```

Example response:

```json
// GET /users

[
  {
    "id": "aca343a7-bd62-4b73-96e7-d23ec93e0ea9",
    "name": "John Doe",
    "gender": "male",
    "banned": false
  },
  {
    "id": "e8f62198-eaf4-456e-baa7-9e577df343ae",
    "name": "Jane Doe",
    "gender": "female",
    "banned": true
  }
]
```

### POST /users

Example request:

```json
// POST /users

// Request body
{
  "name": "John Doe",
  "gender": "male",
  "banned": false,
}

// Response
{
  "id": "aca343a7-bd62-4b73-96e7-d23ec93e0ea9",
  "name": "John Doe",
  "gender": "male",
  "banned": false,
}
```

The API allows to create a new user the same name that already exists.

### PATCH /users/:id

Example request:

```json

// Request body
{
  "name": "Joe Doe",
}

// Response
{
  "id": "aca343a7-bd62-4b73-96e7-d23ec93e0ea9",
  "name": "Joe Doe",
  "gender": "male",
  "banned": false,
}
```

### DELETE /users/:id

Example request:

```json
DELETE /users/aca343a7-bd62-4b73-96e7-d23ec93e0ea9

// No request body required
```

### GET /animals

Entity **animal** has the following fields:

```ts
- id: string
- name: string
- type: "cat" | "dog" | "other"
- age: number
```

Example response:

```json
// GET /animals

[
  {
    "id": "aca343a7-bd62-4b73-96e7-d23ec93e0ea9",
    "name": "Fluffy",
    "type": "cat",
    "age": 3
  },
  {
    "id": "e8f62198-eaf4-456e-baa7-9e577df343ae",
    "name": "Rex",
    "type": "dog",
    "age": 5
  }
]
```

### POST /animals

Example request:

```json
// POST /animals

// Request body
{
  "name": "Fluffy",
  "type": "cat",
  "age": 3
}

// Response
{
  "id": "aca343a7-bd62-4b73-96e7-d23ec93e0ea9",
  "name": "Fluffy",
  "type": "cat",
  "age": 3
}
```

### PATCH /animals/:id

Example request:

```json

// Request body
{
  "name": "Fluffy the cat",
}

// Response
{
  "id": "aca343a7-bd62-4b73-96e7-d23ec93e0ea9",
  "name": "Fluffy the cat",
  "type": "cat",
  "age": 3
}
```

### DELETE /animals/:id

Example request:

```json
DELETE /animals/aca343a7-bd62-4b73-96e7-d23ec93e0ea9

// No request body required
```

### POST /seed

This endpoint is used to seed the database with some initial data.
First it removes all the data from the database and then it inserts 20 people and 20 animals.

Example request:

```json
POST /seed

// No request body required.
```

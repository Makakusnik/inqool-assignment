import express from "express";
import cors from "cors";
import { z } from "zod";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Schemas
const genderFieldSchema = z.enum(["female", "male", "other"]);
const userSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  gender: genderFieldSchema,
  banned: z.boolean(),
});

const animalTypeFieldSchema = z.enum(["cat", "dog", "other"]);
const animalSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  type: animalTypeFieldSchema,
  age: z.number().min(0),
});

const userCreateSchema = userSchema.omit({ id: true });
const userUpdateSchema = userCreateSchema.partial();
const animalCreateSchema = animalSchema.omit({ id: true });
const animalUpdateSchema = animalCreateSchema.partial();

// Helper functions
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Generate mock data
const generateMockUsers = () => {
  const count = 5000;
  const names = [
    "John",
    "Jane",
    "Bob",
    "Alice",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
    "Kate",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Paul",
    "Quinn",
    "Ruby",
    "Sam",
    "Tina",
    "Uma",
    "Victor",
    "Wendy",
    "Xavier",
    "Yara",
    "Zoe",
  ];
  const surnames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
  ];
  const genders = ["male", "female", "other"];

  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    name: `${names[i % names.length]} ${surnames[i % surnames.length]}`,
    gender: genders[i % genders.length],
    banned: Math.random() > 0.8,
  }));
};

const generateMockAnimals = () => {
  const count = 5000;
  const dogNames = [
    "Buddy",
    "Max",
    "Charlie",
    "Cooper",
    "Rocky",
    "Bear",
    "Tucker",
    "Duke",
    "Zeus",
    "Jack",
    "Toby",
    "Buster",
    "Riley",
    "Murphy",
    "Bentley",
    "Oscar",
    "Leo",
    "Milo",
    "Teddy",
    "Ollie",
  ];
  const catNames = [
    "Whiskers",
    "Mittens",
    "Shadow",
    "Luna",
    "Simba",
    "Nala",
    "Tiger",
    "Smokey",
    "Felix",
    "Garfield",
    "Oreo",
    "Pepper",
    "Boots",
    "Ginger",
    "Snowball",
    "Midnight",
    "Patches",
    "Chloe",
    "Bella",
    "Sophie",
  ];
  const otherNames = ["Nibbles", "Squeaky", "Fluffy", "Spike", "Peanut", "Biscuit", "Cookie", "Muffin", "Pickles", "Snickers"];
  const types = ["dog", "cat", "other"];

  return Array.from({ length: count }, (_, i) => {
    const type = types[i % types.length];
    let name;

    switch (type) {
      case "dog":
        name = dogNames[i % dogNames.length];
        break;
      case "cat":
        name = catNames[i % catNames.length];
        break;
      case "other":
        name = otherNames[i % otherNames.length];
        break;
    }

    return {
      id: (i + 1).toString(),
      name: name + (i > 19 ? ` ${Math.floor(i / 20) + 1}` : ""),
      type,
      age: Math.floor(Math.random() * 15) + 1,
    };
  });
};

// Mock data
let users = generateMockUsers();
let animals = generateMockAnimals();

// User endpoints
app.get("/users", (_req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.post("/users", (req, res) => {
  try {
    const userData = userCreateSchema.parse(req.body);
    const user = { id: generateId(), ...userData };
    users.push(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

app.patch("/users/:id", (req, res) => {
  try {
    const userIndex = users.findIndex((u) => u.id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData = userUpdateSchema.parse(req.body);
    users[userIndex] = { ...users[userIndex], ...updateData };
    res.json(users[userIndex]);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json(deletedUser);
});

// Animal endpoints
app.get("/animals", (_req, res) => {
  res.json(animals);
});

app.get("/animals/:id", (req, res) => {
  const animal = animals.find((a) => a.id === req.params.id);
  if (!animal) {
    return res.status(404).json({ error: "Animal not found" });
  }
  res.json(animal);
});

app.post("/animals", (req, res) => {
  try {
    const animalData = animalCreateSchema.parse(req.body);
    const animal = { id: generateId(), ...animalData };
    animals.push(animal);
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

app.patch("/animals/:id", (req, res) => {
  try {
    const animalIndex = animals.findIndex((a) => a.id === req.params.id);
    if (animalIndex === -1) {
      return res.status(404).json({ error: "Animal not found" });
    }

    const updateData = animalUpdateSchema.parse(req.body);
    animals[animalIndex] = { ...animals[animalIndex], ...updateData };
    res.json(animals[animalIndex]);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

app.delete("/animals/:id", (req, res) => {
  const animalIndex = animals.findIndex((a) => a.id === req.params.id);
  if (animalIndex === -1) {
    return res.status(404).json({ error: "Animal not found" });
  }

  const deletedAnimal = animals.splice(animalIndex, 1)[0];
  res.json(deletedAnimal);
});

// Seed endpoint
app.post("/seed", (_req, res) => {
  users = generateMockUsers();
  animals = generateMockAnimals();

  res.json({ message: "Database seeded successfully with 100 users and 100 animals" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

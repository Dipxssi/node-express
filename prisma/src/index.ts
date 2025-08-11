import { PrismaClient } from "@prisma/client/extension";
import { data } from "react-router-dom";

const client = new PrismaClient();

async function createUser() {
  await client.user.create({
    data: {
      name: "John Doe",
      password: "password123",
      age: 30,
      city: "New York",
    }
  })
}

createUser();
import crypto from "crypto";
import { DB } from "./database/index.js";
//import { redis } from "./database/redis.js";
import { generateCode, getMaxId } from "./utils.js";

const express = require('express');
const app = express();
const PORT = 3333;

app.use(express.json());

// const Pool = new Pool()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/dinosaur', (req, res) => {
  res.status(200).send({
    Dino: "T-rex!"
  })
});

// Inserts a simple record to the database
app.post("/code", async (req, res) => {
  const code = generateCode();

  // Create a new code record
  try {
    const result = await DB.query(
      `
      INSERT INTO codes (code)
      VALUES ($1)
      RETURNING id, code, created_at
    `,
      [code],
    );

    res.status(201).json({ created_code: result[0] });
  } catch (err) {
    if (err.code === "23505") {
      // Unique violation
      return res.status(409).json({ error: "Code already exists." });
    }
    throw err;
  }
});

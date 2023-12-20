import express from "express";
import cors from "cors";
import { Expense } from "./models";
import mongoose from "mongoose";

const app = express();

mongoose.connect(
  "mongodb+srv://nicoandreoli:nicoandreoli@cluster0.o6miqgn.mongodb.net/pay-me-now?retryWrites=true&w=majority"
);

app.use(express.json());

app.use(cors());

app.get("/", (_, res) => {
  res.send({ message: "Hello World!" });
});

app.get("/expenses", async (_, res) => {
  try {
    const expenses = await Expense.find().exec();
    res.send(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

app.post("/expenses", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.send(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

app.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).send({ message: "Expense not found" });
    }

    await expense.deleteOne();
    res.send(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

app.patch("/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, name } = req.body;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).send({ message: "Expense not found" });
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (name !== undefined) {
      expense.name = name;
    }

    await expense.save();
    res.send(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

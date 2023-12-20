import mongoose from "mongoose";

const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  name: String,
  amount: Number,
  currency: String,
  date: { type: Date, default: Date.now },
});

ExpenseSchema.set("toJSON", {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Expense = mongoose.model("Expense", ExpenseSchema);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import "./App.css";
import {
  useCreateExpense,
  useDeleteExpense,
  useExpenses,
} from "./ExpenseService";
import { DeleteOutlined } from "@ant-design/icons";

function App() {
  const { data: expenses, isLoading } = useExpenses();

  const { mutate: createExpense } = useCreateExpense();

  const { mutate: deleteExpense } = useDeleteExpense();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!expenses) {
    return <div>No expenses</div>;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { name, amount } = event.target.elements;
    createExpense({ name: name.value, amount: amount.value });
  };

  const handleDeleteExpense = (id: string) => {
    deleteExpense(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "20rem",
        }}
      >
        {expenses.map((expense) => (
          <li
            key={expense.id}
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {expense.name} - {expense.amount}
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteExpense(expense.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

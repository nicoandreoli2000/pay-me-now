import { DeleteOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { Expense } from "../Expense";

interface ExpensesListProps {
  expenses?: Expense[];
  onDelete: (id: string) => void;
}

export const ExpensesList = ({ expenses, onDelete }: ExpensesListProps) => {
  if (!expenses || expenses.length === 0) {
    return <Typography.Paragraph>No expenses yet</Typography.Paragraph>;
  }

  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "15rem",
        maxHeight: "20rem",
        overflow: "scroll",
        paddingRight: "1rem",
      }}
    >
      {expenses.map((expense) => {
        const dateFormatted = `${expense.date.getDay()}/${expense.date.getMonth()}/${expense.date.getFullYear()}`;
        return (
          <li
            key={expense.id}
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {expense.name}, ${expense.amount}, {dateFormatted}
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(expense.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

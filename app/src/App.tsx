import { Button, Flex, Typography } from "antd";
import {
  useCreateExpense,
  useDeleteExpense,
  useExpenses,
} from "./ExpenseService";
import { CreateExpense } from "./Expense";
import { CreateExpenseModal, ExpensesList } from "./components";
import { useModal } from "./hooks";

function App() {
  const { data: expenses, isLoading } = useExpenses();

  const { mutate: createExpense } = useCreateExpense();

  const { mutate: deleteExpense } = useDeleteExpense();

  const { isOpen, onClose, onOpen } = useModal();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmitNewExpense = (values: CreateExpense) => {
    createExpense(values);
  };

  const handleDeleteExpense = (id: string) => {
    deleteExpense(id);
  };

  return (
    <>
      <Flex
        vertical
        align="center"
        justify="center"
        style={{ width: "100%", height: "100vh" }}
      >
        <Typography.Title>Expenses</Typography.Title>

        <ExpensesList expenses={expenses} onDelete={handleDeleteExpense} />

        <Button type="primary" onClick={onOpen}>
          Add Expense
        </Button>
      </Flex>

      <CreateExpenseModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitNewExpense}
      />
    </>
  );
}

export default App;

export type Expense = {
  id: string;
  name: string;
  amount: number;
};

export type CreateExpense = {
  name: string;
  amount: number;
};

export type UpdateExpense = {
  id: string;
  name?: string;
  amount?: number;
};

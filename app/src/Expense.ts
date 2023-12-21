export type Expense = {
  id: string;
  name: string;
  amount: number;
  date: Date;
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

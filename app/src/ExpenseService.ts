/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateExpense, Expense, UpdateExpense } from "./Expense";

const ExpenseService = {
  getAll: (): Promise<Expense[]> => {
    return fetch("http://localhost:3000/expenses")
      .then((response) => response.json())
      .then((data) =>
        data.map((expense: any) => ({
          ...expense,
          date: new Date(expense.date),
        }))
      );
  },
  create: (expense: CreateExpense): Promise<Expense> => {
    return fetch("http://localhost:3000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    }).then((response) => response.json());
  },

  //not used
  update: (expense: UpdateExpense): Promise<Expense> => {
    return fetch(`http://localhost:3000/expenses/${expense.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    }).then((response) => response.json());
  },
  delete: (id: string): Promise<void> => {
    return fetch(`http://localhost:3000/expenses/${id}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },
};

export const useExpenses = () => {
  return useQuery({
    queryKey: ["PAYMENTS"],
    queryFn: ExpenseService.getAll,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CREATE_EXPENSE"],
    mutationFn: ExpenseService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PAYMENTS"] });
    },
  });
};

export const useUpdateExpense = () => {
  return useMutation({
    mutationKey: ["UPDATE_EXPENSE"],
    mutationFn: ExpenseService.update,
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["DELETE_EXPENSE"],
    mutationFn: ExpenseService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PAYMENTS"] });
    },
  });
};

"use client"
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import db from "utils/dbConfig";
import { Budgets, Expenses } from "utils/schema";
import { eq, desc } from "drizzle-orm";
import ExpenseListTable from "../_components/ExpenseListTable";

function LatestExpensesPage() {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    user && getLatestExpenses();
  }, [user]);

  const getLatestExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id))
      .limit(10);

    setExpensesList(result);
  };

  return (
    <div className="p-6">
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => getLatestExpenses()}
      />
    </div>
  );
}

export default LatestExpensesPage;

"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import CardInfo from './_components/CardInfo';
import db from 'utils/dbConfig';
import { getTableColumns, sql, eq, desc} from 'drizzle-orm';
import { Budgets, Expenses } from 'utils/schema';
import { useState } from 'react';
import BarChartDashboard from './_components/BarChartDashboard';
import PieChartDashboard from './_components/PieChartDashboard';
import { index } from 'drizzle-orm/gel-core';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {

  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

      useEffect(() => {
        user && getBudgetList();
      }, [user]);
  
      /**
      * used to get budget list
      */
      const getBudgetList = async () => {
  
          const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItems: sql `count(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
          .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
          .groupBy(Budgets.id)
          .orderBy(desc(Budgets.id));
  
          setBudgetList(result);
          getAllExpenses();
      }

      /**
       * used to get all expenses belong to users
       */
      const getAllExpenses = async () => {
        const result = await db.select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt
        }).from(Budgets)
        .rightJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));

        setExpensesList(result);
      }

  return (
    <div className='p-8'>
       <h2 className='font-bold text-3xl' >Hi, {user?.fullName}!</h2>
       <p className='text-gray-500' >Welcome to your dashboard, here you can manage your expenses.</p>  

       <CardInfo budgetList={budgetList} />
       <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-6'>
        <div className='md:col-span-2'>
          <BarChartDashboard 
          budgetList={budgetList}
          />

          <ExpenseListTable 
          expensesList={expensesList} 
          refreshData={() => getBudgetList()}
          />
                  
          <PieChartDashboard budgetList={budgetList} />

        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg' >Your Budgets</h2>
          {budgetList.map((budget,index)=>(
            <BudgetItem key={index} budget={budget} />
          ))}
        </div>
       </div>
    </div>
  )
}

export default Dashboard
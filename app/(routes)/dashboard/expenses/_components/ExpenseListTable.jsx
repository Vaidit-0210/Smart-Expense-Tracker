import React from 'react'
import { Trash } from 'lucide-react';
import { db } from 'utils/dbConfig';
import { Expenses } from 'utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function ExpenseListTable({ expensesList = [], refreshData }) {

  const deleteExpense = async (expense) => {
    const result = await db.delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast('Expense Deleted!');
      refreshData();
    }
  }

  return (
    <div className='max-w-4xl w-full mt-3 border rounded-lg p-3 sm:p-5 shadow-md bg-white dark:bg-gray-800'>
      <h2 className='text-base sm:text-lg font-bold mb-3'>Latest Expenses</h2>
      
      {/* Header Row */}
      <div className='grid grid-cols-4 bg-gray-500 p-2 mt-3 text-white rounded-t-md'>
        <h2 className='font-bold text-xs sm:text-sm md:text-base truncate'>Name</h2>
        <h2 className='font-bold text-xs sm:text-sm md:text-base'>Amount</h2>
        <h2 className='font-bold text-xs sm:text-sm md:text-base'>Date</h2>
        <h2 className='font-bold text-xs sm:text-sm md:text-base text-center'>Action</h2>
      </div>

      {/* Data Rows */}
      {expensesList.map((expense, index) => (
        <div className='grid grid-cols-4 p-2 border-b border-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors' key={index}>
          <h2 className='text-xs sm:text-sm md:text-base truncate pr-2'>{expense.name}</h2>
          <h2 className='text-xs sm:text-sm md:text-base font-semibold text-green-600'>₹{parseFloat(expense.amount).toLocaleString()}</h2>
          <h2 className='text-xs sm:text-sm md:text-base '>{new Date(expense.createdAt).toLocaleDateString()}</h2>
          <h2 className='flex justify-center'>
            <Trash 
              className='cursor-pointer text-red-500 hover:text-red-700  rounded p-1 transition-all w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' 
              onClick={() => deleteExpense(expense)}
            />
          </h2>
        </div>
      ))}

      {/* Empty state */}
      {expensesList.length === 0 && (
        <div className='text-center py-8 text-gray-500'>
          <p className='text-sm sm:text-base'>No expenses found</p>
        </div>
      )}
    </div>
  )
}

export default ExpenseListTable
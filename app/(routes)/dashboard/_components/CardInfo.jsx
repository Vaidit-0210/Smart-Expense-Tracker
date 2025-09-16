import React, { useEffect, useState } from 'react'
import { Landmark, BanknoteArrowDown, ListOrdered } from 'lucide-react';

function CardInfo({budgetList}) {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        budgetList && CalculateCardInfo();
    }, [budgetList])

    const CalculateCardInfo = () => {
        console.log(budgetList);
        let totalBudget_ = 0;
        let totalSpend_ = 0;
        budgetList.forEach(element => {
            totalBudget_ = totalBudget_ + Number(element.amount);
            totalSpend_ = totalSpend_ + element.totalSpend;
        });

        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
        console.log(totalBudget_, totalSpend_);
    }

  return (
    <div>
    {budgetList?.length > 0 ?
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <div className='p-7 border rounded-lg flex justify-between items-center'>
            <div>
                <h2 className='text-sm'>Total Budget</h2>
                <h2 className='text-2xl font-bold'>₹{totalBudget}</h2>
            </div>
            <Landmark className='p-3 h-12 w-12 rounded-full text-green-600 bg-green-100'/>
        </div>
        <div className='p-7 border rounded-lg flex justify-between items-center'>
            <div>
                <h2 className='text-sm'>Total Spend</h2>
                <h2 className='text-2xl font-bold'>₹{totalSpend}</h2>
            </div>
            <BanknoteArrowDown className='p-3 h-12 w-12 rounded-full text-red-600 bg-red-100'/>
        </div>
        <div className='p-7 border rounded-lg flex justify-between items-center'>
            <div>
                <h2 className='text-sm'>No. of Budget</h2>
                <h2 className='text-2xl font-bold'>{budgetList?.length}</h2>
            </div>
            <ListOrdered className='p-3 h-12 w-12 rounded-full text-blue-600 bg-blue-100'/>
        </div>
    </div>:
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
       { [1,2,3].map((item,index) => (
            <div className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg' key={index}>

            </div>
        ))}
    </div>

}
    </div>
  )
}

export default CardInfo
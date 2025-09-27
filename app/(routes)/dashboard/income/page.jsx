"use client";
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import db from 'utils/dbConfig';
import { Incomes, Expenses, Budgets } from 'utils/schema';
import { eq, desc } from 'drizzle-orm';
import { toast } from "sonner";
import { PlusCircle, DollarSign, PiggyBank, Landmark, Trash, Loader2, IndianRupee, Wallet, TrendingUp, CreditCard, Briefcase, Home, Gift } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';

// --- Main Income Page Component ---
function Income() {
    const { user } = useUser();
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const getDashboardData = useCallback(async () => {
        if (!user?.primaryEmailAddress?.emailAddress) return;
        setLoading(true);
        try {
            // Fetch incomes for the logged-in user
            const incomeResult = await db.select()
                .from(Incomes)
                .where(eq(Incomes.createdBy, user.primaryEmailAddress.emailAddress))
                .orderBy(desc(Incomes.transactionDate)); 
            setIncomes(incomeResult);

            // Fetch expenses for the logged-in user by joining through budgets
            const expenseResult = await db.select({
                    id: Expenses.id,
                    amount: Expenses.amount,
                    createdAt: Expenses.createdAt
                })
                .from(Expenses)
                .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
                .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));
            setExpenses(expenseResult);

            // Fetch budgets for the logged-in user
            const budgetResult = await db.select()
                .from(Budgets)
                .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));
            setBudgets(budgetResult);

        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            toast.error("Could not load your data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [user]);
    
    useEffect(() => {
        if(user) {
            getDashboardData();
        }
    }, [user, getDashboardData]);

    // --- Data Processing for UI ---
    const { totalOverallIncome, totalMonthlyIncome, totalBudget, monthlyChartData } = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Calculate total overall income (all time)
        const totalOverallIncome = incomes.reduce((sum, item) => sum + parseFloat(item.amount), 0);

        // Calculate this month's income
        const totalMonthlyIncome = incomes
            .filter(i => new Date(i.transactionDate).getMonth() === currentMonth && new Date(i.transactionDate).getFullYear() === currentYear)
            .reduce((sum, item) => sum + parseFloat(item.amount), 0);

        // Calculate total budget
        const totalBudget = budgets.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

        // Calculate total expenses for chart
        const totalExpenses = expenses
            .filter(e => new Date(e.createdAt).getMonth() === currentMonth && new Date(e.createdAt).getFullYear() === currentYear)
            .reduce((sum, item) => sum + parseFloat(item.amount), 0);
        
        // Monthly chart data (last 6 months)
        const monthlyDataMap = new Map();
        for (let i = 5; i >= 0; i--) {
            const date = new Date(currentYear, currentMonth - i, 1);
            const monthName = date.toLocaleString('default', { month: 'short' });
            monthlyDataMap.set(`${date.getFullYear()}-${date.getMonth()}`, { name: monthName, Income: 0, Expenses: 0 });
        }

        incomes.forEach(income => {
            const date = new Date(income.transactionDate);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            if (monthlyDataMap.has(key)) {
                monthlyDataMap.get(key).Income += parseFloat(income.amount);
            }
        });

        expenses.forEach(expense => {
            const date = new Date(expense.createdAt);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            if (monthlyDataMap.has(key)) {
                monthlyDataMap.get(key).Expenses += parseFloat(expense.amount);
            }
        });

        return { 
            totalOverallIncome, 
            totalMonthlyIncome, 
            totalBudget, 
            monthlyChartData: Array.from(monthlyDataMap.values()) 
        };
    }, [incomes, expenses, budgets]);

    const handleAddIncome = async (newIncome) => {
        if(!user) return;
        try {
            await db.insert(Incomes).values({
                ...newIncome,
                createdBy: user.primaryEmailAddress.emailAddress,
            });
            await getDashboardData(); // Refresh data from DB
            setAddModalOpen(false);
            toast.success("New income source added!");
        } catch (error) {
            console.error("Failed to add income:", error);
            toast.error("Something went wrong while adding income.");
        }
    };

    const handleDeleteIncome = async (incomeId) => {
        try {
            await db.delete(Incomes).where(eq(Incomes.id, incomeId));
            await getDashboardData(); 
            toast.success("Income record deleted.");
        } catch (error) {
            console.error("Failed to delete income:", error);
            toast.error("Something went wrong while deleting.");
        }
    };

    if (loading) {
        return <div className="p-10 h-screen w-full flex justify-center items-center"><Loader2 className="h-10 w-10 animate-spin" /></div>
    }

    return (
        <div className="p-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="font-bold text-3xl">Income Overview</h2>
                    <p className="text-gray-500">Here's a summary of your earnings and savings.</p>
                </div>
                <Button onClick={() => setAddModalOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Income
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    icon={IndianRupee} 
                    title="Overall Income" 
                    value={`₹${totalOverallIncome.toLocaleString()}`} 
                    color="text-green-600" 
                    bgColor="bg-green-100" 
                />
                <StatCard 
                    icon={PiggyBank} 
                    title="This Month's Income" 
                    value={`₹${totalMonthlyIncome.toLocaleString()}`} 
                    color="text-blue-600" 
                    bgColor="bg-blue-100" 
                />
                <StatCard 
                    icon={Landmark} 
                    title="Total Budget" 
                    value={`₹${totalBudget.toLocaleString()}`} 
                    color="text-purple-600" 
                    bgColor="bg-purple-100" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Income vs. Expenses (Last 6 Months)</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={monthlyChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${value/1000}k`} />
                                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                                <Legend wrapperStyle={{fontSize: "14px"}}/>
                                <Bar dataKey="Income" fill="#4ade80" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Incomes */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Incomes</h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {incomes.length > 0 ? incomes.slice(0, 5).map((income, index) => (
                            <IncomeItem key={income.id} income={income} onDelete={handleDeleteIncome} index={index} />
                        )) : <p className="text-sm text-gray-500 text-center pt-10">No income records yet.</p>}
                    </div>
                </div>
            </div>

            <AddIncomeDialog 
                isOpen={isAddModalOpen} 
                onClose={() => setAddModalOpen(false)} 
                onAdd={handleAddIncome}
            />
        </div>
    );
}

// --- Sub-components ---

function StatCard({ icon: Icon, title, value, color, bgColor }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-6">
            <div className={`p-4 rounded-full ${bgColor} ${color}`}>
                <Icon size={28} />
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}

function IncomeItem({ income, onDelete, index = 0 }) {
     // Array of different icons and colors for variety
    const iconOptions = [
        { Icon: Wallet, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
        { Icon: TrendingUp, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
        { Icon: CreditCard, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
        { Icon: Briefcase, bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
        { Icon: Home, bgColor: 'bg-indigo-100', iconColor: 'text-indigo-600' },
        { Icon: Gift, bgColor: 'bg-pink-100', iconColor: 'text-pink-600' }
    ];

    // Select icon based on index to ensure variety
    const selectedIcon = iconOptions[index % iconOptions.length];
    const { Icon, bgColor, iconColor } = selectedIcon;

    return (
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-4">
               <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>
                    <Icon size={20} />
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{income.name}</p>
                    <p className="text-xs text-gray-500">{new Date(income.transactionDate).toLocaleDateString()}</p> 
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className="font-bold text-green-600">+₹{parseFloat(income.amount).toLocaleString()}</p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                           <Trash className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this income record.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(income.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

function AddIncomeDialog({ isOpen, onClose, onAdd }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionDate, setTransactionDate] = useState(new Date());
    const [frequency, setFrequency] = useState('one-time');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (name && amount && transactionDate && frequency) {
            setIsSubmitting(true);
            await onAdd({ name, amount, transactionDate, frequency });
            // Reset form 
            setName('');
            setAmount('');
            setTransactionDate(new Date());
            setFrequency('one-time');
            setIsSubmitting(false);
        } else {
            toast.warning("Please fill out all fields.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Income</DialogTitle>
                    <DialogDescription>
                        Enter the details of your new income source.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium">Source Name</label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Side Project" />
                    </div>
                    <div>
                        <label htmlFor="amount" className="text-sm font-medium">Amount (₹)</label>
                        <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 15000" />
                    </div>
                     <div>
                        <label htmlFor="date" className="text-sm font-medium">Date</label>
                        <Input id="date" type="date" value={transactionDate.toISOString().split('T')[0]} onChange={(e) => setTransactionDate(new Date(e.target.value))} />
                    </div>
                     <div>
                        <label htmlFor="frequency" className="text-sm font-medium">Frequency</label>
                        <select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full mt-1 p-2 border rounded-md bg-transparent">
                            <option value="one-time">One-time</option>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                       <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Income
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default Income;
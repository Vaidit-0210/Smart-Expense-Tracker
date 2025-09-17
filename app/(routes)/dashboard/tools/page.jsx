"use client";
import React, { useState } from 'react';
import { Calculator, IndianRupee } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function FinancialToolsPage() {
    const [principal, setPrincipal] =useState('');
    const [rate, setRate] = useState('');
    const [tenure, setTenure] = useState('');
    const [emi, setEmi] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);

    const calculateEmi = () => {
        // Input validation
        const p = parseFloat(principal);
        const r = parseFloat(rate);
        const t = parseFloat(tenure);

        if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
            alert("Please enter valid positive numbers for all fields.");
            return;
        }

        const monthlyRate = r / (12 * 100); // Annual rate to monthly rate
        const numberOfMonths = t * 12; // Years to months

        // EMI formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
        const emiValue = (p * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
        
        const totalAmountPayable = emiValue * numberOfMonths;
        const totalInterestPayable = totalAmountPayable - p;

        setEmi(emiValue.toFixed(2));
        setTotalAmount(totalAmountPayable.toFixed(2));
        setTotalInterest(totalInterestPayable.toFixed(2));
    };

    return (
        <div className="p-5 sm:p-10">
            <div className="mb-8">
                <h2 className="font-bold text-3xl text-gray-800 dark:text-white">Financial Tools</h2>
                <p className="text-gray-500 dark:text-white">Handy calculators to help you plan your finances.</p>
            </div>
            
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator size={24} />
                        Loan EMI Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Input Fields */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-white">Loan Amount (₹)</label>
                            <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 500000" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-white">Annual Interest Rate (%)</label>
                            <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 8.5" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-white">Loan Tenure (Years)</label>
                            <Input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="e.g., 5" />
                        </div>

                        <Button onClick={calculateEmi} className="w-full">
                            Calculate EMI
                        </Button>
                    </div>

                    {/* Result Section */}
                    {emi && (
                        <div className="mt-8 pt-6 border-t animate-fade-in">
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-4 dark:text-white">Your Loan Details</h3>
                            <div className="bg-indigo-50 p-6 rounded-lg text-center">
                                <p className="text-lg text-gray-600">Monthly EMI</p>
                                <p className="text-4xl font-extrabold text-indigo-600 my-2">
                                    ₹{Number(emi).toLocaleString('en-IN')}
                                </p>
                            </div>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                                <div className="bg-slate-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Total Interest Payable</p>
                                    <p className="text-xl font-bold text-gray-700">₹{Number(totalInterest).toLocaleString('en-IN')}</p>
                                </div>
                                <div className="bg-slate-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Total Amount Payable</p>
                                    <p className="text-xl font-bold text-gray-700">₹{Number(totalAmount).toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default FinancialToolsPage;
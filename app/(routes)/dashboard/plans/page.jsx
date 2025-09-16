"use client";
import React, { useState } from 'react';
import { Check, Star, Zap, Users, Shield } from 'lucide-react';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '₹0',
      period: 'Lifetime Free',
      description: 'Perfect for getting started',
      features: [
        'Track up to 50 expenses',
        'Basic analytics',
        'Community support',
        'Mobile app access'
      ],
      buttonText: 'Start Free',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
      popular: false,
      icon: Shield
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₹400',
      period: 'Per Month',
      description: 'Best for individuals and freelancers',
      features: [
        'Unlimited expense tracking',
        'AI-powered insights',
        'Priority support',
        'Advanced analytics',
        'Export to Excel/PDF',
        'Custom categories'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-white text-indigo-600 hover:bg-gray-100',
      popular: true,
      icon: Zap
    },
    {
      id: 'team',
      name: 'Team',
      price: '₹800',
      period: 'Per Month',
      description: 'Perfect for teams and businesses',
      features: [
        'Shared team dashboard',
        'Role-based access',
        'Dedicated account manager',
        'Team collaboration tools',
        'Advanced reporting',
        'API access'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      popular: false,
      icon: Users
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    if (plan.id === 'free') {
      // Simulate redirect to dashboard for free plan
      setTimeout(() => {
        alert('🎉 Welcome to Smart Expense Tracker! Redirecting to dashboard...');
      }, 500);
    } else {
      setShowModal(true);
    }
  };

  const handlePaymentDemo = () => {
    setShowModal(false);
    // Simulate payment processing
    setTimeout(() => {
      alert(`✅ Payment Successful! Welcome to ${selectedPlan.name} plan! Redirecting to dashboard...`);
      setSelectedPlan(null);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="text-center py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Start managing your expenses smarter with our flexible pricing options
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-indigo-600 to-indigo-700 text-white ring-4 ring-indigo-300'
                    : 'bg-white text-gray-900 ring-1 ring-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                      <span>MOST POPULAR</span>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${
                    plan.popular ? 'bg-white bg-opacity-20' : 'bg-indigo-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      plan.popular ? 'text-white' : 'text-indigo-600'
                    }`} />
                  </div>

                  {/* Plan Name */}
                  <h3 className={`text-xl font-bold mb-2 ${
                    plan.popular ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span className={`text-5xl font-extrabold ${
                      plan.popular ? 'text-white' : 'text-gray-900'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ml-2 ${
                      plan.popular ? 'text-indigo-200' : 'text-gray-500'
                    }`}>
                      {plan.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-sm mb-6 ${
                    plan.popular ? 'text-indigo-100' : 'text-gray-600'
                  }`}>
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.popular ? 'text-green-300' : 'text-green-500'
                        }`} />
                        <span className={`text-sm ${
                          plan.popular ? 'text-indigo-100' : 'text-gray-600'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Confirm Your Plan
              </h3>
              
              <p className="text-gray-600 mb-6">
                You're about to subscribe to the {selectedPlan.name} plan
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-semibold text-xl text-indigo-600">
                    {selectedPlan.price}/{selectedPlan.period}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handlePaymentDemo}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Proceed to Payment (Demo)
                </button>
                
                <button
                  onClick={closeModal}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
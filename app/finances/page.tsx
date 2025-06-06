'use client';

import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';

interface LevyCalculation {
  unitSize: number;
  unitType: string;
  floor: number;
  quarterlyLevy: number;
  monthlyLevy: number;
  breakdown: {
    baseRate: number;
    typeMultiplier: number;
    floorAdjustment: number;
  };
}

export default function FinancesPage() {
  const [levyCalculation, setLevyCalculation] = useState<LevyCalculation | null>(null);
  const [calculatorData, setCalculatorData] = useState({
    unitSize: 75,
    unitType: '2-bedroom',
    floor: 3
  });
  const [loading, setLoading] = useState(false);

  const financialSummary = {
    currentQuarter: "Q1 2025",
    totalIncome: 165643,
    totalExpenses: 135072,
    netResult: 30571,
    reserveFund: 320334,
    lastUpdated: "2025-06-01"
  };

  const incomeBreakdown = [
    { category: "Quarterly Levies", amount: 142560, percentage: 86.1 },
    { category: "Special Levies", amount: 12000, percentage: 7.2 },
    { category: "Interest & Investments", amount: 8234, percentage: 5.0 },
    { category: "Late Payment Fees", amount: 1849, percentage: 1.1 },
    { category: "Other Income", amount: 1000, percentage: 0.6 }
  ];

  const expenseBreakdown = [
    { category: "Building Maintenance", amount: 45120, percentage: 33.4 },
    { category: "Utilities & Services", amount: 28650, percentage: 21.2 },
    { category: "Insurance Premiums", amount: 22400, percentage: 16.6 },
    { category: "Management Fees", amount: 18000, percentage: 13.3 },
    { category: "Cleaning Services", amount: 12600, percentage: 9.3 },
    { category: "Garden Maintenance", amount: 5852, percentage: 4.3 },
    { category: "Administrative Costs", amount: 2450, percentage: 1.8 }
  ];

  const reserveFundAllocation = [
    { purpose: "Major Repairs Reserve", amount: 180000, percentage: 56.2 },
    { purpose: "Capital Works Fund", amount: 85000, percentage: 26.5 },
    { purpose: "Emergency Fund", amount: 35334, percentage: 11.0 },
    { purpose: "Equipment Replacement", amount: 20000, percentage: 6.2 }
  ];

  const calculateLevy = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/calculate-levy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(calculatorData)
      });

      const result = await response.json();
      
      if (response.ok) {
        setLevyCalculation(result);
      } else {
        console.error('Levy calculation failed:', result.error);
      }
    } catch (error) {
      console.error('Network error during levy calculation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateLevy();
  }, []);

  const handleCalculatorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCalculatorData(prev => ({
      ...prev,
      [name]: name === 'unitSize' || name === 'floor' ? parseInt(value) : value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Financial Overview"
        description="Comprehensive financial information including quarterly reports, levy calculations, and expense breakdowns for Sunrise Strata Apartments."
        breadcrumb="Finances"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Income</dt>
                  <dd className="text-lg font-medium text-gray-900">{formatCurrency(financialSummary.totalIncome)}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                  <dd className="text-lg font-medium text-gray-900">{formatCurrency(financialSummary.totalExpenses)}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Net Result</dt>
                  <dd className={`text-lg font-medium ${financialSummary.netResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(financialSummary.netResult)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Reserve Fund</dt>
                  <dd className="text-lg font-medium text-gray-900">{formatCurrency(financialSummary.reserveFund)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Levy Calculator */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Levy Calculator</h2>
          <p className="text-gray-600 mb-6">
            Calculate your quarterly and monthly levy fees based on your unit specifications. This calculator uses the current Sydney strata rates.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit Size (sqm)</label>
              <input
                type="number"
                name="unitSize"
                value={calculatorData.unitSize}
                onChange={handleCalculatorChange}
                min="25"
                max="200"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit Type</label>
              <select
                name="unitType"
                value={calculatorData.unitType}
                onChange={handleCalculatorChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="studio">Studio</option>
                <option value="1-bedroom">1 Bedroom</option>
                <option value="2-bedroom">2 Bedroom</option>
                <option value="3-bedroom">3 Bedroom</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Floor Level</label>
              <input
                type="number"
                name="floor"
                value={calculatorData.floor}
                onChange={handleCalculatorChange}
                min="1"
                max="20"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={calculateLevy}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? 'Calculating...' : 'Calculate Levy'}
          </button>

          {levyCalculation && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Levy Calculation Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{formatCurrency(levyCalculation.quarterlyLevy)}</div>
                  <div className="text-blue-800">Quarterly Levy</div>
                  <div className="text-sm text-blue-700 mt-1">
                    Monthly: {formatCurrency(levyCalculation.monthlyLevy)}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base rate (${levyCalculation.breakdown.baseRate}/sqm):</span>
                    <span className="font-medium">{formatCurrency(levyCalculation.breakdown.baseRate * levyCalculation.unitSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type multiplier ({levyCalculation.breakdown.typeMultiplier}x):</span>
                    <span className="font-medium">{formatCurrency((levyCalculation.breakdown.typeMultiplier - 1) * levyCalculation.breakdown.baseRate * levyCalculation.unitSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Floor adjustment:</span>
                    <span className="font-medium">{formatCurrency(levyCalculation.breakdown.floorAdjustment)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Quarterly:</span>
                    <span>{formatCurrency(levyCalculation.quarterlyLevy)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Financial Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Income Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Income Breakdown</h2>
            <div className="space-y-4">
              {incomeBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm text-gray-600">{formatPercentage(item.percentage)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-lg font-semibold text-gray-900">{formatCurrency(item.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Breakdown</h2>
            <div className="space-y-4">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm text-gray-600">{formatPercentage(item.percentage)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-lg font-semibold text-gray-900">{formatCurrency(item.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reserve Fund Allocation */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reserve Fund Allocation</h2>
          <p className="text-gray-600 mb-6">
            Current reserve fund balance: <strong>{formatCurrency(financialSummary.reserveFund)}</strong>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reserveFundAllocation.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.purpose}</h3>
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(item.amount)}</div>
                <div className="text-sm text-gray-600">{formatPercentage(item.percentage)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Payment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Payment Methods</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Direct bank transfer (preferred)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  BPAY (Biller Code: 12345)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cheque (payable to Sunrise Strata)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cash (office hours only)
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Banking Details</h3>
              <div className="space-y-2 text-blue-800">
                <p><strong>Account Name:</strong> Sunrise Strata Apartments</p>
                <p><strong>BSB:</strong> 123-456</p>
                <p><strong>Account Number:</strong> 789-012-345</p>
                <p><strong>Reference:</strong> Unit number + Owner surname</p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-blue-900 mb-2">Important Dates</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><strong>Quarterly Due:</strong> 15th of March, June, September, December</p>
                  <p><strong>Late Fee:</strong> $50 after 30 days overdue</p>
                  <p><strong>Interest:</strong> 10% p.a. on overdue amounts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
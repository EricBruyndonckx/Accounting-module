import React, { useState } from 'react';
import { FileIcon, FileUpIcon, DollarSignIcon, CreditCardIcon, ArrowRightIcon, ArrowLeftIcon, TrendingUpIcon, TrendingDownIcon, AlertCircleIcon, ChevronLeftIcon, ChevronRightIcon, UploadIcon } from 'lucide-react';
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, PieChart, Pie, Cell, ReferenceLine } from 'recharts';
// Mock data
const financialData = {
  profit: 18827.79,
  income: 129194.57,
  expenses: 110366.78,
  filesPending: 3,
  filesUploaded: 6,
  accountsPayable: 10132.95,
  accountsReceivable: 83878.15,
  year: 2025
};
// Mock data for document uploads with document types
const documentUploadsData = [{
  name: 'Jan',
  purchases: 5,
  sales: 4,
  banking: 3,
  total: 12
}, {
  name: 'Feb',
  purchases: 7,
  sales: 5,
  banking: 3,
  total: 15
}, {
  name: 'Mar',
  purchases: 8,
  sales: 6,
  banking: 4,
  total: 18
}, {
  name: 'Apr',
  purchases: 10,
  sales: 7,
  banking: 5,
  total: 22
}, {
  name: 'May',
  purchases: 8,
  sales: 5,
  banking: 4,
  total: 17
}, {
  name: 'Jun',
  purchases: 6,
  sales: 4,
  banking: 4,
  total: 14
}, {
  name: 'Jul',
  purchases: 9,
  sales: 6,
  banking: 4,
  total: 19
}, {
  name: 'Aug',
  purchases: 11,
  sales: 8,
  banking: 4,
  total: 23
}, {
  name: 'Sep',
  purchases: 7,
  sales: 5,
  banking: 4,
  total: 16
}, {
  name: 'Oct',
  purchases: 5,
  sales: 3,
  banking: 3,
  total: 11
}, {
  name: 'Nov',
  purchases: 4,
  sales: 2,
  banking: 2,
  total: 8
}, {
  name: 'Dec',
  purchases: 6,
  sales: 4,
  banking: 3,
  total: 13
}];
const monthlyData = [{
  name: 'Jan',
  income: 24500,
  expenses: -22500,
  profit: 2000
}, {
  name: 'Feb',
  income: 29000,
  expenses: -23000,
  profit: 6000
}, {
  name: 'Mar',
  income: 35000,
  expenses: -24000,
  profit: 11000
}, {
  name: 'Apr',
  income: 32000,
  expenses: -25000,
  profit: 7000
}, {
  name: 'May',
  income: 2500,
  expenses: -6500,
  profit: -4000
}, {
  name: 'Jun',
  income: 1000,
  expenses: -2000,
  profit: -1000
}, {
  name: 'Jul',
  income: 1500,
  expenses: -1500,
  profit: 0
}, {
  name: 'Aug',
  income: 1800,
  expenses: -1800,
  profit: 0
}, {
  name: 'Sep',
  income: 2000,
  expenses: -2000,
  profit: 0
}, {
  name: 'Oct',
  income: 0,
  expenses: 0,
  profit: 0
}, {
  name: 'Nov',
  income: 0,
  expenses: 0,
  profit: 0
}, {
  name: 'Dec',
  income: 0,
  expenses: 0,
  profit: 0
}];
const expensesBreakdown = [{
  name: 'Operating Expenses',
  value: 66.91,
  color: '#5470FF'
}, {
  name: 'Personnel Expenses',
  value: 22.84,
  color: '#50C878'
}, {
  name: 'Material and Service Expenses',
  value: 5.15,
  color: '#1E90FF'
}, {
  name: 'Non-operating Expenses',
  value: 3.5,
  color: '#FF6347'
}, {
  name: 'Exceptional Expenses',
  value: 1.6,
  color: '#FFD700'
}];
const topVendors = [{
  name: 'Ringler Informatik SA',
  amount: 3459.0,
  percentage: 12.5
}, {
  name: 'Gerber Systems & Networks',
  amount: 2345.7,
  percentage: 8.4
}, {
  name: 'WP Engine',
  amount: 1980.0,
  percentage: 7.1
}, {
  name: 'Wordfence',
  amount: 1490.0,
  percentage: 5.3
}, {
  name: 'Isagency',
  amount: 1200.0,
  percentage: 4.3
}];
const recommendations = [{
  id: 1,
  title: 'Optimisez vos dépenses opérationnelles',
  description: 'Vos dépenses opérationnelles représentent 66.91% de vos dépenses totales. Envisagez de renégocier certains contrats avec vos fournisseurs.',
  impact: 'high'
}, {
  id: 2,
  title: 'Attention à vos comptes clients',
  description: 'Vos comptes clients (83 878,15 CHF) sont élevés. Accélérez le recouvrement pour améliorer votre trésorerie, car cela améliorera votre situation financière.',
  impact: 'medium'
}, {
  id: 3,
  title: 'Préparez-vous pour le Q3',
  description: "Vos résultats du Q2 montrent une baisse. Préparez un plan d'action pour le Q3 pour maintenir votre rentabilité."
}];
const DashboardPage = () => {
  const [viewMode, setViewMode] = useState('year');
  const [currentYear, setCurrentYear] = useState(financialData.year);
  const [documentViewMode, setDocumentViewMode] = useState('year');
  const handlePreviousYear = () => {
    setCurrentYear(currentYear - 1);
  };
  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };
  return <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <UploadIcon size={18} className="mr-2" />
            Upload file
          </button>
        </div>
        {/* Document Uploads Chart - Moved to top */}
        <div className="mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                Documents uploadés
              </h3>
              <div className="flex items-center">
                <div className="border rounded-lg overflow-hidden">
                  <button className={`px-3 py-1 text-sm ${documentViewMode === 'year' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => setDocumentViewMode('year')}>
                    Year
                  </button>
                  <button className={`px-3 py-1 text-sm ${documentViewMode === 'month' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => setDocumentViewMode('month')}>
                    Month
                  </button>
                </div>
              </div>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={documentUploadsData} margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => {
                  const formattedName = {
                    purchases: "Documents d'achat",
                    sales: 'Documents de vente',
                    banking: 'Documents bancaires'
                  }[name] || name;
                  return [`${value} documents`, formattedName];
                }} />
                  <Legend />
                  <Bar dataKey="purchases" name="Documents d'achat" stackId="a" fill="#6366F1" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="sales" name="Documents de vente" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="banking" name="Documents bancaires" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                  <ReferenceLine y={20} label="Forfait (20)" stroke="#FF0000" strokeDasharray="3 3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-gray-500 text-center">
              Votre forfait inclut 20 documents par mois. Les documents au-delà
              de cette limite seront facturés séparément.
            </div>
          </div>
        </div>
        {/* Accounts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Accounts receivable
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Year to date</p>
                <p className="text-xl font-bold text-green-500">
                  {financialData.accountsReceivable.toLocaleString('fr-CH')} CHF
                </p>
              </div>
              <div className="rounded-full p-3 bg-green-100">
                <ArrowRightIcon size={24} className="text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Accounts payable
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Year to date</p>
                <p className="text-xl font-bold text-red-500">
                  -{financialData.accountsPayable.toLocaleString('fr-CH')} CHF
                </p>
              </div>
              <div className="rounded-full p-3 bg-red-100">
                <ArrowLeftIcon size={24} className="text-red-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Profit year to date
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Year to date</p>
                <p className="text-xl font-bold">
                  {financialData.profit.toLocaleString('fr-CH')} CHF
                </p>
              </div>
              <div className="rounded-full p-3 bg-blue-100">
                <DollarSignIcon size={24} className="text-blue-500" />
              </div>
            </div>
          </div>
        </div>
        {/* Main Financial Overview */}
        <div className="mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-6">
                <div>
                  <h3 className="text-gray-600">Income</h3>
                  <p className="text-xl font-bold">
                    {financialData.income.toLocaleString('fr-CH')} CHF
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-600">Expenses</h3>
                  <p className="text-xl font-bold text-red-500">
                    -{financialData.expenses.toLocaleString('fr-CH')} CHF
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-600">Profit</h3>
                  <p className="text-xl font-bold">
                    {financialData.profit.toLocaleString('fr-CH')} CHF
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={handlePreviousYear} className="p-1 text-gray-500 hover:text-gray-800">
                  <ChevronLeftIcon size={20} />
                </button>
                <span className="mx-2">{currentYear}</span>
                <button onClick={handleNextYear} className="p-1 text-gray-500 hover:text-gray-800">
                  <ChevronRightIcon size={20} />
                </button>
                <div className="ml-4 border rounded-lg overflow-hidden">
                  <button className={`px-3 py-1 text-sm ${viewMode === 'year' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => setViewMode('year')}>
                    Year
                  </button>
                  <button className={`px-3 py-1 text-sm ${viewMode === 'month' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => setViewMode('month')}>
                    Month
                  </button>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData} margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={value => `${Math.abs(value).toLocaleString('fr-CH')} CHF`} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#312E81" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="profit" name="Profit" stroke="#000000" dot={{
                  r: 4
                }} activeDot={{
                  r: 6
                }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Expenses Breakdown and Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Expenses Breakdown */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Expenses by detail
            </h3>
            <div className="flex">
              <div className="h-60 w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expensesBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius * 1.1;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return <text x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fill="#888" fontSize={10}>
                            {`${value}%`}
                          </text>;
                  }}>
                      {expensesBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={value => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2">
                <ul className="space-y-2">
                  {expensesBreakdown.map((item, index) => <li key={index} className="flex items-center">
                      <span className="w-3 h-3 rounded-sm mr-2" style={{
                    backgroundColor: item.color
                  }}></span>
                      <span className="text-sm text-gray-600">
                        {item.name} ({item.value}%)
                      </span>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
          {/* Recommendations */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Recommandations
            </h3>
            <div className="space-y-4">
              {recommendations.map(rec => <div key={rec.id} className="border-l-4 pl-3 py-1" style={{
              borderColor: rec.impact === 'high' ? '#EF4444' : rec.impact === 'medium' ? '#F59E0B' : '#10B981'
            }}>
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>)}
            </div>
          </div>
        </div>
        {/* Top Vendors */}
        <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Top Vendors
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % of Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topVendors.map((vendor, index) => <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {vendor.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {vendor.amount.toLocaleString('fr-CH')} CHF
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {vendor.percentage}%
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {index % 2 === 0 ? <TrendingUpIcon size={18} className="text-green-500" /> : <TrendingDownIcon size={18} className="text-red-500" />}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        {/* Cash Flow Forecast */}
        <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">
              Cash Flow Forecast
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></span>
                <span className="text-xs text-gray-600">Inflow</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-sm mr-1"></span>
                <span className="text-xs text-gray-600">Outflow</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-sm mr-1"></span>
                <span className="text-xs text-gray-600">Net</span>
              </div>
            </div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData.slice(0, 6)} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={value => `${Math.abs(value).toLocaleString('fr-CH')} CHF`} />
                <Legend />
                <Bar dataKey="income" name="Inflow" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey={data => Math.abs(data.expenses)} name="Outflow" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="profit" name="Net" stroke="#10B981" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>;
};
const KpiCard = ({
  title,
  value,
  icon,
  bgColor
}) => {
  return <div className={`${bgColor} rounded-lg p-5 shadow-sm`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-600">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>;
};
export default DashboardPage;
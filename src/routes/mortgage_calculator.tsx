import { useState, useEffect } from "react";
import { Calculator, Home, Calendar, User } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mortgage_calculator")({
  component: MortgageCalculator,
});

function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(3.0);
  const [monthlyAmortization, setMonthlyAmortization] = useState(10000);
  const [birthYear, setBirthYear] = useState(1990);
  const [birthMonth, setBirthMonth] = useState(1);
  const [results, setResults] = useState([]);

  const calculateLoanPayoff = (principal, rate, amortization) => {
    if (amortization <= 0) return null;

    const monthlyRate = rate / 100 / 12;

    let balance = principal;
    let months = 0;
    let totalInterest = 0;
    let totalPayment = 0;

    while (balance > 0 && months < 600) {
      // Max 50 år
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(amortization, balance);
      const monthlyTotal = interestPayment + principalPayment;

      balance -= principalPayment;
      totalInterest += interestPayment;
      totalPayment += monthlyTotal;
      months++;
    }

    if (months >= 600) {
      return { error: "Lånet tar mer än 50 år att betala av" };
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);

    // Beräkna ålder vid avbetalning
    const ageAtPayoff =
      payoffDate.getFullYear() -
      birthYear +
      (payoffDate.getMonth() + 1 >= birthMonth ? 0 : -1);

    // Beräkna genomsnittlig månadsränta och total månadsbetaling
    const avgMonthlyInterest = totalInterest / months;
    const avgMonthlyPayment = amortization + avgMonthlyInterest;
    const initialMonthlyInterest = principal * monthlyRate;
    const initialTotalPayment = amortization + initialMonthlyInterest;

    return {
      months,
      years: Math.floor(months / 12),
      remainingMonths: months % 12,
      payoffDate,
      totalInterest,
      totalPaid: principal + totalInterest,
      ageAtPayoff,
      amortization,
      avgMonthlyInterest,
      avgMonthlyPayment,
      initialMonthlyInterest,
      initialTotalPayment,
    };
  };

  useEffect(() => {
    const amortizations = [5000, 8000, 10000, 15000, 20000];
    const newResults = amortizations.map((amortization) => {
      const result = calculateLoanPayoff(
        loanAmount,
        interestRate,
        amortization
      );
      return { amortization, ...result };
    });
    setResults(newResults);
  }, [loanAmount, interestRate, birthYear, birthMonth]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
    });
  };

  const customResult = calculateLoanPayoff(
    loanAmount,
    interestRate,
    monthlyAmortization
  );

  return (
    <div className="mx-auto min-h-screen max-w-6xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="rounded-xl bg-white p-8 shadow-xl">
        <div className="mb-8 flex items-center">
          <Home className="mr-3 text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Bolånekalkylator</h1>
        </div>

        <div className="mb-8 grid gap-8 md:grid-cols-2">
          {/* Inställningar */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 flex items-center text-xl font-semibold">
              <Calculator className="mr-2" size={20} />
              Låneuppgifter
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Lånebelopp (SEK)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Ränta (% per år)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Månatlig amortering (SEK)
                </label>
                <input
                  type="number"
                  value={monthlyAmortization}
                  onChange={(e) =>
                    setMonthlyAmortization(Number(e.target.value))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Endast amortering - ränta läggs till automatiskt
                </p>
              </div>
            </div>
          </div>

          {/* Personuppgifter */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 flex items-center text-xl font-semibold">
              <User className="mr-2" size={20} />
              Personuppgifter
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Födelseår
                </label>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Födelsemånad
                </label>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2000, i).toLocaleDateString("sv-SE", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <div className="text-sm text-gray-600">
                  <p>
                    Din nuvarande ålder: {new Date().getFullYear() - birthYear}{" "}
                    år
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Din anpassade amortering */}
        {customResult && !customResult.error && (
          <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-blue-800">
              <Calculator className="mr-2" size={20} />
              Din amortering: {formatCurrency(monthlyAmortization)}/månad
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white p-4">
                <h4 className="mb-3 font-medium text-blue-700">
                  Månadsbetalning
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Amortering:</span>
                    <span className="font-medium">
                      {formatCurrency(customResult.amortization)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ränta första månad:</span>
                    <span className="font-medium">
                      {formatCurrency(customResult.initialMonthlyInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Total första månad:</span>
                    <span className="font-bold text-blue-900">
                      {formatCurrency(customResult.initialTotalPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Snitt månadsränta:</span>
                    <span>
                      {formatCurrency(customResult.avgMonthlyInterest)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4">
                <h4 className="mb-3 font-medium text-blue-700">
                  Sammanfattning
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Avbetald:</span>
                    <span className="font-medium">
                      {formatDate(customResult.payoffDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tid kvar:</span>
                    <span className="font-medium">
                      {customResult.years} år, {customResult.remainingMonths}{" "}
                      mån
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Din ålder då:</span>
                    <span className="font-medium">
                      {customResult.ageAtPayoff} år
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Total ränta:</span>
                    <span className="font-bold text-red-600">
                      {formatCurrency(customResult.totalInterest)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {customResult && customResult.error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-800">{customResult.error}</p>
          </div>
        )}

        {/* Jämförelsetabell */}
        <div className="bg-white">
          <h2 className="mb-6 flex items-center text-2xl font-semibold">
            <Calendar className="mr-3" size={24} />
            Jämförelse av olika månadsbetalningar
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Månatlig amortering
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Första mån total
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Tid att betala av
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Klar månad/år
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Din ålder då
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Total ränta
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-3 font-medium">
                      {formatCurrency(result.amortization)}
                    </td>
                    {result.error ? (
                      <td
                        colSpan="5"
                        className="border border-gray-300 px-4 py-3 text-red-600"
                      >
                        {result.error}
                      </td>
                    ) : (
                      <>
                        <td className="border border-gray-300 px-4 py-3">
                          <div>
                            {formatCurrency(result.initialTotalPayment)}
                          </div>
                          <div className="text-xs text-gray-500">
                            ({formatCurrency(result.amortization)} +{" "}
                            {formatCurrency(result.initialMonthlyInterest)})
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {result.years} år, {result.remainingMonths} månader
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {formatDate(result.payoffDate)}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 font-medium">
                          {result.ageAtPayoff} år
                        </td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-red-600">
                          {formatCurrency(result.totalInterest)}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-yellow-50 p-4 text-sm text-gray-600">
          <p className="mb-2 font-medium">💡 Tips:</p>
          <ul className="space-y-1">
            <li>• Ju högre amortering, desto mindre ränta betalar du totalt</li>
            <li>
              • Med 3% ränta betalar du cirka{" "}
              {formatCurrency((loanAmount * interestRate) / 100 / 12)} i
              månadsränta första månaden
            </li>
            <li>
              • Räntan minskar varje månad eftersom låneskulden blir mindre
            </li>
            <li>
              • Denna kalkylator använder fast ränta - verkliga lån kan ha
              rörlig ränta
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

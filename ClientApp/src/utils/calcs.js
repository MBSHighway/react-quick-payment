export const calculateMonthlyPayment = (amount, term, rate, paymentsPerYear) => {
    var totalMonths = term * paymentsPerYear;
    var monthlyRate = rate / 100 / paymentsPerYear;
    return (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)) || 0;
}

export const createAmoritizationArray = (amount, term, rate, paymentsPerYear = 12) => {
    const totalMonths = term * paymentsPerYear;
    const monthlyRate = (rate / 100) / paymentsPerYear;
    const monthlyPayment = calculateMonthlyPayment(amount, term, rate, paymentsPerYear);
    let amorArray = [];
    let currentBalance = amount;
    for (var i = 0; i < totalMonths; i++) {
        const interest = currentBalance * monthlyRate;
        const principal = monthlyPayment - interest;
        currentBalance = currentBalance - principal;
        const obj = {
            payment: principal + interest,
            principal: principal,
            interest: interest,
            balance: currentBalance,
        };
        amorArray.push(obj);
    }
    return amorArray;
}
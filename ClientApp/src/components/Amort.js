import React, { Component } from 'react';
import '../front.css'
import LoanCard from './LoanCard';

export default class Amort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentID :123,
            currentCount: 0,
            term: 30,
            loanAmount: 300000,
            baseRate: 4.25
        };
    }

    componentDidMount() {

    }

    dataChange = (e) => {
        console.log(e.target.value);
        let val = e.target.value;
        let key = e.target.name;
        this.setState({ [key]: val })
    }

    startCalc = () => {
        let { loanAmount, baseRate, term } = this.state;
        let data = this.amortLoan(loanAmount, baseRate, term);
        console.log(data)
        this.setState({ amortData: data.amort });
    }

    amortLoan = (amt, rate, term, optPrinPay, lumpObj, payPerYer, payReturn, numPayStart, total) => {
        optPrinPay = optPrinPay || { amt: 0, start: 1 };
        lumpObj = lumpObj || { amt: 0, start: 1 };
        payPerYer = payPerYer || 12;
        payReturn = payReturn || term;
        numPayStart = numPayStart || 1;
        total = total || 0;
        var full = [];
        var remain = Number(amt);
        var numPay = payPerYer * Number(term);
        var returnNow = (payPerYer * Number(payReturn)) - 1;
        var perRate = (rate / 100 / payPerYer);
        var payNum = numPayStart;
        var initAmt = remain;
        var payment = Number(((initAmt * perRate) / (1 - Math.pow((1 + perRate), -numPay))));
        var lOpt = 0;
        var lLump = 0;
        for (var i = 0; i < numPay; i++) {
            var int = remain * perRate;
            var prin = (payment - int);

            lOpt = (payNum >= optPrinPay.start) ? optPrinPay.amt : 0;
            lLump = (payNum == lumpObj.start) ? lumpObj.amt : 0;

            prin = prin + lOpt + lLump;
            total += prin + int;
            remain -= prin;

            var yrObj = {
                principal: prin,
                interest: int,
                payment: payment,//Math.round(prin) + Math.round(int),
                total: total,
                balance: remain,
                num: payNum
            };
            full.push(yrObj);
            payNum++;
            if (i == returnNow || remain <= 0) {
                if (remain < 0) {
                    full[full.length - 1].balance = 0;
                }
                break;
            }
        }
        var returnObj = {
            amort: full,
            details: [{
                amount: amt,
                rate: rate,
                term: term,
                apr: (this.calcAPR(amt, numPay, payment, 0, rate)).toFixed(3),
            }]
        };
        return returnObj;
    }

    findInterestRate = (amount, payment, numPay) => {
        //David Cantrell method of finding interest rate   
        var log1 = Math.log(1 + (1 / numPay));
        var log2 = Math.log(2);
        var finalLog = (log1 / log2);
        var nextStep = Math.pow((1 + (payment / amount)), (1 / finalLog));
        var thirdStep = Math.pow(nextStep - 1, finalLog);
        var final = 1200 * (thirdStep - 1);
        return final;
    }

    calcAPR = (loanAmount, numPay, payment, costs, origRate) => {
        var stockFees = 2000;
        var finalCosts = stockFees + costs;
        var finalAmount = loanAmount - finalCosts;
        var apr = this.findInterestRate(finalAmount, payment, numPay);
        return apr;
    }

    render() {
        return (
            <div>
                <LoanCard
                    term={this.state.term}
                    loanAmount={this.state.loanAmount}
                    baseRate={this.state.baseRate}
                    onChange={this.dataChange}
                >
                </LoanCard>
                <div>
                    <button onClick={this.startCalc}>Calc</button>
                    <button onClick={this.resetCalc}>Restart</button>
                </div>
                {this.state.amortData ?
                    <div className="dashboardCard" style={{width: "50%"}}>
                        <table className="altTable fullWidth">
                            <tr><th>Payment #</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Balance</th></tr>
                            {this.state.amortData.map((data) => {
                                return (
                                    <tr>
                                        <td>{data.num}</td>
                                        <td>{Math.round(data.payment)}</td>
                                        <td>{Math.round(data.interest)}</td>
                                        <td>{Math.round(data.principal)}</td>
                                        <td>{Math.round(data.balance)}</td></tr>
                                    )
                            })}
                        </table>
                    </div>
                    : null}
                <div style={{ float: 'right' }}>
                    State:
                    {JSON.stringify(this.state)}
                </div>
            </div>
        );
    }
}

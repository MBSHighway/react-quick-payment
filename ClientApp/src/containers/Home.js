import React from 'react';
import PaymentCard from '../components/PaymentCard';
import MonthAmortCard from '../components/MonthAmortCard';
import { createAmoritizationArray } from '../utils/calcs';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loanAmt: 200000,
            term: 30,
            rate: 4.25,
            type: 'Fixed',
            showTable: false
        }

        this.onLoanAmtChange = this.onLoanAmtChange.bind(this);
        this.onTermChange = this.onRateChange.bind(this);
        this.onRateChange = this.onRateChange.bind(this);
        this.showAmortTable = this.showAmortTable.bind(this);
    }

    onLoanAmtChange(e) {
        const val = e.target.value;
        this.setState({ loanAmt: val })
    }

    onTermChange(e) {
        const val = e.target.value;
        this.setState({ term: val })
    }

    onRateChange(e) {
        const val = e.target.value;
        this.setState({ rate: val })
    }

    showAmortTable() {
        this.setState({ showTable: true });
    }

    buildAmortArray() {
        let { loanAmt, term, rate } = this.state;

        if (loanAmt === '') {
            loanAmt = 0;
        } else if (term === '') {
            term = 0;
        } else if (rate === '') {
            rate = 0;
        }

        return createAmoritizationArray(loanAmt, term, rate, 12);
    }

    render() {
        const { loanAmt, term, type, rate } = this.state;
        const amortArray = this.buildAmortArray();
        return (
            <div className='payment-container'>
                <PaymentCard
                    loanAmt={loanAmt}
                    term={term}
                    type={type}
                    rate={rate}
                    onLoanAmtChange={this.onLoanAmtChange}
                    onTermChange={this.onTermChange}
                    onRateChange={this.onRateChange}
                    onTypeChange={this.onTypeChange}
                    onCalculate={this.showAmortTable}
                />
                {this.state.showTable ?
                    <MonthAmortCard
                        amortArray={amortArray}
                    /> : null
                }
            </div>
        )
    }
}

export default Home;
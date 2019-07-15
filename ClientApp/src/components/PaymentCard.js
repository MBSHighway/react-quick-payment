import React from 'react';

class PaymentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {
            loanAmt,
            term,
            rate,
            onLoanAmtChange,
            onRateChange,
            onTermChange,
            onCalculate
        } = this.props;
        return (
            <div className="paymentCard">
                <div className="dashboardCard">
                    <div className="spacer">
                        <div className="col-md-6 col-md-offset-1">
                            <label>Loan Amount<span className="hidden-sm hidden-xs">:</span></label>
                        </div>
                        <div className="col-md-4 smallDownSpacer">
                            <div className="input-group">
                                <span className="input-group-addon">$</span>
                                <input type="number" className="globalFieldNumber form-control" value={loanAmt} onChange={onLoanAmtChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="col-md-6 col-md-offset-1">
                            <label>Term<span className="hidden-sm hidden-xs">:</span></label>
                        </div>
                    <div className="col-md-4 smallDownSpacer">
                        <div className="input-group">
                                <input type="number" className="globalFieldNumber form-control" value={term} onChange={onTermChange}></input>
                                <span className="input-group-addon">Yrs</span>
                            </div>
                        </div>
                    </div>
                <div className="shortDownSpacer">
                    <div className="col-md-6 col-md-offset-1">
                        <label>Rate<span className="hidden-sm hidden-xs">:</span></label>
                    </div>
                    <div className="col-md-4 smallDownSpacer">
                        <div className="input-group">
                                <input type="number" className="globalFieldNumber form-control" value={rate} onChange={onRateChange}></input>
                                <span className="input-group-addon">%</span>
                            </div>
                        </div>
                    </div>
                 
                </div>
                <div className="shortDownSpacer">
                    <button type="button" onClick={onCalculate}>Calculate</button>
                </div>
            </div >
        )
    }
}

export default PaymentCard;
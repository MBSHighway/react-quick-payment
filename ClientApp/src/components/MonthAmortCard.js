import React from 'react';

class MonthAmortCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { amortArray } = this.props;
        return (
            <div className='amortCard'>
                <h2 className="text-center">Monthly Schedule</h2>
                <div id="monthlySchedule">
                    <table className='altTable fullWidth'>
                        <tbody>
                            <tr class="text-center">
                                <th class="text-center">Month</th>
                                <th class="text-center">Payment</th>
                                <th class="text-center">Interest</th>
                                <th class="text-center">Principal</th>
                                <th class="text-center">Balance</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {amortArray.map((item, index) => {
                                return (
                                    <tr key={index} class="text-center">
                                        <th class="text-center">{index + 1}</th>
                                        <th class="text-center">{Math.round(item.payment)}</th>
                                        <th class="text-center">{Math.round(item.interest)}</th>
                                        <th class="text-center">{Math.round(item.principal)}</th>
                                        <th class="text-center">{Math.round(item.balance)}</th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            
        )
    }
}

export default MonthAmortCard;
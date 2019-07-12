import React from 'react';

const LoanCard = (props) => {

    let style = {
        display: "block",
        marginBottom: "20px",
        padding: "5px",
        borderRadius: "5px"
    }
    return (
        <div>
            <h5>Loan Info</h5>
            <input type="number" name="loanAmount" onChange={props.onChange} style={style} value={props.loanAmount}/>
            <input type="number" name="term" onChange={props.onChange} style={style} value={props.term}/>
            <input type="number" name="baseRate" onChange={props.onChange} style={style} value={props.baseRate}/>
        </div>
    );
}


export default LoanCard;
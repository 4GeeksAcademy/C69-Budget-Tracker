import React from "react";
import CountUp from "react-countup";

export default function AnimatedCounter({ amount }) {
    const formatValue = (value) => {
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
        }).format(value);
    };

    return (
        <CountUp 
            start={0}
            end={amount}
            duration={2.5}
            decimals={2}
            decimal="."
            prefix="$"
            separator=","
            formattingFn={formatValue}
        />
    );
}
import React, { useState, useEffect, useCallback } from "react";

interface Props {
  balGBP: number;
}

const Balances: React.FC<Props> = (props) => {
  const [balConv, setBalConv] = useState<number>(0);
  const [isLoading, setisLoading] = useState(false);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [curr, setCurr] = useState("USD");
  const { balGBP } = props;

  const convert: (curr: string) => void = useCallback(
    (curr) => {
      setisLoading(true);
      fetch("https://api.exchangeratesapi.io/latest?base=GBP")
        .then((response) => response.json())
        .then((data) => {
          const rate: number = data.rates[curr];
          setBalConv(+(rate * balGBP).toFixed(2));
          setisLoading(false);
        });
    },
    [balGBP]
  );

  useEffect(() => {
    convert(curr);
  }, [balGBP, curr, convert]);

  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest?base=GBP")
      .then((response) => response.json())
      .then((data) => setCurrencies(Object.keys(data.rates).sort()));
  }, []);

  return (
    <>
      <p>
        <b>Balance in GBP:</b> £{balGBP.toFixed(2)}
      </p>

      <select
        id="currency"
        name="currency"
        onChange={(event) => setCurr(event.target.value)}
      >
        <option value="USD">USD</option>
        {currencies.map((curr) => {
          return (
            <option key={curr} value={curr}>
              {curr}
            </option>
          );
        })}
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          <b>Balance Conversion:</b> {`${balConv.toFixed(2)} ${curr}`}
        </p>
      )}
    </>
  );
};

export default Balances;

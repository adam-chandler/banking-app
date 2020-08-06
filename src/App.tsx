import React, { useState, useEffect } from "react";
import Balances from "./Components/Balances";
import TransactionList from "./Components/TransactionList";
import TransactionForm from "./Components/TransactionForm";
import "./App.css";

export interface transaction {
  amount: number;
  add: boolean;
  date: Date;
  note?: string;
}

function App() {
  const [balGBP, setBalGBP] = useState(0);
  const [transactions, setTransactions] = useState<transaction[]>([]);

  useEffect(() => {
    if (localStorage.balGBP) {
      setBalGBP(JSON.parse(localStorage.balGBP));
    }
    if (localStorage.transactions) {
      setTransactions(JSON.parse(localStorage.transactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("balGBP", JSON.stringify(balGBP));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balGBP, transactions]);

  return (
    <div className="App">
      <h1>Banking App</h1>
      <Balances balGBP={balGBP} />
      <TransactionList transactions={transactions} />
      <TransactionForm
        setBalGBP={setBalGBP}
        balGBP={balGBP}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default App;

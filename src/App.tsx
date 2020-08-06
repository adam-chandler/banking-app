import React, { useState } from "react";
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

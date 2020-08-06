import React, { useState } from "react";
import { transaction } from "../App";
import styled from "styled-components";

interface Props {
  setBalGBP: React.Dispatch<React.SetStateAction<number>>;
  setTransactions: React.Dispatch<React.SetStateAction<transaction[]>>;
  balGBP: number;
}

interface ButtonProps {
  color: string;
}

const Button = styled.button`
  width: 180px;
  margin: 10px;
  font-weight: 700;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  text-transform: uppercase;
  background-color: ${(props: ButtonProps) => props.color};
`;

const Input = styled.input`
  width: 160px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

const TransactionForm: React.FC<Props> = (props) => {
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState<string>("");

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    add: boolean
  ) => {
    event.preventDefault();
    if (amount <= 0) {
      alert("Amount needs to be more than £0.00");
      setAmount("");
      return;
    }
    if (add) {
      props.setBalGBP((prevBal) => prevBal + +amount);
    } else {
      if (props.balGBP - +amount < 0) {
        alert("You can't withdraw more than current funds");
        return;
      }
      props.setBalGBP((prevBal) => prevBal - +amount);
    }
    props.setTransactions((prevTrans) => [
      ...prevTrans,
      { amount: +amount, note, add, date: new Date() },
    ]);
    setNote("");
    setAmount("");
  };

  return (
    <>
      <form>
        £
        <Input
          type="number"
          placeholder="Enter an Amount"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) => {
            setAmount(Math.abs(+event.target.value));
          }}
        />
        <Input
          type="text"
          placeholder="Add Note"
          maxLength={12}
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
          }}
        />
        <div>
          <Button color="#2ecc71" onClick={(event) => handleClick(event, true)}>
            Add
          </Button>
          <Button
            color="#c0392b"
            onClick={(event) => handleClick(event, false)}
          >
            Withdraw
          </Button>
        </div>
      </form>
    </>
  );
};

export default TransactionForm;

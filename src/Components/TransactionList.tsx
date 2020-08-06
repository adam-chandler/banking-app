import React from "react";
import styled from "styled-components";
import { transaction } from "../App";
import dayjs from "dayjs";

interface Props {
  transactions: transaction[];
}

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px grey solid;
  margin: auto;
  margin-bottom: 30px;
  width: 440px;
  text-align: left;
`;

interface TransactionProps {
  odd: boolean;
}

const Transaction = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  width: 400px;
  border: 1px grey solid;
  border-bottom: 0px;
  background-color: ${(props: TransactionProps) =>
    props.odd ? "#ecf0f1" : "white"};
`;

interface AmountProps {
  highlight: boolean;
}

const Amount = styled.p`
  color: ${(props: AmountProps) => (props.highlight ? "red" : "black")};
  font-weight: 700;
`;

const TransactionList: React.FC<Props> = (props) => {
  return (
    <TransactionsContainer>
      {props.transactions.map((transaction, i) => {
        return (
          <Transaction odd={i % 2 === 0} key={`${i} ${transaction.amount}`}>
            <Amount highlight={!transaction.add}>
              {transaction.add ? null : "-"}£{transaction.amount.toFixed(2)}
            </Amount>
            <p>{transaction.note}</p>
            <p>{dayjs(transaction.date).format("DD-MM-YY HH:mm")}</p>
          </Transaction>
        );
      })}
    </TransactionsContainer>
  );
};

export default TransactionList;

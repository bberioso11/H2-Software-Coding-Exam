import React, { useEffect, useState } from "react";

const Table = ({ answers }) => {
  const totalA = answers.filter((data) => data.answer === "a").length;
  const totalB = answers.filter((data) => data.answer === "b").length;
  const totalC = answers.filter((data) => data.answer === "c").length;
  const [result, setResult] = useState("");
  const highestCount = Math.max(totalA, totalB, totalC);
  const findVariable = [totalA, totalB, totalC].filter(
    (variable) => variable === highestCount
  );
  console.log(findVariable.length >= 2);

  useEffect(() => {
    if (findVariable.length >= 2 || highestCount === totalB) {
      setResult(`Self-Awareness You are conscious of your own character, feelings, motives, and desires.
        The process can be painful but it leads to greater self-awareness.`);
    } else if (highestCount === totalA) {
      setResult(`Empathy You are emphatic. You see yourself in someone else’s situation before doing
        decisions. You tend to listen to other’s voices.`);
    } else if (highestCount === totalC) {
      setResult(`Self-Management You manage yourself well; You take responsibility for your own behavior
        and well-being.`);
    }
  }, []);

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Question #</th>
            <th scope="col">Answer</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((data, index) => (
            <tr key={index}>
              <th scope="row">{data.questionNumber}</th>
              <td>{data.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col">
          <p className="mb-0">Count(a): {totalA}</p>
          <p className="mb-0">Count(b): {totalB}</p>
          <p className="mb-0">Count(c): {totalC}</p>
          <p className="mb-1">Total Answer: {answers.length}</p>
          <h4>Result: </h4>
          <p>{result}</p>
        </div>
      </div>
    </>
  );
};

export default Table;

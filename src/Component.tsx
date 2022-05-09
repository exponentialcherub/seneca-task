import React, { FunctionComponent, useState } from "react";
import Switch from "./Switch";
import rgbHex from "rgb-hex";

export type Props = {
  question: string;
  answers: AnswerPair[];
};

export type AnswerPair = {
  correct: string;
  wrong: string;
  wrongFirst: boolean;
};

const Component: FunctionComponent<Props> = ({ question, answers }) => {
  const [numberCorrect, setNumberCorrect] = useState(
    answers.filter((x) => !x.wrongFirst).length
  );

  const allCorrect = numberCorrect === answers.length;

  const onToggle = (answer: string) => {
    if (answers.map((x) => x.correct).includes(answer)) {
      setNumberCorrect(numberCorrect + 1);
    } else {
      setNumberCorrect(numberCorrect - 1);
    }
  };

  const factor = numberCorrect / answers.length;
  const colour = [250, 150 + 105 * factor, 0];
  const correctColour = [10, 190, 255];
  const finalColour = allCorrect ? correctColour : colour;

  return (
    <div
      style={{
        backgroundColor: `#${rgbHex(
          finalColour[0],
          finalColour[1],
          finalColour[2]
        )}`
      }}
    >
      <h1>{question}</h1>
      <div className="inputsContainer">
        {answers.map((x) => (
          <Switch
            left={x.wrongFirst ? x.wrong : x.correct}
            right={x.wrongFirst ? x.correct : x.wrong}
            onToggle={onToggle}
            lock={allCorrect}
          />
        ))}
      </div>
      <h3>
        {allCorrect ? "The answer is correct" : "The answer is incorrect"}
      </h3>
    </div>
  );
};

export default Component;

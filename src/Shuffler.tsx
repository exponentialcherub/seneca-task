import { shuffle, getRandomInt } from "./utilities";
import React, { FunctionComponent } from "react";
import ToggleQuestion, { Props, AnswerPair } from "./ToggleQuestion";

type ShufflerProps = {
  question: string;
  correctAnswers: string[];
  wrongAnswers: string[];
  InputComponent: FunctionComponent<Props>;
};

const Shuffler: FunctionComponent<ShufflerProps> = ({
  question,
  correctAnswers,
  wrongAnswers,
  InputComponent = ToggleQuestion
}) => {
  const shuffledCorrectAnswers = shuffle(correctAnswers);
  const shuffledWrongAnswers = shuffle(wrongAnswers);

  const getAnswerPair = (wrongAnswer, correctAnswer): AnswerPair => {
    const wrongAnswerFirst = getRandomInt(100) > 50;

    return {
      wrong: wrongAnswer,
      correct: correctAnswer,
      wrongFirst: wrongAnswerFirst
    };
  };

  const getAnswerPairs = () => {
    const answerPairs = shuffledCorrectAnswers.map((x, i) =>
      getAnswerPair(shuffledWrongAnswers[i], x)
    );

    if (answerPairs.every((x) => !x.wrongFirst)) {
      // Try again if all will start correct.
      return getAnswerPairs();
    }

    return answerPairs;
  };

  return <InputComponent question={question} answers={getAnswerPairs()} />;
};

export default Shuffler;

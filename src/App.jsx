import { useState, useEffect } from "react";
import Table from "./components/Table";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const data = [
    {
      id: 1,
      question: `You went to a party last night and when you
    arrived to school the next day, everybody is
    talking about something you didn’t do. What
    will you do?`,
      choices: [
        {
          placement: "a",
          text: `Avoid everything and go
      with your friends`,
        },
        {
          placement: "b",
          text: `Go and talk with the
          person that started the
          rumors`,
        },
        {
          placement: "c",
          text: `Go and talk with the
          teacher`,
        },
      ],
    },
    {
      id: 2,
      question: `What quality do you excel the most?`,
      choices: [
        {
          placement: "a",
          text: `Empathy`,
        },
        {
          placement: "b",
          text: `Curiosity`,
        },
        {
          placement: "c",
          text: `Perseverance`,
        },
      ],
    },
    {
      id: 3,
      question: `You are walking down the street when you see
      an old lady trying to cross, what will you do?`,
      choices: [
        {
          placement: "a",
          text: `Go and help her`,
        },
        {
          placement: "b",
          text: `Go for a policeman and
          ask him to help`,
        },
        {
          placement: "c",
          text: `Keep walking ahead`,
        },
      ],
    },
    {
      id: 4,
      question: `You had a very difficult day at school, you will
      maintain a ____ attitude`,
      choices: [
        {
          placement: "a",
          text: `Depends on the situation`,
        },
        {
          placement: "b",
          text: `Positive`,
        },
        {
          placement: "c",
          text: `Negative`,
        },
      ],
    },
    {
      id: 5,
      question: `You are at a party and a friend of yours comes
      over and offers you a drink, what do you do?`,
      choices: [
        {
          placement: "a",
          text: `Say no thanks`,
        },
        {
          placement: "b",
          text: `Drink it until it is finished`,
        },
        {
          placement: "c",
          text: `Ignore him and get angry at

          him`,
        },
      ],
    },
    {
      id: 6,
      question: `You just started in a new school, you will...`,
      choices: [
        {
          placement: "a",
          text: `Go and talk with the
          person next to you`,
        },
        {
          placement: "b",
          text: `Wait until someone
          comes over you`,
        },
        {
          placement: "c",
          text: `Not talk to anyone`,
        },
      ],
    },
    {
      id: 7,
      question: `In a typical Friday, you would like to..`,
      choices: [
        {
          placement: "a",
          text: `Go out with your close
          friends to eat`,
        },
        {
          placement: "b",
          text: `Go to a social club and
          meet more people`,
        },
        {
          placement: "c",
          text: `Invite one of your friends to
          your house`,
        },
      ],
    },
    {
      id: 8,
      question: `Your relationship with your parents is..`,
      choices: [
        {
          placement: "a",
          text: `I like both equally`,
        },
        {
          placement: "b",
          text: `I like both equally`,
        },
        {
          placement: "c",
          text: `I like my Mom the most`,
        },
      ],
    },
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledData, setShuffledData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [totalAnswer, setTotalAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setChecked] = useState(false);

  const nextQuestion = (event) => {
    event.preventDefault();

    setCurrentQuestionIndex((prev) => prev + 1);
    setTotalAnswer(() => [
      ...totalAnswer,
      { questionNumber: currentQuestionIndex + 1, answer: answer },
    ]);
    document.getElementsByName("choices").forEach((radio) => {
      radio.checked = false;
    });
    setChecked(false);
  };

  useEffect(() => {
    setShuffledData(shuffleArray(data));
    setIsLoading(() => false);
  }, []);

  const isFinish = currentQuestionIndex > shuffledData.length - 1;

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        <div className="row justify-content-center">
          <div className="col-12 rounded border p-3">
            {isFinish ? (
              <Table answers={totalAnswer} />
            ) : (
              <form>
                {isLoading ? null : (
                  <>
                    <div className="questions">
                      <div className="">
                        <p>
                          {currentQuestionIndex + 1}.{" "}
                          {shuffledData[currentQuestionIndex].question}
                        </p>
                      </div>
                      <div className="choices">
                        {shuffledData[currentQuestionIndex].choices.map(
                          (choice, index) => (
                            <div className="form-check" key={index}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="choices"
                                id={index}
                                onChange={() => (
                                  setAnswer(choice.placement), setChecked(true)
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={index}>
                                {choice.placement}. {choice.text}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="button mt-3 ms-4">
                  <button
                    className="btn btn-primary"
                    disabled={!isChecked}
                    onClick={nextQuestion}>
                    {isFinish ? "Finish" : "Next"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import CloseIcon from "../components/CloseIcon";
import useAppState from "../hooks/useAppState";
import useSession from "../hooks/useSession";

import styles from "./SurveyResultPage.scss";

function SurveyResultPage() {
  const [animate, setAnimate] = useState(false);
  const appState = useAppState();
  const navigate = useNavigate();
  const { logout } = useSession();

  const survey = appState?.data;
  const didAnswer = survey?.didAnswer;

  const toSurveyList = () => navigate("/surveys");

  useEffect(() => {
    if (didAnswer) {
      setAnimate(true);
    }
  }, []);

  useEffect(() => {
    if (appState.isError) {
      switch (appState.error.name) {
        case "UnauthorizedError":
          logout();
          navigate("/login");
          break;
        case "UnexpectedError":
        case "NotFoundError":
          navigate("/surveys");
      }
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.close}>
            <button
              type="button"
              className={styles.btnClose}
              onClick={toSurveyList}
            >
              <CloseIcon />
            </button>
          </div>
          <div className={styles.title}>
            <h2>{survey && survey.question}</h2>
          </div>
        </div>
        <Form method="post">
          <div className={styles.card}>
            <div className={styles.options}>
              {survey
                ? survey.answers.map((answer, index) => {
                    return (
                      <>
                        <input
                          type="radio"
                          name="answer"
                          id={`answer-${index}`}
                          key={index}
                          value={answer.answer}
                          defaultChecked={answer.isCurrentAccountAnswer}
                        />
                        <label
                          htmlFor={`answer-${index}`}
                          className={styles.option}
                        >
                          <div
                            className={styles.percent}
                            style={{
                              width: animate
                                ? `${Number(answer.percent)}%`
                                : null,
                            }}
                          ></div>
                          <div className={styles.text}>
                            {answer.answer}
                            <span className={styles.count} hidden={!didAnswer}>
                              {answer.count}
                            </span>
                          </div>
                        </label>
                      </>
                    );
                  })
                : "Survey not found"}
            </div>

            <div className={styles.cardFirstShadowBackground}></div>
            <div className={styles.cardFirstShadow}></div>
            <div className={styles.cardSecondShadow}></div>
          </div>
          <div className={styles.controls}>
            <button type="submit" className={styles.btnSubmit}>
              Save Answer
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SurveyResultPage;

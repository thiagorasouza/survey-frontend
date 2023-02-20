import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import CloseIcon from "../components/CloseIcon";
import Loader from "../components/Loader";
import SubmitButton from "../components/SubmitButton";
import useAppState from "../hooks/useAppState";
import useSession from "../hooks/useSession";

import styles from "./SurveyResultPage.scss";

function SurveyResultPage() {
  const [animate, setAnimate] = useState(false);
  const appState = useAppState();
  const navigate = useNavigate();
  const { logout } = useSession();
  const [submitted, setSubmitted] = useState(false);

  const survey = appState?.data;
  const didAnswer = survey?.didAnswer;

  const toSurveyList = () => navigate("/surveys");

  useEffect(() => {
    if (didAnswer) {
      setAnimate(true);
    }
  }, []);

  useEffect(() => {
    if (!submitted && appState.isSubmitting) {
      setSubmitted(true);
    }
  }, [appState.isSubmitting]);

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
    <Loader>
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
                              <span
                                className={styles.count}
                                hidden={!didAnswer}
                              >
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
              <SubmitButton
                caption="Save Answer"
                submitting={appState.isSubmitting}
                success={
                  submitted && (appState.isSuccess || appState.isLoading)
                }
                noShadow={true}
              />
            </div>
          </Form>
        </div>
      </div>
    </Loader>
  );
}

export default SurveyResultPage;

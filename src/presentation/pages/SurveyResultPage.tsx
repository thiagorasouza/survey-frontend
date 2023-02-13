import React, { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import CloseIcon from "../components/CloseIcon";
import { LoaderResult } from "../loaders/LoaderResult";

import styles from "./SurveyResultPage.scss";

function SurveyResultPage() {
  const [animate, setAnimate] = useState(false);
  const loaderData = useLoaderData() as LoaderResult;
  const survey = loaderData.data;
  const didAnswer = survey.didAnswer;

  useEffect(() => {
    if (didAnswer) {
      setAnimate(true);
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.close}>
            <button type="button" className={styles.btnClose}>
              <CloseIcon />
            </button>
          </div>
          <div className={styles.title}>
            <h2>{survey.question}</h2>
          </div>
        </div>
        <Form method="post">
          <div className={styles.card}>
            <div className={styles.options}>
              {survey.answers.map((answer, index) => {
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
                          width: animate ? `${Number(answer.percent)}%` : null,
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
              })}
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

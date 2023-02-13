import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { Form, useLoaderData } from "react-router-dom";
import CloseIcon from "../components/CloseIcon";
import { LoaderResult } from "../loaders/LoaderResult";

import styles from "./SurveyResultPage.scss";

function SurveyResultPage() {
  const loaderData = useLoaderData() as LoaderResult;
  console.log("🚀 ~ loaderData", loaderData);

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
            <h2>{loaderData.data.question}</h2>
          </div>
        </div>
        <Form method="post">
          <div className={styles.card}>
            <div className={styles.options}>
              {loaderData.data.answers.map((answer, index) => {
                return (
                  <>
                    <input
                      type="radio"
                      name="answer"
                      id={`answer-${index}`}
                      key={index}
                      value={answer.answer}
                    />
                    <label
                      htmlFor={`answer-${index}`}
                      className={classNames(styles.option, {
                        [styles.selected]: answer.isCurrentAccountAnswer,
                      })}
                    >
                      {answer.answer}
                      <span className={styles.count}>{answer.count}</span>
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
            <button type="button" className={styles.btnSubmit}>
              Confirm
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SurveyResultPage;

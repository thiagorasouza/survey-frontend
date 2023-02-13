import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LocalStorageAdapter } from "../../infra/cache/local-storage-adapter";
import LogoutIcon from "../components/LogoutIcon";
import { LoaderResult } from "../loaders/LoaderResult";

import styles from "./SurveysPage.scss";

function SurveysPage() {
  const navigate = useNavigate();

  const loaderData = useLoaderData() as LoaderResult;
  console.log("🚀 ~ loaderData", loaderData);

  const logout = async (): Promise<void> => {
    const localStorage = new LocalStorageAdapter();
    await localStorage.set("accessToken", "");
    navigate("/login");
  };

  const openSurvey = (surveyId: string): void => {
    navigate(`/surveys/${surveyId}/results`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h2>Hello, John</h2>
        </div>
        <div className={styles.logout}>
          <button className={styles.btnLogout} type="button" onClick={logout}>
            <LogoutIcon />
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.banners}>
          <div className={styles.banner}></div>
          <div className={styles.banner}></div>
          <div className={styles.banner}></div>
        </div>
        <div className={styles.surveys}>
          {loaderData.data.map((survey) => {
            const date = new Date(survey.date).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <div
                key={survey.id}
                className={styles.survey}
                onClick={() => openSurvey(survey.id)}
              >
                <div className={styles.surveyTitle}>{survey.question}</div>
                <div className={styles.surveyDate}>{date}</div>
                <div className={styles.surveyProgress}>
                  <div className={styles.surveyProgressBar}></div>
                  <div className={styles.surveyOptions}>
                    {survey.answers.length} options
                  </div>
                  <div className={styles.surveyStatus}>
                    {survey.didAnswer ? "Complete" : "Not answered"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SurveysPage;

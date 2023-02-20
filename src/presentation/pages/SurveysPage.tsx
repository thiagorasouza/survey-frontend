import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../components/CheckIcon";
import LampIcon from "../components/LampIcon";
import LogoutIcon from "../components/LogoutIcon";
import useAppState from "../hooks/useAppState";
import useSession from "../hooks/useSession";

import styles from "./SurveysPage.scss";
import ShareIcon from "../components/ShareIcon";
import Loader from "../components/Loader";
import classNames from "classnames";

function SurveysPage() {
  const navigate = useNavigate();
  const { logout } = useSession();
  const appState = useAppState();

  const logoutAndRedirect = () => {
    logout();
    navigate("/login");
  };

  const openSurvey = (surveyId: string): void => {
    navigate(`/surveys/${surveyId}/results`);
  };

  useEffect(() => {
    if (appState.isError) {
      if (appState.error.name === "UnauthorizedError") {
        logoutAndRedirect();
      }
    }
  }, [appState]);

  const surveys = appState?.data;

  return (
    <Loader>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.greeting}>
            <h2>Hello,</h2>
            <p>We want to know your opinion</p>
          </div>
          <div className={styles.logout}>
            <button
              className={styles.btnLogout}
              type="button"
              onClick={logoutAndRedirect}
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.banners}>
            <div className={styles.banner}>
              <CheckIcon />
              Answer a survey
            </div>
            <div className={styles.banner}>
              <LampIcon />
              See what others are thinking
            </div>
            <div className={styles.banner}>
              <ShareIcon />
              Invite your friends to answer
            </div>
          </div>
          <div className={styles.surveys}>
            {surveys
              ? surveys.map((survey) => {
                  const date = new Date(survey.date).toLocaleDateString(
                    "en-us",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );
                  return (
                    <div
                      key={survey.id}
                      className={styles.survey}
                      onClick={() => openSurvey(survey.id)}
                    >
                      <div className={styles.surveyTitle}>
                        {survey.question}
                      </div>
                      <div className={styles.surveyDate}>{date}</div>
                      <div className={styles.surveyProgress}>
                        <div
                          className={classNames({
                            [styles.surveyProgressBar]: true,
                            [styles.surveyProgressBarComplete]:
                              survey.didAnswer,
                          })}
                        ></div>
                        <div className={styles.surveyOptions}>
                          {survey.answers.length} options
                        </div>
                        <div className={styles.surveyStatus}>
                          {survey.didAnswer ? "Complete" : "Not answered"}
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No surveys found."}
          </div>
        </div>
      </div>
    </Loader>
  );
}

export default SurveysPage;

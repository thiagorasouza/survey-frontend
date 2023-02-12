import React from "react";
import { useLoaderData } from "react-router-dom";

function SurveyResultPage() {
  const loaderData = useLoaderData();
  console.log("🚀 ~ loaderData", loaderData);

  return <h1>Survey Result</h1>;
}

export default SurveyResultPage;

import React from "react";
import { useLoaderData } from "react-router-dom";

function SurveysPage() {
  const loaderData = useLoaderData();
  console.log("🚀 ~ loaderData", loaderData);

  return <h1>Surveys</h1>;
}

export default SurveysPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/blogStyles.css";

export const BackToHomePageButton = () => {
  let navigate = useNavigate();

  const goBackToBlogList = () => {
    navigate(`/`);
  };
  return (
    <Button onClick={goBackToBlogList} className="darker-blue-button">
      Back To Homepage
    </Button>
  );
};

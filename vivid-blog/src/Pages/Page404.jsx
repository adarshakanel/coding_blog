import React from "react";
import { BackToHomePageButton } from "../components/BackToHomePageButton";
import { Card, ListGroup } from "react-bootstrap";

export const Page404 = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card>
        <div className="d-flex flex-column justify-content-center align-items-center p-5 ">
          <h4>Oops, page does not exist...</h4>
          <br />
          <h5> Error 404</h5>
          <br />
          <div>
            <BackToHomePageButton />
          </div>
        </div>
      </Card>
    </div>
  );
};

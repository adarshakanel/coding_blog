import React from "react";
import { useEffect, useState, useRef } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BackToHomePageButton } from "../components/BackToHomePageButton";

import "../css/blogStyles.css";

export const Blog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const blogContentRef = useRef();

  const getBlogInformation = async () => {
    const response = await fetch(`http://localhost:5000/blog/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const blogList = await response.json();
    const getBlog = blogList[0];
    setBlog(getBlog);
    blogContentRef.current.innerHTML = getBlog.content;
  };

  useEffect(() => {
    getBlogInformation();
  }, []);

  return (
    <div className="blog d-flex justify-content-center pt-4">
      <Card className="w-75">
        <div className="m-3">
          <BackToHomePageButton />
        </div>

        <Card.Body>
          <div
            id={blog.id}
            style={{
              width: "100vw!important",
            }}
            ref={blogContentRef}
          ></div>
        </Card.Body>
      </Card>
    </div>
  );
};

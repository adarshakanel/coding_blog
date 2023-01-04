import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../css/blogStyles.css";
export const BlogsSummary = ({ blog }) => {
  let navigate = useNavigate();
  const getDate = (blogDate) => {
    if (!blogDate) return "unknown date";
    const splitDate = blogDate.split("T");
    const date = splitDate[0];
    return date;
  };

  const getTime = (blogDate) => {
    if (!blogDate) return "";
    const date = new Date(blogDate);
    const dateToTime = date.toLocaleTimeString();
    return dateToTime;
  };

  const learnMore = (slug) => {
    navigate(`blog/${slug}`);
  };

  return (
    <div className="blog my-2 border-0">
      <Card>
        <Card.Title className="pt-4 d-flex justify-content-center">
          <div className="w-25 text-center">{blog.title}</div>
        </Card.Title>
        <div className="d-flex justify-content-center">
          {blog.published_at ? (
            <div>
              Created on: {getDate(blog.published_at)} at{" "}
              {getTime(blog.published_at)}{" "}
            </div>
          ) : (
            <div> Created at: unknown date </div>
          )}
        </div>
        <Card.Img
          variant="top"
          className="py-2"
          style={{ height: "50vh" }}
          src={blog.image}
        />
        <div className="d-flex justify-content-center py-2">
          <Button
            className="darker-blue-button"
            onClick={() => learnMore(blog.slug)}
          >
            View Blog!
          </Button>
        </div>
      </Card>
    </div>
  );
};

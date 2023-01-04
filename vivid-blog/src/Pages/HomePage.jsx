import React from "react";
import { useState, useEffect } from "react";
import { BlogsSummary } from "../components/BlogsSummary";
import { Pagination } from "@mui/material";

export const HomePage = () => {
  const [blogList, setBlogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [error, setError] = useState({});
  const getBlog = async () => {
    fetch(`http://localhost:5000/blogs/?paginationPage=${currentPage}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => await res.json())
      .then((response) => {
        setBlogList(response.blogsArray);
        createPaginationArray(response.numberOfBlogs);
      });
  };

  const createPaginationArray = (numberOfBlogs) => {
    const getNumberOfPages = Math.ceil(numberOfBlogs / 6);
    setNumberOfPages(getNumberOfPages);
  };

  useEffect(() => {
    getBlog();
  }, [currentPage]);

  const updatePageNumber = (newPageNumber) => {
    setCurrentPage(newPageNumber);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-75 pt-5">
        <h3 className="text-center">Vivid Blog</h3>
        <div style={{ maxHeight: "85vh", overflowY: "scroll" }}>
          {blogList.map((blog) => (
            <BlogsSummary blog={blog} />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            count={numberOfPages}
            onChange={(e, value) => updatePageNumber(value)}
          />
        </div>
      </div>
    </div>
  );
};

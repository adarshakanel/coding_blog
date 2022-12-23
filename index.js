const express = require("express");
const app = express();
const cors = require("cors")
const createError = require('http-errors');
const bodyParser = require("body-parser");
const pool = require("./db");
const { paginationSize } = require("./Constants");

//MIDDLEWARE
app.use(cors())
app.use(bodyParser.json())

const sortArrayByDate = (array) => {
    let sortedArray = array.sort(function (a, b) {
        return new Date(b.published_at) - new Date(a.published_at);
    })
    return sortedArray
}

// commento
const getPaginatedArray = (blogsArray, minIndex, maxIndex) => {
    const sortedBlogsArray = sortArrayByDate(blogsArray)
    const paginatedBlogsArray = sortedBlogsArray.slice(minIndex, maxIndex)
    return paginatedBlogsArray
}

//ROUTES
// get all blogs
app.get("/blogs/", async (req, res, next) => {
    try {
        let { paginationPage } = req.query;

        const getAllBlogs = await pool.query("SELECT image, published_at, title, slug FROM blogs")
        const blogsArray = getAllBlogs.rows

        // get all blogs that have published at that is not null
        let publishedBlogArray = blogsArray.filter(blog => blog.published_at != null)
        // sort the blogs array before begin spliced (newest to oldest)
        const blogsArrayLength = publishedBlogArray.length

        // get the first index of the current paginated array
        let getInitialBlogArrayIndex = (paginationPage - 1) * paginationSize
        getInitialBlogArrayIndex = getInitialBlogArrayIndex < 0 ? 0 : getInitialBlogArrayIndex

        // get the final index of the current paginated array
        let getFinalBlogArrayIndex = paginationPage * paginationSize
        getFinalBlogArrayIndex = getFinalBlogArrayIndex > blogsArrayLength ? blogsArrayLength : getFinalBlogArrayIndex

        paginatedBlogsArray = getPaginatedArray(blogsArray, getInitialBlogArrayIndex, getFinalBlogArrayIndex)
        res.status(200).json({ blogsArray: paginatedBlogsArray, numberOfBlogs: blogsArrayLength })
    } catch (error) {
        next(createError(500, error))
    }
})

app.get("/blog/:slug", async (req, res, next) => {
    try {
        let { slug } = req.params;
        const getBlogUsingSlug = await pool.query("SELECT * FROM blogs WHERE slug = $1", [slug])
        res.status(200).send(getBlogUsingSlug.rows)
    } catch (error) {
        next(createError(500, error))
    }
})

app.use(express.json())

app.listen(5000, () => {
    console.log("server has started on port 5000")
})
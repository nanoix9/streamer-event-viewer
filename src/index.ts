import express from 'express';

const port = 8080; // default port to listen

const app = express();

// define a route handler for the default home page
app.get("/hello", (req, res) => {
    res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

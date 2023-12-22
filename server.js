const express = require('express');
const blogsRoutes = require('./routes/blog.routes')
const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/blogs", blogsRoutes)


app.listen(PORT, () => {
    console.log("Server Listening on PORT: 5000");
});



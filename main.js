const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    const axios = require("axios");

    const runAt = 0;

    const startDate = new Date();
    let calculatedDate = 555;
    let lastTimeLog = 555;

    const scheduler = async () => {while (true) {
        const currentDate = new Date();
        if (currentDate.getUTCDate() != calculatedDate && currentDate.getUTCHours() == runAt) {
            console.log("RUN!!! at " + currentDate.getUTCDate() + "-" + currentDate.getUTCMonth() + "-" + currentDate.getUTCFullYear() + " " + currentDate.getUTCHours() + ":" + currentDate.getUTCMinutes() + ":" + currentDate.getUTCSeconds());
            calculatedDate = currentDate.getUTCDate()
            try {
                const result = await axios.get("https://covid-data-123.herokuapp.com/deleteuserid")
                console.log(result.status)
            } catch (error) {
                console.log(error.response.status)
            }
        }
        if (lastTimeLog != currentDate.getUTCMinutes()) {
            console.log("Checking at day " + currentDate.getUTCDate() + " previous is " + calculatedDate + " current hours is " + currentDate.getUTCHours() + " expected = " + runAt);
            lastTimeLog = currentDate.getUTCMinutes();
        }
    }}
    scheduler()


})


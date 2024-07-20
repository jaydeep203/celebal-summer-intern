require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer');
const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

    app.post("/api", upload.array("files"), (req, res) => {
        console.log(req.body);
        console.log(req.files);
        res.json({ message: "File(s) uploaded successfully" });
    
    });

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server Started'))
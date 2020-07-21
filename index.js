const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { json } = require("body-parser")
const cors = require("cors")


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var db = {
    medias: [{
            id: 0,
            title: "Twitter",
            year: 2006
        },
        {
            id: 1,
            title: "Facebook",
            year: 2004
        },
        {
            id: 2,
            title: "Instagram",
            year: 2010
        }
    ]
}


app.get("/medias", (req, res) => {
    res.statusCode = 200;
    res.json(db.medias)
})

app.get("/media/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id)
        var media = db.medias.find(m => m.id == id)
        if (media != undefined) {
            res.statusCode = 200
            res.json(media)
        } else {
            res.sendStatus(404);
        }
    }
})

app.post("/media", (req, res) => {
    var { id, title, year } = req.body;

    db.medias.push({
        id,
        title,
        year
    })
})
app.put("/media/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id)
        var media = db.medias.find(m => m.id == id)
        if (media != undefined) {
            var { id, title, year } = req.body;

            if (title != undefined) {
                media.title = title
            }
            if (id != undefined) {
                media.id = id
            }
            if (year != undefined) {
                media.year = year
            }

            res.sendStatus(200)

        } else {
            res.sendStatus(404);
        }
    }
})
app.delete("/media/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id)
        var media = db.medias.findIndex(m => m.id == id)
        if (media == -1) {
            res.sendStatus(404)
        } else {
            db.medias.splice(media, 1)
            res.sendStatus(200)
        }
    }
})
app.listen(4000, () => {
    console.log("Servidor rodando na Porta 4000")
})
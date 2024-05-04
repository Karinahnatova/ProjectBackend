import express from "express"
import cors from "cors"
import { logger } from "./middlewares/logger.js";
import { fullDomain, PORT } from "./config/config.js";
import router from "./routes/index.routes.js";

const app = express()
console.clear()

app.use('/html-form', express.static('public')); //formulario html de uploads
app.use('/files', express.static('uploads')) //carpeta de archivos subidos a uploads


app.use(cors())
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/API/v1/", router)
app.get("/", (req, res)=> {
    res.setHeader("Content-type", "text/html")

    const landingHTML = `
    <h1>BIENVENIDOS A NUESTRA API DE HTML</h1>
    `
    res.send(landingHTML)
})

app.listen(PORT, ()=> {
    console.log(`Server is running on ${fullDomain}`);
});
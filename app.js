import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { projectRoot } from "./utils/paths.js";
import homeRoutes from "./routes/home.js";
import assetsTypeRoutes from "./routes/assets-type-router.js";
import assetsRoutes from "./routes/assets-router.js";

const app = express();

//render engine
app.engine("hbs", engine({
    layoutsDir:"views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(projectRoot, "public")));

app.use((req, res) => {
  res.status(404).render("404", { "page-title": "Page Not Found"});
});

app.listen(5000);

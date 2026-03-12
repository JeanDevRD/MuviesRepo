import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { projectRoot } from "./utils/paths.js";
import homeRoutes from "./routes/home.js";
import genreRoutes from "./routes/genre.js";
import serieRoutes from "./routes/serie.js";

const app = express();

app.engine("hbs", engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
        getGenreName: function (genresList, genreId) {
            if (!genresList || !genreId) return "Sin género";
            const genre = genresList.find((g) => Number(g.id) === Number(genreId));
            return genre ? genre.name : "Sin género";
        },
        eq: function (a, b) {
            return Number(a) === Number(b);
        },
        
        getYoutubeEmbedUrl: function (url) {
            if (!url) return "";
            const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
            return match ? `https://www.youtube.com/embed/${match[1]}` : url;
        },
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
    },
}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(projectRoot, "public")));

app.use("/", homeRoutes);
app.use("/genres", genreRoutes);
app.use("/series", serieRoutes);

app.use((req, res) => {
    res.status(404).render("404", { "page-title": "Página no encontrada" });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
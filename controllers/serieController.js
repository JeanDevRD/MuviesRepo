import Serie from "../models/SerieModel.js";
import Genre from "../models/GenreModel.js";

export function GetSeries(req, res) {
    Serie.GetAll((series) => {
        Genre.GetAll((genres) => {
            res.render("series/index", {
                "page-title": "Series",
                seriesList: series,
                hasSeries: series.length > 0,
                genresList: genres,
            });
        });
    });
}

export function GetCreateSerie(req, res) {
    Genre.GetAll((genres) => {
        res.render("series/save", {
            "page-title": "Crear Serie",
            editMode: false,
            genresList: genres,
        });
    });
}

export function PostCreateSerie(req, res) {
    const { name, coverImage, videoUrl, genreId } = req.body;

    if (!name || !coverImage || !videoUrl || !genreId) {
        Genre.GetAll((genres) => {
            return res.render("series/save", {
                "page-title": "Crear Serie",
                editMode: false,
                error: "Todos los campos son requeridos.",
                genresList: genres,
                formData: { name, coverImage, videoUrl, genreId },
            });
        });
        return;
    }

    const newSerie = new Serie(0, name.trim(), coverImage.trim(), videoUrl.trim(), genreId);
    newSerie.Save();
    res.redirect("/series/index");
}

export function GetEditSerie(req, res) {
    const { id } = req.params;
    Serie.GetById(id, (serie) => {
        if (!serie) {
            return res.status(404).render("404", { "page-title": "Serie no encontrada" });
        }
        Genre.GetAll((genres) => {
            res.render("series/save", {
                "page-title": `Editar Serie: ${serie.name}`,
                editMode: true,
                serie,
                genresList: genres,
            });
        });
    });
}

export function PostEditSerie(req, res) {
    const { id } = req.params;
    const { name, coverImage, videoUrl, genreId } = req.body;

    if (!name || !coverImage || !videoUrl || !genreId) {
        Genre.GetAll((genres) => {
            return res.render("series/save", {
                "page-title": "Editar Serie",
                editMode: true,
                error: "Todos los campos son requeridos.",
                genresList: genres,
                serie: { id, name, coverImage, videoUrl, genreId },
            });
        });
        return;
    }

    const edited = new Serie(id, name.trim(), coverImage.trim(), videoUrl.trim(), genreId);
    edited.Save();
    res.redirect("/series/index");
}

export function PostDeleteSerie(req, res) {
    const { id } = req.body;
    Serie.Delete(id);
    res.redirect("/series/index");
}

export function GetDetailSerie(req, res) {
    const { id } = req.params;
    Serie.GetById(id, (serie) => {
        if (!serie) {
            return res.status(404).render("404", { "page-title": "Serie no encontrada" });
        }
        res.render("series/detail", {
            "page-title": serie.name,
            serie,
        });
    });
}
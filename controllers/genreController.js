import Genre from "../models/GenreModel.js";

export function GetGenres(req, res) {
    Genre.GetAll((genres) => {
        res.render("genres/index", {
            "page-title": "Géneros",
            genresList: genres,
            hasGenres: genres.length > 0,
        });
    });
}

export function GetCreateGenre(req, res) {
    res.render("genres/save", {
        "page-title": "Crear Género",
        editMode: false,
    });
}

export function PostCreateGenre(req, res) {
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.render("genres/save", {
            "page-title": "Crear Género",
            editMode: false,
            error: "El nombre del género es requerido.",
        });
    }

    const newGenre = new Genre(0, name.trim());
    newGenre.Save();
    res.redirect("/genres/index");
}

export function GetEditGenre(req, res) {
    const { id } = req.params;
    Genre.GetById(id, (genre) => {
        if (!genre) {
            return res.status(404).render("404", { "page-title": "Género no encontrado" });
        }
        res.render("genres/save", {
            "page-title": `Editar Género: ${genre.name}`,
            editMode: true,
            genre,
        });
    });
}

export function PostEditGenre(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.render("genres/save", {
            "page-title": "Editar Género",
            editMode: true,
            error: "El nombre del género es requerido.",
            genre: { id, name },
        });
    }

    const edited = new Genre(id, name.trim());
    edited.Save();
    res.redirect("/genres/index");
}

export function PostDeleteGenre(req, res) {
    const { id } = req.body;
    Genre.Delete(id);
    res.redirect("/genres/index");
}
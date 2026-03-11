import genre from '../models/GenreModel.js';

export function GetGenres(req, res) 
{
    genre.GetAll((genres) => {
        res.render("genres/index", { "page-title": "Genres", GenreList : genres,
            hasGenre : genres.length > 0
         });
    });
}

export function GetCreateGenre(req, res)
{
    res.render("genres/save", { "page-title": "Create Genre", editMode : false });
}

export function PostCreateGenre(req, res){
    const name = req.body.name;
    const newGenre = new genre(0, name);
    newGenre.Save();
    res.redirect("genres/index");
}

export function GetEditGenre(req, res){
    const id = req.params.id;
    genre.GetById(id, (genre) => {
        if(genre){
            res.render("/genres/save", { "page-title": `Edit Genre: ${genre.name}`, 
                editMode : true, genre : genre });
        } else {
            res.status(404).render("404", { "page-title": "Genre Not Found"});
        }
    });
}

export function PostEditGenre(req, res){
    const id = req.params.id;
    const name = req.body.name;
    const editedGenre = new genre(id, name);
    editedGenre.Save();
    res.redirect("/genres/index");
}

export function GetDeleteGenre(req, res){
    const id = req.params.id;
    genre.DeleteById(id);
    res.redirect("/genres/index");
}
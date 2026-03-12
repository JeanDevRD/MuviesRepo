import express from "express";
import {
    GetGenres,
    GetCreateGenre,
    PostCreateGenre,
    GetEditGenre,
    PostEditGenre,
    PostDeleteGenre,
} from "../controllers/genreController.js";

const router = express.Router();

router.get("/index", GetGenres);
router.get("/create", GetCreateGenre);
router.post("/create", PostCreateGenre);
router.get("/edit/:id", GetEditGenre);
router.post("/edit/:id", PostEditGenre);
router.post("/delete", PostDeleteGenre);

export default router;
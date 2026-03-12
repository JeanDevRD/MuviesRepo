import express from "express";
import {
    GetSeries,
    GetCreateSerie,
    PostCreateSerie,
    GetEditSerie,
    PostEditSerie,
    PostDeleteSerie,
    GetDetailSerie,
} from "../controllers/serieController.js";

const router = express.Router();

router.get("/index", GetSeries);
router.get("/create", GetCreateSerie);
router.post("/create", PostCreateSerie);
router.get("/edit/:id", GetEditSerie);
router.post("/edit/:id", PostEditSerie);
router.post("/delete", PostDeleteSerie);
router.get("/detail/:id", GetDetailSerie);

export default router;
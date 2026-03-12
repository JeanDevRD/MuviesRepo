import path from "path";
import { projectRoot } from "../utils/paths.js";
import { GetAllFromFile, SaveToFile } from "../utils/Handlers.js";

const dataPath = path.join(projectRoot, "data", "series.json");

class Serie {
    constructor(id, name, coverImage, videoUrl, genreId) {
        this.id = id;
        this.name = name;
        this.coverImage = coverImage;
        this.videoUrl = videoUrl;
        this.genreId = genreId;
    }

    Save() {
        GetAllFromFile(dataPath, (series) => {
            if (this.id !== 0) {
                const editIndex = series.findIndex((s) => s.id === Number(this.id));
                if (editIndex !== -1) {
                    series[editIndex] = this;
                    SaveToFile(dataPath, series);
                }
            } else {
                this.id = Math.random() * 10000;
                series.push(this);
                SaveToFile(dataPath, series);
            }
        });
    }

    static GetAll(callback) {
        GetAllFromFile(dataPath, callback);
    }

    static GetById(id, callback) {
        GetAllFromFile(dataPath, (series) => {
            const serie = series.find((s) => s.id === Number(id));
            callback(serie || null);
        });
    }

    static Delete(id) {
        GetAllFromFile(dataPath, (series) => {
            const updated = series.filter((s) => s.id !== Number(id));
            SaveToFile(dataPath, updated);
        });
    }
}

export default Serie;
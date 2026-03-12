import path from 'path';
import { projectRoot } from '../utils/paths.js';
import { GetAllFromFile } from '../utils/Handlers.js';
import { SaveToFile } from '../utils/Handlers.js';
import { get } from 'http';

const dataPath = path.join(projectRoot, "data", "genres.json");

class Genre{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    Save(){
        GetAllFromFile(dataPath, (data) => {
            if(this.id !== 0){
                const editGenreIndex = data.findIndex((genre) => genre.id === Number(this.id));
                if(editGenreIndex !== -1){
                    data[editGenreIndex] = this;
                    SaveToFile(dataPath, data);
                }
            } else {
                this.id = Math.random() * 1000;
                data.push(this);
                SaveToFile(dataPath, data);
            }   
        });
    }

    static GetAll(callback){
        GetAllFromFile(dataPath, callback);
    }

    static GetById(id, callback){
        GetAllFromFile(dataPath, (data) => {
            const genre = data.find((genre) => genre.id === Number(id));
            if(genre){
                callback(genre);
            } else {
                callback(null);
            }
        });
    }

    static Delete(id) {
    GetAllFromFile(dataPath, (data) => {
        const newData = data.filter((genre) => genre.id !== Number(id));
        SaveToFile(dataPath, newData);
    });
}
}

export default Genre;
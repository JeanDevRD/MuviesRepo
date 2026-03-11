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
                if(editGenreIndex !== 0){
                    data[editGenreIndex] = this;
                    SaveToFile(dataPath, data);
                }
            } else {
                data.push(this);
            }   
            SaveToFile(dataPath, data);
        });
    }
}
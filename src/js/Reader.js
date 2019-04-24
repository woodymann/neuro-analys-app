"use strict";

const fs = require('fs');

class Reader{

    read(path){
        try {
            const data = fs.readFileSync(path, 'utf8');
            return this.__setDataArray(data);
        } catch (error) {
            console.log(error.message);
            return null;
        }
    }

    loadJSON(path){
        try {
            const obj = JSON.parse(fs.readFileSync(path, 'utf8'));

            return obj;
        } catch (error) {
            return [];
        }            
    }

    __setDataArray(data){
        const array = data.split(/ |, |;|\? |:|"|\.|!|\n|\(|\)|-|\t|\r/);

        return array;
    }

}

module.exports = new Reader();


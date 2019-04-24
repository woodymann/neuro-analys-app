"use strict";

const Reader = require('./Reader');

const writeJsonFile = require('write-json-file');
const porter = require('../../lib/Porter');


class Library{

    constructor(library){
        this.library = library;
        this.data = [];
        
        this.__updateData();
    }

    addToLibrary(data){

        this.__updateData();

        let toWrite = [...this.data, ...data];

        toWrite = new Set(toWrite);

        toWrite = Array.from(toWrite);

        writeJsonFile(this.library, toWrite)
        .then(console.log('library is updated'))
        .catch(err => console.log(err));
    }

    clearLibrary(){
        writeJsonFile(this.library,'')
        .then(console.log('library is clear'))
        .catch(err => console.log(err));
    }

    resetLibrary(data){

        this.__updateData();

        let toWrite = [...this.data, ...data];

        toWrite = new Set(toWrite);

        toWrite = Array.from(toWrite);

        writeJsonFile(this.library,'')
        .then(console.log('library is clear'))
        .then(writeJsonFile(this.library,toWrite))
        .then(console.log('library is updated'))
        .catch(err => console.log(err));
    }

    getVector(fileData){
        const array = this.data.map( word => {
            let flag = 0;
            fileData.forEach(element => {
                if(word == element) {
                    flag = 1;  
                }   
            });
            return flag;
        });
        return array;
    }

    __updateData(){
        this.data = Reader.loadJSON(this.library);
    }

}

module.exports = Library;
const Reader = require('./Reader');
const porter = require('../../lib/Porter');

class File{
    constructor(path){
        this.path = path;
        this.data = [];
        this.vector = [];

        this.init();
    }

    init(){
        const data = Reader
                        .read(this.path)
                        .filter((word, index, self) => 
                            self.indexOf(word) === index && word.length > 3 && word.match('[А-Яа-я]') 
                        ).sort();

        this.data = data.map(word => porter.stem(word)).filter(word => word.length > 3 );
    }

}

module.exports = File;

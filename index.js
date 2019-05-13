const Library = require('./src/js/Library');
const File = require('./src/js/File');
const Brain = require('./src/js/Brain');

const arrayExpansion = require('./lib/arrayExpansion');

const arguments = process.argv;

const library = new Library(arguments.getValue('-l'));

const file = new File(arguments.getValue('-f'));

const net = new Brain();

const act = arguments.getValue('-a');

const common = library.getVector(file.data).compare();

switch (act){
    case 'add':
        library.addToLibrary(file.data);
        break;
    case 'clear':
        library.clearLibrary();
        break;
    case 'reset':
        library.resetLibrary(file.data);
    case 'mask':
        console.log(common + '%');
    case 'compare':
        console.log(net.getRes(common/100), net.run(common/100))
    default:  break;
}

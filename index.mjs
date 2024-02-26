import fs from 'fs';

function readInstructionFile(filePath, callback) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Soubor instrukce neexistuje.`);
            return;
        }
        const files = data.toString().trim().split(' ');
        callback(files);
    });
}

function checkFileExists(filePath, callback) {
    fs.stat(filePath, err => {
        if (err) {
            console.error(`Soubor ${filePath} neexistuje.`);
        } else {
            callback();
        }
    });
}

function copyFile(inputFile, outputFile) {
    fs.readFile(inputFile, (err, data) => {
        if (err) {
            console.error(err.message);
            return;
        }
        fs.writeFile(outputFile, data, err => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Soubor ${inputFile} byl úspěšně zkopírován do ${outputFile}.`);
            }
        });
    });
}

function copyFiles() {
    readInstructionFile('instrukce.txt', files => {
        if (files.length !== 2) {
            console.error('Soubor instrukce.txt musí obsahovat názvy vstupního a výstupního souboru.');
            return;
        }
        const [inputFile, outputFile] = files;
        checkFileExists(inputFile, () => copyFile(inputFile, outputFile));
    });
}

copyFiles();
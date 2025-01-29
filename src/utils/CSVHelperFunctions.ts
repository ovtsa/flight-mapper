export type CSVObjectType = {[index: string]: string};

export function parseCSV(csv: string, delimiter: string, removeQuotesFromHeader = true): CSVObjectType[] {
    // Todo: convert this into a creative regex 
    let lines = csv.split(/\r?\n/);
    let result: {[index: string]: string}[] = [];
    let headers = lines[0].split(delimiter);

    if (removeQuotesFromHeader) {
        // we remove only quotation marks around the header name, assuming there aren't quotes in the object property. If there are,
        // this should break, because you have bigger problems.

        for (let i = 0; i < headers.length; i++) {
            headers[i] = headers[i].replace(/['"\r]+/g, '');
        }
    }

    for (let i = 1; i < lines.length; i++) {
        let obj: {[index: string]: string} = {};

        if(lines[i] === undefined || lines[i].trim() === ``) {
            continue;
        }

        // check this part. Looping through characters on the line 
        let wordInFormation = '';
        let words: string[] = [];
        let quoteIsOpen = false;
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === `"`) {
                quoteIsOpen = !quoteIsOpen;
            } else if (lines[i][j] === delimiter && !quoteIsOpen) {
                words.push(wordInFormation);
                wordInFormation = "";
            }
            else {
                wordInFormation += lines[i][j];
            }

            if (j === lines[i].length - 1) {
                words.push(wordInFormation);
            } 
        }

        for(let k = 0; k < words.length; k++) {
            obj[headers[k].trim()] = words[k];
        }

        result.push(obj);
    }

    return result;
}
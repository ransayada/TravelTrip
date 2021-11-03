import { storeService } from './storage.service.js'

export const locService = {
    getLocs,
    addLocToTable,
    deleteLoc
}

const KEY = 'locationsDB'


var gLocs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function addLocToTable(la, lo) {
    var locs = storeService.loadFromStorage(KEY);
    var prm = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${la},${lo}&key=AIzaSyAyXEvAzKdfmY-a06sPP8K9CECxLBYaO_o`)
    prm.then(res => {
        console.log('you are here->', res.data);
        var loc = _prepareData(res.data, la, lo);
        console.log('location is ', loc)
        gLocs.push(loc);
        storeService.saveToStorage(KEY, gLocs);
        return gLocs;
    })
}

function _prepareData(jsonLoc, la, lo) {
    var loc = jsonLoc.results[7].formatted_address;
    console.log('~ loc', loc)
    return { name: loc, lat: la, lng: lo };
}

function getLocs() {
    gLocs.push
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}


function deleteLoc(idx) {
    gLocs.splice(idx, 1);
    storeService.saveToStorage(KEY, gLocs);
}
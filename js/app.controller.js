import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
            locService.addLocToTable(pos.coords.latitude, pos.coords.longitude);
            renderLocationsTable();
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function renderLocationsTable() {
    console.log('rendering locations...');
    locService.getLocs()
        .then(locs => {
            console.log('~ locs', locs)
            var strHTML = `<table class="table" border="1"><tbody><th data-trans="id" > id </th><th data-trans="name" > Name </th><th data-trans="lat"> Lat </th><th data-trans="lng"> Lat </th> <th data-trans="Actions"> Actions </th>`;
            for (let i = 0; i < locs.length; i++) {
                strHTML += `<tr>`;
                var location = locs[i];
                var name = location.name;
                var lat = location.lat;
                var lng = location.lng;
                strHTML += `<td>${i}</td><td>${name}</td> <td>${lat}</td><td>${lng}</td> <td><button onclick="onGoLoc()" class="btn-go-locs">Go</button><button onclick="onDeleteLoc()" class="btn-delete-locs">X</button><button onclick="onMarkLoc()" class="btn-mark-locs">📍</button></td></tr>`;
            }
            strHTML += `</tbody></table>`;
            document.querySelector('.locations-container').innerHTML = strHTML;
        })
}

function onMarkLoc() {
    console.log('mark this location...');
}

function onGoLoc() {
    console.log('go to this location...');

}

function onDeleteLoc() {
    console.log(' this location...');

}
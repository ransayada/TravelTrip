export const mapService = {
    initMap,
    addMarker,
    panTo
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            console.log('Map!', gMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAnMOpXd0LO5KueJQhD4aegzqIUAnWcgu4';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

// //TODO:change
// function _connectGoogleApi() {
//     if (window.google) return Promise.resolve()
//     const API_KEY = 'AIzaSyAyXEvAzKdfmY-a06sPP8K9CECxLBYaO_o';
//     var elGoogleGeoCodeApi = document.createElement('script');
//     elGoogleGeoCodeApi.src = `https://maps.googleapis.com/maps/api/geocode/json?address=${search_res}&key=${API_KEY}`;
//     elGoogleGeoCodeApi.async = true;
//     document.body.append(elGoogleGeoCodeApi);

//     return new Promise((resolve, reject) => {
//         elGoogleGeoCodeApi.onload = resolve;
//         elGoogleGeoCodeApi.onerror = () => reject('Google script failed to load')
//     })
// }
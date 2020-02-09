window.lat = 0;
window.lng = 0;

function getLocation() {
    console.log('Hello');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
        console.log('navigator.geolocation exsists');
    }
    return null;
};

function updatePosition(position) {
    if (position) {
        window.lat = position.coords.latitude;
        window.lng = position.coords.longitude;
        console.log('position exsists');
        window.mark.setPosition({ lat: window.lat, lng: window.lng });
        window.map.setCenter({ lat: window.lat, lng: window.lng })
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        // window.initialize = initialize;

    }
    else {
        console.log('position does not exsists');
    }
}
//var x = document.getElementById("demo");
/*function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + lat +
        "<br>Longitude: " + lng;
    window.lat = lat;
    window.lng = lng;
}*/

function circlePoint(time) {
    var radius = 0.01;
    var x = Math.cos(time) * radius;
    var y = Math.sin(time) * radius;

    return { lat: window.lat + x, lng: window.lng + y };
};

var map;
var mark;
//var lineCoords = [];

//var uluru = { lat: -25.344, lng: 131.036 };
//var marker = new google.maps.Marker({ position: uluru, map: map });

var initialize = function () {
    window.map = new google.maps.Map(document.getElementById('map-canvas'), { center: { lat: window.lat, lng: window.lng }, zoom: 12 });
    window.mark = new google.maps.Marker({ position: { lat: window.lat, lng: window.lng }, map: map });
};







var redraw = function (payload) {
    lat = payload.message.lat;
    lng = payload.message.lng;
    window.map.setCenter({ lat: lat, lng: lng, alt: 0 });
    window.mark.setPosition({ lat: lat, lng: lng, alt: 0 });

    //lineCoords.push(new google.maps.LatLng(lat, lng));

    // var lineCoordinatesPath = new google.maps.Polyline({
    //     path: lineCoords,
    //     geodesic: true,
    //     strokeColor: '#2E10FF'
    // })
}

var pnChannel = "map-channel";

var pubnub = new PubNub({
    publishKey: 'pub-c-ade30bfe-daed-4c0f-b4fc-25ff52e4c037',
    subscribeKey: 'sub-c-a8aa07d8-4b54-11ea-814d-0ecb550e9de2'
});

// pubnub.subscribe({ channels: [pnChannel] });
// pubnub.addListener({ message: redraw });

// setInterval(function () {
//     pubnub.publish({ channel: pnChannel, message: { lat: window.lat + 0.001, lng: window.lng + 0.01 } });
// }, 10);



//setInterval(function () { updatePosition(getLocation()); }, 10000);
function currentLocation() {
    return { lat: window.lat, lng: window.lng };
};

var map;

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(40.7142, -30.0064),
        zoom: 2,
        disableDefaultUI: true,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDoubleClickZoom: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}
google.maps.event.addDomListener(window, 'load', initMap);


let map;
let infowindow;
/********* initiate map **********/
let latitude = -33.867;
let longitude = 151.195;
/******* obtain location ********/
function getLocation() {
    function success(position) {
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;
      debugger;
      initMap();
      $('#map').css("display", "block");
      $('.salad_list').css("display", "block");
    }
    function error() {
      output.innerHTML = "Unable to retrieve your location";
    }
    navigator.geolocation.getCurrentPosition(success, error);

}
/******* Google Map **********/
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 15
  });
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    // location: pyrmont,
    location: {lat: latitude, lng: longitude},
    radius: 500,
    type: ['salad']
  }, callback);
}
function updateMap() {
  map.setCenter({lat: latitude, lng: longitude});
  service.nearbySearch({
    // location: pyrmont,
    location: {lat: latitude, lng: longitude},
    radius: 500,
    type: ['salad']
  }, callback);
}
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
    createSaladList(results);
  }
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
/******* Salad List **********/
function createSaladList(places) {
  const saladList = places.map((place) => renderResult(place))
  $('.salad_list').html(saladList);
}
function renderResult(place) {
  return `
    <div>
      ${place.name};
    </div>
  `;
}

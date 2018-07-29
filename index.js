/******* general *****************/
const FOUR_SQUARE_ID = 'XMSRRI4IVVPBDLBIP3XG5Z1IMWIRIKORZ5QNIFVCWYV45EEJ';
const FOUR_SQUARE_API_KEY = '5ORN4GDZCCCJQGKQTGXXQLRFLEJILIYFEGKNF2ESSYD2GZYX';
const FOUR_SQUARE_SEARCH_ENDPOINT = 'https://api.foursquare.com/v2/venues/search?';

/******* global variable ********/
let map;
let infowindow;
let salads = [];

/********* initiate map **********/
let latitude = -33.867;
let longitude = 151.195;

/******* obtain location ********/
function getLocation() {
    function success(position) {
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;
      updateMap();
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
  // infowindow = new google.maps.InfoWindow();
  // var service = new google.maps.places.PlacesService(map);
  // service.nearbySearch({
  //   // location: pyrmont,
  //   location: {lat: latitude, lng: longitude},
  //   radius: 500,
  //   type: ['salad']
  // }, callback);
}

function updateMap() {
  map.setCenter({lat: latitude, lng: longitude});
  getDataFromApi(callback);
  // service.nearbySearch({
  //   // location: pyrmont,
  //   location: {lat: latitude, lng: longitude},
  //   radius: 500,
  //   type: ['salad']
  // }, callback);
}

function getDataFromApi(callback) {
  const query = {
    ll: `${latitude},${longitude}`,
    query: 'salad',
    limit: 5,
    oauth_token: '2O1WJFKQFWUMUXZ1DUQL41UWA3H00MTTPNPBYSVNTOHXIYR4',
    v: 20180630
    // client_id: `${FOUR_SQUARE_ID}`,
    // client_secret: `${FOUR_SQUARE_API_KEY}`,
  }
  $.getJSON(FOUR_SQUARE_SEARCH_ENDPOINT, query, callback);
}

function callback(results, status) {
  console.log('foursquare');
  console.log(status);
  console.log(results);
  console.log(results.response);
  console.log(results.response.venues[0].location.lat);
  let salads = results.response.venues;
  for (let i = 0; i < salads.length; i++) {
    let location = {lat: salads[i].location.lat, lng: salads[i].location.lng};
    createMarker(location);
  }
  createSaladList(salads);
  // if (status === google.maps.places.PlacesServiceStatus.OK) {
  //   for (var i = 0; i < results.length; i++) {
  //     createMarker(results[i]);
  //   }
  //   createSaladList(results);
  // }
}

function createMarker(location) {
  // let placeLoc = {place.location.lat, place.location.lng};
  console.log(location);
  let marker = new google.maps.Marker({
    map: map,
    position: location
  });
  // google.maps.event.addListener(marker, 'click', function() {
  //   infowindow.setContent(place.name);
  //   infowindow.open(map, this);
  // });
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

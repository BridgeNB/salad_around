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
      $('.welcome_page').css('display', 'none');
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
}

function updateMap() {
  map.setCenter({lat: latitude, lng: longitude});
  getDataFromApi(createMarkers);
}

/******** data retrieve ******/
function getDataFromApi(callback) {
  const query = {
    ll: `${latitude},${longitude}`,
    query: 'salad',
    limit: 5,
    oauth_token: '2O1WJFKQFWUMUXZ1DUQL41UWA3H00MTTPNPBYSVNTOHXIYR4',
    v: 20180630
  }
  $.getJSON(FOUR_SQUARE_SEARCH_ENDPOINT, query, createMarkers);
}

function createMarkers(results, status) {
  let salads = results.response.venues;
  let bounds = new google.maps.LatLngBounds();
  let infowindow = new google.maps.InfoWindow();
  let maker;
  console.log(salads);
  for (let i = 0; i < salads.length; i++) {
    let location = new google.maps.LatLng(salads[i].location.lat, salads[i].location.lng);
    marker = new google.maps.Marker({
      map: map,
      position: location
    });
    bounds.extend(location);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent('<h3>' + (i + 1) + '\. ' +  salads[i].name + '</h3>');
        infowindow.open(map, marker);
      }
    })(marker, i));
    map.fitBounds(bounds);

  }
  createSaladList(salads);
}

/******* Salad List **********/
function createSaladList(places) {
  const saladList = places.map((place, index) => renderResult(index, place))
  $('.salad_list').html(saladList);
}

function renderResult(index, place) {
  return `
    <div class="item">
      <h4>${index + 1}. ${place.name}</h4>
      <h6>${place.location.address}</h6>
    </div>
  `;
}

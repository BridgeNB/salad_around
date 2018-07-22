const GOOGLE_SEARCH_ENDPOINT = 'https://www.google.com/maps/embed/v1/search';
const GOOGLE_API_KEY = 'AIzaSyBDQ7sLSCjnrRNWpM2jgBdUD8_TGZsTHfg';
const YELP_SEARCH_ENDPOINT = 'https://api.yelp.com/v3/businesses/search';
const YELP_API_KEY = 'mk7sGaCiv88uf6MSDmlSwzQzx7by9lzSij0drVP0_CfP8_o02dsEGykWMtlsuLMUVhXuh2KzUjXOZjCnFBSxMMs48P99VHwo8bNh7Vw2HyYO4Kno2HSgxjs-t31LW3Yx';

// https://api.yelp.com/v3/businesses/search?term='salad'&latitude=37.786882&longitude=-122.399972&radius=8000
// "https://www.google.com/maps/embed/v1/search?q=salad%20near%2090012&key=AIzaSyBuBYYOAhc9oPX2SUjzEjz3vdT8mZ4u-84"

let yelp_settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.yelp.com/v3/businesses/search?term='salad'&latitude=37.786882&longitude=-122.399972&radius=8000",
  "method": "GET",
  "headers": {
    "authorization": "Bearer mk7sGaCiv88uf6MSDmlSwzQzx7by9lzSij0drVP0_CfP8_o02dsEGykWMtlsuLMUVhXuh2KzUjXOZjCnFBSxMMs48P99VHwo8bNh7Vw2HyYO4Kno2HSgxjs-t31LW3Yx",
    "cache-control": "no-cache",
  }
}

function retrieveDataFromApi (query, yelp_settings) {
  $.ajax(yelp_settings).done(function (response) {
    console.log(response);
  });
}

function renderResult(result) {
  console.log('here');
  console.log(result);
  return `
    <div>
      ${result};
    </div>
  `;
}

function displaySearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    retrieveDataFromApi(query, displaySearchData);
  });
}

$(watchSubmit);

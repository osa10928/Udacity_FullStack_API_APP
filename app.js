import ko from 'knockout';


export function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 29.7706 , lng: -95.4120 },
    zoom: 16
  });
  infoWindow = new google.maps.InfoWindow();
  for (var i=0;i<locations.length; i++) {
    var marker = new google.maps.Marker({
      position: locations[i].position,
      map: map,
      title: locations[i].title,
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      id: i
    });
    markers.push(marker);
    marker.addListener('click', function() {
      populateInfoWindow(this, infoWindow)
    });
  }
}

export function googleError() {
  $('#map').html('<div id="error-message"><h1>Resource Failed To Load!</h1>' +
   '<p>The resource/map you requested failed to load. Here are some trouble shooting methods</p>' +
   '<ul>' +
       '<li>Check that you have a strong internet connection</li>' +
       '<li>Check that your browser has javascript enabled</li.' +
       '<li>After checking these items, try reloading the page' +
   '</ul></div>')
}


window.initMap = initMap;
window.googleError = googleError;
let map;
let markers = [];
let locations = [
  {position: {lat: 29.7703, lng: -95.4157}, title: 'Kung Fu Saloon'},
  {position: {lat: 29.7704, lng: -95.4151}, title: 'Concrete Cowboy'},
  {position: {lat:29.7706 , lng: -95.4130}, title: 'Lincoln Bar'},
  {position: {lat: 29.7717, lng: -95.4089}, title: 'AURA'},
  {position: {lat: 29.7694, lng: -95.4110}, title: 'Fuego\'s Saloon'}
];
let infoWindow;

function populateInfoWindow(marker, infoWindow) {
  // reset marker colors, then set selected marker color to green
  markers.map(marker => { marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')})
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

  // find div of selected marker and highlight by adding class
  if (infoWindow.marker != marker) {
    infoWindow.marker = marker
    let featuredLocations = document.getElementsByClassName('featured-locations')
    for (var i=0;i<featuredLocations.length;i++) {
      if (featuredLocations[i].id === marker.title) {
        featuredLocations[i].classList.add('location-selected')
      } else {
        featuredLocations[i].className.indexOf('location-selected') > -1 ? featuredLocations[i].classList.remove('location-selected') : null
      }
    }
  }
  document.getElementById(marker.title).classList.add('location-selected')
  infoWindow.setContent('<div id="info-Window"><h4>' + marker.title + '</h4></div>')
  infoWindow.open(map, marker)
  infoWindow.addListener('closeclick', function() {
    document.getElementById(marker.title).classList.remove('location-selected')
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
  })
  setInfoWindow(marker)
}

function setInfoWindow(marker) {
  let parameters = marker.title.replace(" ", "+")
  let url = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org//w/api.php?action=query&format=json&origin=*&list=search&srsearch=" + parameters +"&srlimit=1&srprop=snippet"
  $.ajax({
    url: url,
    type: "GET",
    datatype: "json",
  }) .done((json) => {
    let link =  "https:/en.wikipedia.org/?curid=" + json.query.search[0]['pageid']
    infoWindow.setContent('<div id="info-Window"><h4>' + marker.title + '</h4>' +
    '<p>Feeling Luck? Click <a target="_blank" href="' + link + '">THIS</a> link to search <i>' + marker.title + '</i> in Wikipedia</p>' +
    '<p>(Warning, <i>' + marker.title + '</i> might not have an actual wikipedia page)</p></div>')
  }) .fail(( xhr, status, errorThrown ) => {
    infoWindow.setContent('<div id="info-Window"><h4>' + marker.title + '</h4>' +
    '<p>Failed to load resource for "Feeling Lucky" game. Try reloading page</p></div>')
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })
}


class ViewModel {
  constructor() {
    this.locations = JSON.parse(JSON.stringify(locations))
    this.filterInput = ko.observable()
    this.toggleOpenClose = () => {
      let bars = [];
      let filterSection = document.getElementById("filter-section")
      filterSection.classList.toggle('hide')
      bars.push(document.getElementsByClassName("bar1")[0])
      bars.push(document.getElementsByClassName("bar2")[0])
      bars.push(document.getElementsByClassName("bar3")[0])
      bars.map(bar => {bar.classList.toggle("change")})
    }
    this.filterLocations = ko.computed(() => {
      let locations = JSON.parse(JSON.stringify(this.locations))
      if (this.filterInput()) {
        let filterInput = this.filterInput().trim().replace(/ +/g, ' ').toLowerCase()
        locations = locations.filter((location) => {
          let title = location.title.trim().replace(/ +/g, ' ').toLowerCase()
          return title.indexOf(filterInput) !== -1
        })
      }
      return locations
    })
    this.filterMarkers = ko.computed(() => {
      if (this.filterInput()) {
        let filterInput = this.filterInput().trim().replace(/ +/g, ' ').toLowerCase()
        markers.map((marker) => {
          let title = marker.title.trim().replace(/ +/g, ' ').toLowerCase()
          if ((title).indexOf(filterInput) === -1) {
            marker.setMap(null)
          } else {
            marker.setMap(map)
          }
        })
      } else {
        markers.map((marker) => {
          marker.setMap(map)
        })
      }
    })
    this.resetFilters = () => {
      this.filterInput("")
    }
    this.popInfoWindow = (e) => {
      let marker = markers.filter((marker) => {
        return e.title === marker.title
      })
      google.maps.event.trigger(marker[0], 'click')
    }
  }
}


ko.applyBindings(new ViewModel())

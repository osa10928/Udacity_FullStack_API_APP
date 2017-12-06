import ko from 'knockout';
import * as $ from 'jquery';


window.initMap = initMap;
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
  if (infoWindow.marker != marker) {
    infoWindow.marker = marker
    infoWindow.setContent('<div>' + marker.title + '</div>')
    let featuredLocations = document.getElementsByClassName('featured-locations')
    for (var i=0;i<featuredLocations.length;i++) {
      if (featuredLocations[i].id === marker.title) {
        featuredLocations[i].classList.add('location-selected')
      } else {
        featuredLocations[i].className.indexOf('location-selected') > -1 ? featuredLocations[i].classList.remove('location-selected') : null
      }
    }
  }
  infoWindow.open(map, marker)
  infoWindow.addListener('closeclick', function() {
    document.getElementById(marker.title).classList.remove('location-selected')
  })
  document.getElementById(marker.title).classList.add('location-selected')
}

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
      id: i
    });
    markers.push(marker);
    marker.addListener('click', function() {
      populateInfoWindow(this, infoWindow)
    });
  }
}


class MyApp {
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
      for (var i in bars) {
        bars[i].classList.toggle("change")
      }
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
    this.filterMarkers = () => {
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
    }
    this.fireFilters = () => {
      console.log("lalala")
      this.filterMarkers()
      this.filterLocations
    }
    this.resetFilters = () => {
      this.filterInput("")
      this.fireFilters()
    }
    this.popInfoWindow = (e) => {
      let marker = markers.filter((marker) => {
        return e.title === marker.title
      })
      google.maps.event.trigger(marker[0], 'click')
    }
  }
}


ko.applyBindings(new MyApp())

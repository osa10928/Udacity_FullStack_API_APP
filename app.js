import ko from 'knockout';
import * as $ from 'jquery';


window.initMap = initMap;
let map;
let markers = [];
let locations = [
  {position: {lat: 29.7703, lng: -95.4157}, title: 'Kungfu Saloon'},
  {position: {lat: 29.7704, lng: -95.4151}, title: 'Concrete Cowboy'},
  {position: {lat:29.7706 , lng: -95.4130}, title: 'Lincoln Bar'},
  {position: {lat: 29.7717, lng: -95.4089}, title: 'AURA'},
  {position: {lat: 29.7694, lng: -95.4110}, title: 'Fuego\'s Saloon'}
];

export function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 29.7704458 , lng: -95.4120785 },
    zoom: 16
  });
  var kungFu = {lat: 29.7703, lng: -95.4157}
  for (var i=0;i<locations.length; i++) {
    var marker = new google.maps.Marker({
      position: locations[i].position,
      map: map,
      title: locations[i].title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    markers.push(marker);
  }
}


class MyApp {
  constructor() {
    this.markers = markers;
    this._locations = JSON.parse(JSON.stringify(locations))
    this.filterInput = ""
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
  }
  get locations() {
    if (this.filterInput) {
      this.filterInput = this.filterInput.trim().replace(/ +/g, ' ').toLowerCase()
      locations = this._locations.filter((location) => {
        location.title = location.title.trim().replace(/ +/g, ' ').toLowerCase()
        return location.title.indexOf(this.filterInput) !== -1
      })
    }
    return locations
  }
}


ko.applyBindings(new MyApp())

'use strict';

// // prettier-ignore
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//the navigator geolocation takes two callbacks functions
//the first call back is when the geolocation is gotten successfully (coordinates is gotten)
//the second call back occurs when the geolocation is not successfully gotten;


class App {
  #map;
  #mapEvent
  constructor() {
    this._getPosition()
    form.addEventListener('submit',  this._newWorkOut.bind(this));
    inputType.addEventListener('change', this._toggleElevationField.bind(this))
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
        
        function () {
          alert('couldnt get position');
        }
      );
  }

  _loadMap(position) {

    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));

  
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
   

  }

  _toggleElevationField() {


    inputElevation
        .closest('.form__row')
        .classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
  }

  _newWorkOut(e) {

    e.preventDefault();

    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        ' ';

    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout ')
      .openPopup();
  }
  
}

const app = new App()




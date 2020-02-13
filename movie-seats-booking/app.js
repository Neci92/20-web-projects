const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // You can use any valid css selector
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; // + logs a number instead of string

// get data from local storage
function populateUi() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null &&  selectedSeats.length > 0) {
        seats.forEach((seat, i) => {
            if(selectedSeats.indexOf(i) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    updateSelectionCount();
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovie', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectionCount() {
    const selectedSeats = document.querySelectorAll('.row .selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); //spread operator    

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

populateUi();

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value; // + logs a number instead of string

    setMovieData(e.target.selectedIndex, e.target.value); // Selected index gets index of select > option
    updateSelectionCount();
})

// seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSelectionCount();
});


// Grabbing seats and movie
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');  //puts all in a node list
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = Number(movieSelect.value); 

//Save selected movie and price
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}


function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    //To save locally
    //Copy selected seats into array
    //Map through array
    //return a new array indexes

    const seatIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
    
    const selcedSeatCounts = selectedSeats.length;
    
    count.innerHTML = selcedSeatCounts;
    total.innerHTML = selcedSeatCounts * ticketPrice;
}


//Get data from localStorage and populate
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats)
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


// Movie Select Event
movieSelect.addEventListener('change', e=>{
    ticketPrice = Number(e.target.value);
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount();
});

container.addEventListener('click', e =>{
    if(
        e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')) {
            e.target.classList.toggle('selected');
            updateSelectedCount();
    }
});

//IntialCount
updateSelectedCount();
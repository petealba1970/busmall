'use strict';
var picStorage = [];
var randomPics = [];
var clickCounter = 0;
var MAX_CLICK_COUNTER = 25;

function getRandomPicIndex() {
  return Math.floor(Math.random() * (picStorage.length));
}
var newValues = [];

function select3PicsAndRender() {
  // select 3 pics :p
  // we need a loop to select numbers

  randomPics = [];


  while (randomPics.length < 3) {
    var nextRandomValue = getRandomPicIndex();
    if (nextRandomValue === newValues[0] || nextRandomValue === newValues[1] || nextRandomValue === newValues[2]) {
      nextRandomValue = getRandomPicIndex();
    } else if (!randomPics.includes(nextRandomValue)) {
      randomPics.push(nextRandomValue);
    }
  }
  newValues = randomPics;
  console.log('kkkkkk' + newValues);
  console.log(randomPics);
  // render the pics :D - This is a great place to increase your times shown ;)
  var placeholder0 = document.getElementById('placeholder-0');
  var placeholder1 = document.getElementById('placeholder-1');
  var placeholder2 = document.getElementById('placeholder-2');
  // Invariants:
  // randomPics has 3 pics!

  picStorage[randomPics[0]].render(placeholder0);
  picStorage[randomPics[0]].timesShown++;
  picStorage[randomPics[1]].render(placeholder1);
  picStorage[randomPics[1]].timesShown++;
  picStorage[randomPics[2]].render(placeholder2);
  picStorage[randomPics[2]].timesShown++;


}

var Picture = function (name, picture) {
  this.name = name;
  this.picture = picture;
  this.timesClicked = 0;
  this.timesShown = 0; // hint hint ;). You may need to use this for your app ;)

  this.markClick = function () {
    this.timesClicked++;
  }
  this.render = function (domReference) {
    domReference.src = picture;
  }
  picStorage.push(this);
}


var bagPic = new Picture('Bag', './pictures/bag.jpg');
var bananaPic = new Picture('Banana', './pictures/banana.jpg')
var bathroomPic = new Picture('Bathroom', './pictures/bathroom.jpg')
var bootsPic = new Picture('Boots', './pictures/boots.jpg')
var breakfastPic = new Picture('Breakfast', './pictures/breakfast.jpg');
var bubblegumPic = new Picture('Bubble Gum', './pictures/bubblegum.jpg')
var chairPic = new Picture('Chair', './pictures/chair.jpg')
var cthulhuPic = new Picture('Cthulhu', './pictures/cthulhu.jpg')
var dogduckPic = new Picture('Dog-Duck', './pictures/dog-duck.jpg');
var dragonPic = new Picture('Dragon', './pictures/dragon.jpg')
var penPic = new Picture('Pen', './pictures/pen.jpg')
var petsweepPic = new Picture('Pet Sweep', './pictures/pet-sweep.jpg')
var scissorsPic = new Picture('Scissors', './pictures/scissors.jpg');
var sharkPic = new Picture('Shark', './pictures/shark.jpg')
var sweepPic = new Picture('Sweep', './pictures/sweep.png')
var tauntaunPic = new Picture('Tauntaun', './pictures/tauntaun.jpg')
var unicornPic = new Picture('Unicorn', './pictures/unicorn.jpg');
var usbPic = new Picture('USB', './pictures/usb.gif')
var watercanPic = new Picture('Water Can', './pictures/water-can.jpg')
var wineglassPic = new Picture('Wine Glass', './pictures/wine-glass.jpg')


function clickManager(event) {
  clickCounter++;
  if (clickCounter < MAX_CLICK_COUNTER) {
    var picIndex;

    if (event.target.id === 'placeholder-0') {
      picIndex = 0;

    } else if (event.target.id === 'placeholder-1') {
      picIndex = 1;
    } else {
      picIndex = 2;
    }
    var clickedPic = picStorage[randomPics[picIndex]];
    clickedPic.markClick();

    select3PicsAndRender();
  } else {

    createPicChart();

  }


}



// I know the id of the clicked picture
// I know I have an array called randomGoats with the randomly selected goats
// I know I have an array called goatStorage with all the goats
// I know that I can do goatStorage[randomGoats[...]] to select a specific goat


select3PicsAndRender();

var placeholder0 = document.getElementById('placeholder-0');
var placeholder1 = document.getElementById('placeholder-1');
var placeholder2 = document.getElementById('placeholder-2');

placeholder0.addEventListener('click', clickManager);
placeholder1.addEventListener('click', clickManager);
placeholder2.addEventListener('click', clickManager);


function createPicChart() {
  var nameArray = [];
  var clickArray = [];

  for (var i = 0; i < picStorage.length; i++) {
    nameArray.push(picStorage[i].name);
    clickArray.push(picStorage[i].timesClicked);
  }
  var context = document.getElementById('chart').getContext('2d');
  var picChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: 'Pic Clicks',
          data: clickArray,
          backgroundColor: 'rgb(255,99,132)',
          borderColor: 'rgb(255,99,132)',
        },
        {
          label: 'Pic Clicks',
          data: clickArray,
        }
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            }
          },
        ],
      }
    },
  });
}

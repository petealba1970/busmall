'use strict';
var PIC_DATA = 'picData';


var picStorage = [];
var randomPics = [];
var clickCounter = 0;
var MAX_CLICK_COUNTER = 25;


function getRandomPicIndex() {
  return Math.floor(Math.random() * (picStorage.length));
}
var newValues = [];

function select3PicsAndRender() {

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

  var placeholder0 = document.getElementById('placeholder-0');
  var placeholder1 = document.getElementById('placeholder-1');
  var placeholder2 = document.getElementById('placeholder-2');

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
  this.timesShown = 0;

  this.markClick = function () {
    this.timesClicked++;
  }
  this.render = function (domReference) {
    domReference.src = this.picture;
  }
  this.loadData = function (data) {

    this.timesClicked = data.timesClicked;
    this.timesShown = data.timesShown;
    this.name = data.name;
    this.picture = data.picture;
  }
}

if (localStorage.getItem(PIC_DATA) === null) {

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

  picStorage.push(bagPic);
  picStorage.push(bananaPic);
  picStorage.push(bathroomPic);
  picStorage.push(bootsPic);
  picStorage.push(breakfastPic);
  picStorage.push(bubblegumPic);
  picStorage.push(chairPic);
  picStorage.push(cthulhuPic);
  picStorage.push(dogduckPic);
  picStorage.push(dragonPic);
  picStorage.push(penPic);
  picStorage.push(petsweepPic);
  picStorage.push(scissorsPic);
  picStorage.push(sharkPic);
  picStorage.push(sweepPic);
  picStorage.push(tauntaunPic);
  picStorage.push(unicornPic);
  picStorage.push(usbPic);
  picStorage.push(watercanPic);
  picStorage.push(wineglassPic);

} else {
  var jsonData = localStorage.getItem(PIC_DATA);
  var data = JSON.parse(jsonData);

  for (var i = 0; i < data.length; i++) {
    var newPicture = new Picture('', '');
    newPicture.loadData(data[i]);
    picStorage.push(newPicture);
  }
}

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
    savePictureDataToLocalStorage();
    createPicChart();
  }
  function savePictureDataToLocalStorage() {
    var jsonData = JSON.stringify(picStorage);
    localStorage.setItem(PIC_DATA, jsonData);
  }
}

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
  var shownArray = [];

  for (var i = 0; i < picStorage.length; i++) {
    nameArray.push(picStorage[i].name);
    clickArray.push(picStorage[i].timesClicked);
    shownArray.push(picStorage[i].timesShown);
  }
  Chart.defaults.global.defaultFontColor = 'white';
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
        },
        {
          label: 'Pics Shown',
          data: shownArray,
          backgroundColor: 'rgb(150,50,50)',
          borderColor: 'rgb(150,50,50)'
        },
        {
          label: 'Pic Shown',
          data: shownArray,
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












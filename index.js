/*
----------------------------------------------
 *  Project:    Star 365 Day Clock Face
 *  Mail:       darahbass@gmail.com
 *  Github:     SarahBass
 ---------------------------------------------
 NOTES: 
 This Clock will be larger than normal
 because it has so many image backgrounds.
 
 Images are ALL Free Licence https://unsplash.com
 
 The use of jpegs help reduce size from 229 mb
 300x300PNG to 20 mb JPEG for each background
 -jpegs load slower than PNG in Fitbit Studio-
  USE PNG for numbers and animations for
 faster upload, and jpeg for backgrounds
 ---------------------------------------------
*/

/*--- Import Information from user Account ---*/
import { geolocation } from "geolocation";
import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from 'power';
import { display } from "display";
import { today as userActivity } from "user-activity";
import { Accelerometer } from "accelerometer";
import { vibration } from "haptics";

/*--- Create Local Variables for Information Storage ---*/
let sunrise = 6;  
let sunset = 17;  
let bedtime = 22;
let lunch = 12;
let breakfast = 7;
let dinner = 18;

/*--- Import Information from index.gui ---*/

let background = document.getElementById("background");
let ampm = document.getElementById("ampm");  
let date = document.getElementById("date");
let month = document.getElementById("month");
let day = document.getElementById("day");
let year = document.getElementById("year");
let hourhand = document.getElementById("hourhand");
let minutehand = document.getElementById("minutehand");
let minutehand2 = document.getElementById("minutehand2");
let colon = document.getElementById("colon");


// Update the clock every second for steps to be accurate
//Keep in mind it will check your heart rate every second, 
//and it will drain your battery more the faster you update
clock.granularity = "seconds";

// Get a handle on the <text> elements 
const myLabel = document.getElementById("myLabel"); // Clock
const batteryLabel = document.getElementById("batteryLabel");
const greenbatteryLabel = document.getElementById("greenbatteryLabel");
const redbatteryLabel = document.getElementById("redbatteryLabel");
const stepsLabel = document.getElementById("stepsLabel");
const calendarLabel = document.getElementById("calendarLabel");
const heartRateLabel = document.getElementById("heartRateLabel");



// Update the <text> element every tick with the current time
//This is using .util to export and import accurate time
//This is where you put all functions that need to update
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let months = today.getMonth();
  let days = today.getDay();
  let dates = today.getDate();
  let years = today.getFullYear();
  
  //There are lots of ways to retrieve data on Month, day, year, etc
  //I chose just calling upon Javascript through the object 'today'
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  //I have seen others use Util to automate this in Util or link to .libs to do this too
 
  
  
  /*--- Update Stats for Screen ---*/
  stepsLabel.text = userActivity.adjusted.steps;
  checkAndUpdateBatteryLevel();
  //AM PM -Change the image based on 24 hours
  if (util.zeroPad(hours) <12){
  ampm.image = "am.png";}
  if (util.zeroPad(hours) >= 12){ampm.image = "pm.png";}
  
  
  //Setting Preference 24 vs 12
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  /*--- Calling util in common to export/import time ---*/
  let mins = util.zeroPad(today.getMinutes());
  
  /*--- SHOW TIME ---*/
  //Fitbit does not have many text options natively to show text
  //Check out these examples to see how people design their clock:
  //https://github.com/Fitbit/ossapps  
  //You can use text or images to show time
  
  /*--- OPTION 1: TEXT ---*/
  //This is how to set a clock with text 
  myLabel.text = `${hours}:${mins}`; 
  
   /*--- OPTION 2: IMAGES ---*/
  //Messy and simple way to set time with your images replacing text
  if (hours == 1){hourhand.image = "hoursfile/hour1.png";}
  else if (hours == 2){hourhand.image = "hoursfile/hour2.png";}
  else if (hours == 3){hourhand.image = "hoursfile/hour3.png";}
  else if (hours == 4){hourhand.image = "hoursfile/hour4.png";}
  else if (hours == 5){hourhand.image = "hoursfile/hour5.png";}
  else if (hours == 6){hourhand.image = "hoursfile/hour6.png";}
  else if (hours == 7){hourhand.image = "hoursfile/hour7.png";}
  else if (hours == 8){hourhand.image = "hoursfile/hour8.png";}
  else if (hours == 9){hourhand.image = "hoursfile/hour9.png";}
  else if (hours == 10){hourhand.image = "hoursfile/hour10.png";}
  else if (hours == 11){hourhand.image = "hoursfile/hour11.png";}
  else{hourhand.image = "hoursfile/hour12.png"}
  
  //Minute hand % 10 will return ones digit
  if (mins%10 == 1 ){minutehand2.image = "minutesfile/1.png";}
  else if (mins%10 == 2 ){minutehand2.image = "minutesfile/2.png";}
  else if (mins%10 == 3 ){minutehand2.image = "minutesfile/3.png";}
  else if (mins%10 == 4 ){minutehand2.image = "minutesfile/4.png";}
  else if (mins%10 == 5 ){minutehand2.image = "minutesfile/5.png";}
  else if (mins%10 == 6 ){minutehand2.image = "minutesfile/6.png";}
  else if (mins%10 == 7 ){minutehand2.image = "minutesfile/7.png";}
  else if (mins%10 == 8 ){minutehand2.image = "minutesfile/8.png";}
  else if (mins%10 == 9 ){minutehand2.image = "minutesfile/9.png";}
  else if (mins%10 == 0 ){minutehand2.image = "minutesfile/0.png";}
  else{minutehand.image = "minutesfile/00.png";
      minutehand2.image = " ";}
  
  //Minute hand /10 will return tens digit, but ints don't exist in Javascript
  //Use the parseInt function to turn quotient into an integer
    if ( parseInt(mins/10) == 1 ){minutehand.image = "minutesfile/1.png";}
  else if (parseInt(mins/10) == 2 ){minutehand.image = "minutesfile/2.png";}
  else if ( parseInt(mins/10) == 3 ){minutehand.image = "minutesfile/3.png";}
  else if (parseInt(mins/10) == 4 ){minutehand.image = "minutesfile/4.png";}
  else if (parseInt(mins/10) == 5 ){minutehand.image = "minutesfile/5.png";}
  else if (parseInt(mins/10) == 6 ){minutehand.image = "minutesfile/6.png";}
  else if (parseInt(mins/10) == 7 ){minutehand.image = "minutesfile/7.png";}
  else if (parseInt(mins/10) == 8 ){minutehand.image = "minutesfile/8.png";}
  else if (parseInt(mins/10) == 9 ){minutehand.image = "minutesfile/9.png";}
  else if (parseInt(mins/10) == 0 ){minutehand.image = "minutesfile/0.png";}
  else{minutehand.image = "minutesfile/00.png";
      minutehand2.image = " ";}
  
  //Update Scene changes date information and displays background
  //Change the jpeg every 24 hours becuase it loads slower
   if (hours === 0 && mins === 0) {
  resetDate();}
  updateScene();

   /*--- Battery Functions ---*/
  display.addEventListener('change', function () {
    if (this.on) {checkAndUpdateBatteryLevel();} 
});
  
battery.onchange = (charger, evt) => {
    greenBatteryLevel();
}

function greenBatteryLevel() {
    greenbatteryLabel.text = `${battery.chargeLevel}%`;
}

function checkAndUpdateBatteryLevel() {
  if (battery.chargeLevel > 30){
    batteryLabel.text = `${battery.chargeLevel}%`;}
  else {redbatteryLabel.text = `${battery.chargeLevel}%`;}
}

  /*--- Change Date and Background Functions ---*/
  function updateScene() {
    date.text = dates;
    printmonth();
    printday();
    year.text = years;
  }
  
function printday(){
  if (days == 0){day.text = "Sunday,";}
  else if (days == 1){day.text = "Monday,";}
  else if (days == 2){day.text = "Tuesday,";}
  else if (days == 3){day.text = "Wednesday,";}
  else if (days == 4){day.text = "Thursday,";}
  else if (days == 5){day.text = "Friday,";}
  else if (days == 6){day.text = "Saturday,";}
  else {day.text = "DAY";}
}

  function printmonth(){
  if (months == 0){month.text = "January";}
  else if (months == 1){month.text = "February";}
  else if (months == 2){month.text = "March";}
  else if (months == 3){month.text = "April";}
  else if (months == 4){month.text = "May";}
  else if (months == 5){month.text = "June";}
  else if (months == 6){month.text = "July";}
  else if (months == 7){month.text = "August";}
  else if (months == 8){month.text = "Septemper";}
  else if (months == 9){month.text = "October";}
  else if (months == 10){month.text = "November";}
  else if (months == 11){month.text = "December";}
  else {month.text = "MONTH";}
}


 function changeBackground(){
   
 } 
if (months == 0){
  //jan/${[dates].jpeg}`;
}
  else if (months == 1){
    
  }
  else if (months == 2){
    
  }
  else if (months == 3){
  }
  else if (months == 4){
  }
  else if (months == 5){
  }
  else if (months == 6){
  }
  else if (months == 7){
  }
  else if (months == 8){
  }
  else if (months == 9){
  }
  else if (months == 10){
  }
  else if (months == 11){
  }
  else {}

  
  
}



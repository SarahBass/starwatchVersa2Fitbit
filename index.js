/*
 *  Project:    Versa 2 Dog Clock Face
 *  Mail:       darahbass@gmail.com
 *  Github:     SarahBass
*/
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

let sunrise;
let sunset;
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
// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const batteryLabel = document.getElementById("batteryLabel");
const greenbatteryLabel = document.getElementById("greenbatteryLabel");
const redbatteryLabel = document.getElementById("redbatteryLabel");
const stepsLabel = document.getElementById("stepsLabel");
const calendarLabel = document.getElementById("calendarLabel");
const heartRateLabel = document.getElementById("heartRateLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let months = today.getMonth();
  let days = today.getDay();
  let dates = today.getDate();
  let years = today.getFullYear();
  
  
  stepsLabel.text = userActivity.adjusted.steps;
  checkAndUpdateBatteryLevel();
  
  if (util.zeroPad(hours) <12){
  ampm.image = "am.png";}
  if (util.zeroPad(hours) >= 12){ampm.image = "pm.png";}
  
   
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
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
  
   if (hours === 0 && mins === 0) {
  resetDate();}
  updateScene();

  
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


  


  
  
}



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
    month.text = months;
    day.text = days;
    year.text = years;
  }
  




  


  
  
}



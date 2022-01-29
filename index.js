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
//import { me as appbit } from "appbit";

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
let starobject = document.getElementById("starobject");
let mouthobject = document.getElementById("mouthobject");
let eyesobject = document.getElementById("eyesobject");
let cheeksobject = document.getElementById("cheeksobject");
let star = document.getElementById("star");
let mouth = document.getElementById("mouth");
let eyes = document.getElementById("eyes");
let cheeks = document.getElementById("cheeks");
  
//Update the clock every second 
clock.granularity = "seconds";

// Get a handle on the <text> elements 
const myLabel = document.getElementById("myLabel"); // Clock
const batteryLabel = document.getElementById("batteryLabel");
const greenbatteryLabel = document.getElementById("greenbatteryLabel");
const redbatteryLabel = document.getElementById("redbatteryLabel");
const stepsLabel = document.getElementById("stepsLabel");
const calendarLabel = document.getElementById("calendarLabel");
const firelabel = document.getElementById("firelabel");
const boltlabel = document.getElementById("boltlabel");
const heartlabel = document.getElementById("heartlabel");
const saturday =[
  "        Saturday,",
  "    Saturday,",
  "    Saturday,",
  "    Saturday,",
  "    Saturday,",
  "    Saturday,",
  "    Saturday,"
  ];


 /*--- Animation Groups Imported from Index.gui---*/
var demoinstance = document.getElementById("demoinstance");



//Update the <text> element every tick with the current time
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
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

  /*--- Update Stats for Screen ---*/
  
  updateScene();
  stepsLabel.text = userActivity.adjusted.steps;
  firelabel.text = userActivity.adjusted.calories;
  boltlabel.text = "0";
  heartlabel.text = "0";
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
  let seconds = today.getSeconds();
  
  /*--- OPTION 1: TIME TEXT ---*/
  //This is how to set a clock with text 
  myLabel.text = `${hours}:${mins}`; 
  
   /*--- OPTION 2: TIME IMAGES ---*/
  //set class of each number individually if needed for formatting
  
  if (hours == 1){hourhand.image = "hoursfile/hour1.png";
                  hourhand.class = "hour1";                   }
  else if (hours == 2){hourhand.image = "hoursfile/hour2.png";
                      hourhand.class = "hour";                }
  else if (hours == 3){hourhand.image = "hoursfile/hour3.png";}
  else if (hours == 4){hourhand.image = "hoursfile/hour4.png";}
  else if (hours == 5){hourhand.image = "hoursfile/hour5.png";}
  else if (hours == 6){hourhand.image = "hoursfile/hour6.png";}
  else if (hours == 7){hourhand.image = "hoursfile/hour7.png";}
  else if (hours == 8){hourhand.image = "hoursfile/hour8.png";}
  else if (hours == 9){hourhand.image = "hoursfile/hour9.png";}
  else if (hours == 10){hourhand.image = "hoursfile/hour10.png";}
  else if (hours == 11){hourhand.image = "hoursfile/hour11.png";
                        hourhand.class = "hour11";}
  else{hourhand.image = "hoursfile/hour12.png";
                    hourhand.class = "hour12";}
  
  //Minute hand % 10 will return ones digit
  if (mins%10 == 1 ){minutehand2.image =      "minutesfile/1.png";     
                                     minutehand2.class = "minute3";}
  else if (mins%10 == 2 ){minutehand2.image = "minutesfile/2.png";
                                    minutehand2.class = "minute2";}
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
    if ( parseInt(mins/10) == 1 ){   minutehand.image = "minutesfile/1.png";
                                     minutehand.class = "minute1";          }
  else if (parseInt(mins/10) == 2 ){ minutehand.image = "minutesfile/2.png";
                                     minutehand.class = "minute";            }                    
  else if ( parseInt(mins/10) == 3 ){minutehand.image = "minutesfile/3.png";}
  else if (parseInt(mins/10) == 4 ){ minutehand.image = "minutesfile/4.png";}
  else if (parseInt(mins/10) == 5 ){ minutehand.image = "minutesfile/5.png";}
  else if (parseInt(mins/10) == 6 ){ minutehand.image = "minutesfile/6.png";}
  else if (parseInt(mins/10) == 7 ){ minutehand.image = "minutesfile/7.png";}
  else if (parseInt(mins/10) == 8 ){ minutehand.image = "minutesfile/8.png";}
  else if (parseInt(mins/10) == 9 ){ minutehand.image = "minutesfile/9.png";}
  else if (parseInt(mins/10) == 0 ){ minutehand.image = "minutesfile/0.png";}
  else{minutehand.image = "minutesfile/00.png";
      minutehand2.image = " ";}
  
  //Animation using time variables for loops
  if ( mins % 2 == 0){
    if (seconds % 2 == 0){mouth.image = "star/notongue.png";}
              else{mouth.image = "star/littlemouth.png";}
              float();}
  else{       if (seconds % 2 == 0){mouthobject.image = "star/littlemouth.png";}
              else{mouthobject.image = "star/tinymouth.png";}
              stand();
}
  
 
   if (hours === 0 && mins === 0) {
   //updateScene(); Belongs here after Coding is finished
   }
 

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
    //date.text == dates + " " + monthtext + " " + daytext + " " + years; 
    date.text = dates;
    printmonth();
    printday();
    year.text = years;
    changeBackground();
  }
  //Days
  //Sloppy Practice, but a good visual organization for beginners.
function printday(){
  if (days == 0){day.text =      "       Sunday,";}
  else if (days == 1){day.text = "      Monday,";}
  else if (days == 2){day.text = "      Tuesday,";}
  else if (days == 3){day.text = "Wednesday,";}
  else if (days == 4){day.text = "    Thursday,";}
  else if (days == 5){day.text = "          Friday,";}
  else if (days == 6){if (months < 8){day.text = saturday[months]}
                      else{day.text = "    Saturday,";}}
  else {day.text = "DAY";}
}
  //Months
  function printmonth(){
  if (months == 0){month.text = "     January";}
  else if (months == 1){month.text =  "    February";}
  else if (months == 2){month.text =  "        March";}
  else if (months == 3){month.text =  "           April";}
  else if (months == 4){month.text =  "            May";}
  else if (months == 5){month.text =   "           June";}
  else if (months == 6){month.text =  "            July";}
  else if (months == 7){month.text =  "       August";}
  else if (months == 8){month.text =  "Septemper";}
  else if (months == 9){month.text =  "     October";}
  else if (months == 10){month.text = " November";}
  else if (months == 11){month.text = " December";}
  else {month.text = "MONTH";}
}

//You can use a convienent way to find your and upload your images
//"file location" + number variable + ".imageformat" 

 function changeBackground(){ 
  
  if (months == 0){
    if ((dates == 3)||(dates == 5)||(dates == 10)||(dates == 15)||
       (dates == 16)||(dates == 20)||(dates == 24)||(dates == 28)){
         background.image = "jan/" + dates + ".jpeg";}
    else{background.image = ("plain/" + dates + ".jpeg"); }}
    
    else if (months == 1){
        if (dates < 22 ){background.image = "feb/" + dates + ".jpeg";}
        else{background.image = ("plain/" + dates + ".jpeg"); }}
    
    else if (months == 2){
       if ((dates == 1)||(dates == 2)||(dates == 10)||(dates == 15)||
           (dates == 16)||(dates == 17)||(dates == 20)||(dates == 21)||
          (dates == 26)||(dates == 27))
           {background.image = "mar/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); }}
    
    else if (months == 3){
       if ((dates == 1)||(dates == 2)||(dates == 3)||(dates == 5)||
       (dates == 10)||(dates == 15)||(dates == 16)||(dates == 17)){
            background.image = "apr/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); }}
    
    else if (months == 4){
       if ((dates == 1)||(dates == 2)||(dates == 4)||(dates == 5)||
       (dates == 8)||(dates == 10)||(dates == 12)||(dates == 20)||
       (dates == 21)||(dates == 25)||(dates == 29)){
           background.image = "may/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); }}
    
    else if (months == 5){
       if ((dates == 1)||(dates == 5)||(dates == 6)||(dates == 10)||
       (dates == 15)||(dates == 17)){background.image = "jun/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); }}
        
    else if (months == 6){
       if ((dates == 1)||(dates == 4)||(dates == 7)||(dates == 10)||
       (dates == 11)||(dates == 15)||(dates == 20)(dates == 22)||(dates == 25))
           {background.image = "jul/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); }}
           
   else if (months == 7){
       if ((dates == 1)||(dates == 3)||(dates == 5)||(dates == 10)||
       (dates == 15)||(dates == 20)){background.image = "aug/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); }}    
              
   else if (months == 8){
       if ((dates == 1)||(dates == 5)||(dates == 10)||(dates == 11)||
       (dates == 25)||(dates == 26)||(dates == 27)){
            background.image = "sep/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); }}   
      
   else if (months == 9){
       if ((dates == 1)||(dates == 3)||(dates == 5)||(dates == 13)||
       (dates == 20)||(dates == 31)){background.image = "oct/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); }} 
         
   else if (months == 10){
       if ((dates == 1)||(dates == 5)||(dates == 10)||(dates == 15)||
       (dates == 25)){background.image = "nov/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); } }
         
   else if (months == 11){
       if ((dates == 1)||(dates == 2)||(dates == 3)||(dates == 4)||
       (dates == 5)||(dates == 10)||(dates == 18)||(dates == 19)||
       (dates == 20)||(dates == 21)||(dates == 22)||(dates == 23)||
       (dates == 24)||(dates == 25)){
            background.image = "dec/" + dates + ".jpeg";}
       else{background.image = ("plain/" + dates + ".jpeg"); } }
         
   else {}  
}

//Animation Functions   
function float (){
    star.image = "star/yellow.png";
  eyes.image = "star/eyes.png";
  mouth.image;
  cheeks.image = "star/cheeks.png";      
  starobject.image = "";
  eyesobject.image = "";
  mouthobject.image = "";
  cheeksobject.image = "";  
  setTimeout(() => {
  demoinstance.animate("enable"); 
   }, 600);
}  

function stand(){
  star.image = "";
  eyes.image = "";
  mouth.image = "";
  cheeks.image = "";    
  starobject.image = "star/yellow.png";
  eyesobject.image = "star/closedeyes.png";
  mouthobject.image;
  cheeksobject.image = "star/cheeks.png";  
}  
  
}


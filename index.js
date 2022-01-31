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
let daytext = "day";
let monthtext = "month";
let goalreached = "NONE";
let selected = 0;

/*--- Import Information from index.gui ---*/

let background = document.getElementById("background");
let ampm = document.getElementById("ampm");  
let date = document.getElementById("date");
let hourhand = document.getElementById("hourhand");
let minutehand = document.getElementById("minutehand");
let minutehand2 = document.getElementById("minutehand2");
let colon = document.getElementById("colon");
let starobject = document.getElementById("starobject");
let mouthobject = document.getElementById("mouthobject");
let eyesobject = document.getElementById("eyesobject");
let cheeksobject = document.getElementById("cheeksobject");
let cheeksobject = document.getElementById("object");
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



 /*--- Animation Groups Imported from Index.gui---*/
var demoinstance = document.getElementById("demoinstance");

/*--- CLOCK START ---*/
clock.ontick = (evt) => {
//Update the <text> element every tick with the current time
//This is using .util to export and import accurate time
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  let today = evt.date;
  let hours = today.getHours();
  let months = today.getMonth();
  let days = today.getDay();
  let dates = today.getDate();
  let years = today.getFullYear();

  
   
  
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
  
  if (userActivity.adjusted.steps == 500){goalreached = "show";}
  
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
  
  /*----------------------------SHOW CLOCK-----------------------------------*/
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
  else if (mins%10 == 3 ){minutehand2.image = "minutesfile/3.png";
                          minutehand.class =  "minute2";}
  else if (mins%10 == 4 ){minutehand2.image = "minutesfile/4.png";}
  else if (mins%10 == 5 ){minutehand2.image = "minutesfile/5.png";}
  else if (mins%10 == 6 ){minutehand2.image = "minutesfile/6.png";}
  else if (mins%10 == 7 ){minutehand2.image = "minutesfile/7.png";}
  else if (mins%10 == 8 ){minutehand2.image = "minutesfile/8.png";}
  else if (mins%10 == 9 ){minutehand2.image = "minutesfile/9.png";}
  else if (mins%10 == 0 ){minutehand2.image = "minutesfile/0.png";
                          minutehand.class = "minute2";}
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
  else if (parseInt(mins/10) == 0 ){ minutehand.image = "minutesfile/0.png";}
  else{minutehand.image = "minutesfile/00.png";
      minutehand2.image = " ";}
  //ANIMATIONS
  if ( mins % 2 == 0){if (goalreached == "show"){ //if goal is reached give prize 
                         if (months == 2){star.image = "star/bunny" + numberselected + ".png"}
                         else if (months == 9){star.image = "star/ghost" + numberselected + ".png"}
                         else if (months == 11){star.image = "star/santa" + numberselected + ".png"}
                         else {star.image = "star/"+ selectnumber+ ".png"}
                      //if goal is not reached yellow star
                      }else{star.image = "star/yellow.png";}
                      //PLAY FLOAT ANIMATION
                      if (seconds % 2 == 0){mouth.image = "star/notongue.png";}
                      else{mouth.image = "star/littlemouth.png";
                      float();}
    
  }else{       if (goalreached == "show"){ //if goal is reached give prize 
                         if (months == 2){starobject.image = "star/bunny" + numberselected + ".png"}
                         else if (months == 9){starobject.image = "star/ghost" + numberselected + ".png"}
                         else if (months == 11){starobject.image = "star/santa" + numberselected + ".png"}
                         else {starobject.image = "star/"+ selectnumber+ ".png"}
                      //if goal is not reached yellow star
                      }else{starobject.image = "star/yellow.png";}
              //PLAY STAND ANIMATION
                 if ( parseInt(mins/10) == 1 ){
                   if (seconds % 2 == 0){mouthobject.image = "star/littlemouth.png";}
                   else{mouthobject.image = "star/tinymouth.png";}}
                 else if (parseInt(mins/10) == 2 ){
                   if (seconds % 2 == 0){mouthobject.image = "star/circlemouth.png";}
                   else{mouthobject.image = "star/tinycirclemouth.png";}}
                 }                    
                 else if ( parseInt(mins/10) == 3 ){
                   if (seconds % 2 == 0){mouthobject.image = "star/smallsmile.png";}
                   else{mouthobject.image = "star/mouth.png";}}  
                 }
                 else if (parseInt(mins/10) == 4 ){ 
                   if (seconds % 2 == 0){mouthobject.image = "star/littleovalmouth.png";}
                   else{mouthobject.image = "star/tinymouth.png";}}
                 }
                 else if (parseInt(mins/10) == 5 ){
                   if (seconds % 2 == 0){mouthobject.image = "star/littlemouth.png";}
                   else{mouthobject.image = "star/tinymouth.png";}}
                   
                 }
                 else if (parseInt(mins/10) == 6 ){ 
                   if (seconds % 2 == 0){mouthobject.image = "star/notongue.png";}
                   else{mouthobject.image = "star/littlemouth.png";}}
                 }
                 else if (parseInt(mins/10) == 0 ){ 
                   if (seconds % 2 == 0){mouthobject.image = "star/tinymouth.png";}
                   else{mouthobject.image = "star/tinycirclemouth.png";}}
                 
                 if (util.zeroPad(hours) == 8){"star/apple.png"}
                 else if (util.zeroPad(hours) == 9){object.image = "star/toothbrush.png";}
                 else if (util.zeroPad(hours) == 12){object.image = "star/carrot.png";}
                 else if (util.zeroPad(hours) == 15){object.image = "star/apple.png";}
                 else if (util.zeroPad(hours) == 18){object.image = "star/carrot.png";}
                 else if (util.zeroPad(hours) == 21){object.image = "star/toothbrush.png";}
                 else if (util.zeroPad(hours) == 22){object.image = "star/sleepingbear.png";}
                 else if (util.zeroPad(hours) == 23){object.image = "star/zzz.png";}
                 else if (util.zeroPad(hours) == 5){object.image = "star/zzz.png";}
                 else if (util.zeroPad(hours) == 6){object.image = "star/sleepingbear.png";}
                 else {object.image = " ";}
              stand();
      }

 /*
   if (hours === 0 && mins === 0) {
   //updateScene(); Belongs here after Coding is finished
   }
 */
/*--- Battery Functions ---*/
  display.addEventListener('change', function () {
    if (this.on) {checkAndUpdateBatteryLevel();} 

  
});
/*----------------------------END OF CLOCK-----------------------------------*/
  
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
   changeBackground();
   date.text = " " + daytext + " " + monthtext + " " + dates + " " + years + " ";  
  if (months == 0){monthtext = "January";}
  else if (months == 1){monthtext =  "February";}
  else if (months == 2){monthtext =  "March";}
  else if (months == 3){monthtext =  "April";}
  else if (months == 4){monthtext =  "May";}
  else if (months == 5){monthtext =  "June";}
  else if (months == 6){monthtext =  "July";}
  else if (months == 7){monthtext =  "August";}
  else if (months == 8){monthtext =  "Septemper";}
  else if (months == 9){monthtext =  "October";}
  else if (months == 10){monthtext = "November";}
  else if (months == 11){monthtext = "December";}
  else {monthtext = "MONTH";}
    
  if (days == 0){daytext =      "Sunday,";}
  else if (days == 1){daytext = "Monday,";}
  else if (days == 2){daytext = "Tuesday,";}
  else if (days == 3){daytext = "Wednesday,";}
  else if (days == 4){daytext = "Thursday,";}
  else if (days == 5){daytext = "Friday,";}
  else if (days == 6){if (months < 8){daytext = saturday[months]}
                      else{daytext = "    Saturday,";}}
  else {daytext = "DAY";}
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
  star.image;
  eyes.image = "star/eyes.png";
  mouth.image;
  cheeks.image = "star/cheeks.png";      
  starobject.image = "";
  eyesobject.image = "";
  mouthobject.image = "";
  cheeksobject.image = ""; 
  object.image = "";
  setTimeout(() => {
  demoinstance.animate("enable"); 
   }, 600);
}  

function stand(){
  star.image = "";
  eyes.image = "";
  mouth.image = "";
  cheeks.image = "";    
  starobject.image;
  eyesobject.image = "star/closedeyes.png";
  mouthobject.image;
  cheeksobject.image = "star/cheeks.png";
  object.image;
}  
  
 function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
} 



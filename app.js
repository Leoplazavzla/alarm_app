const display = document.getElementById('clock');
const audio = new Audio("./Piano-quiet-loud-alarm.mp3");
audio.loop = true;

//Variables
let alarmHr = null;
let alarmMin = null;
let alarmTotal = null;
let currHr = null;
let currMin = null;
let currSec = null;
let currTotal = null;
let alarmTimeOut = null;

// Clock Code
const updateTime = () => {
    const date = new Date();
    let hour = formatTime(date.getHours().toLocaleString());
    let minute = formatTime(date.getMinutes().toLocaleString());
    let second = formatTime(date.getSeconds().toLocaleString());
    display.innerText=`${hour} : ${minute} : ${second}`;
}
//Function to add the ZERO to the clock numbers
const formatTime = (time) => {
    if (time < 10) {
        return '0' + time;
    }return time;
}
//Alarm Code

// Functions to create miliseconds
const hrToMilSec = (hr) => {
    return alarmHr = ((hr*60)*60)*1000;
    //console.log('Alarm hour in MilSecs are : ', alarmHr);
};
const minToMilSec = (min) => {
    return alarmMin = (min*60)*1000;
    //console.log('Alarm minutes in MilSecs are: ', alarmMin);
};

const currHrToMilSec = (cuHr) => {
    return currHr = ((cuHr*60)*60)*1000;
    //console.log('The current hours in MilSecs are: ', currHr);

};
const currMinToMilSec = (cuMin) => {
    return currMin = (cuMin*60)*1000;
    //console.log('The current minutes in MilSecs are: ', currMin);
};

const currSecToMilSec = (sec) =>{
    return currSec = sec * 1000;
}
//Alarm User Values
const alarmValues = () => {
    alarmHr = hrToMilSec(document.getElementById('alarm-hour').value);
    alarmMin = minToMilSec(document.getElementById('alarm-minute').value);
};

const currentValues = () =>{
    let time = new Date();
    currHr = currHrToMilSec(time.getHours());
    currMin = currMinToMilSec(time.getMinutes());
    currSec = currSecToMilSec(time.getSeconds());
};

setInterval(updateTime, 1000);

// Start of classes code
class Alarm {
    constructor(hour, minute) {
        this.hour = hour;
        this.minute = minute;
    }

    setAlarm() {
        alarmValues();
        currentValues();
        alarmTotal = alarmHr + alarmMin;
        currTotal = currHr + currMin + currSec;
        console.log('The current total time is: ', currTotal);
        console.log('The alarm total is: ', alarmTotal);

        if (alarmTotal > currTotal) {
            const timeOut = alarmTotal - currTotal;
            console.log('The time remaining for the alarm is: ', timeOut);
            alarmTimeOut = setTimeout(() => audio.play(), timeOut);
        }
    }

}

// Start of the UI class
class UI {
    addAlarm(alarm){
        const alarmList = document.getElementById('new-alarm');
        const alarmElement = document.createElement('div');
        alarmElement.innerHTML = `<div class="container dp-flex mb-3">
            <div class="card text-center">
            <div class="card-body">
                <strong>Hour: </strong>${alarm.hour}
                <strong>Minute: </strong>${alarm.minute}
                </div>
                <div class="card-body">
                <a href="#" class="btn btn-danger" name="delete">Delete</a></div>
        </div>
        </div>`;
        alarmList.appendChild(alarmElement);

    };

    resetForm(){
        document.getElementById('form').reset();

    };

    deleteAlarm(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.parentElement.remove();
            this.showMessage('Alarm Deleted', 'danger');
        }
    };

    updateAlarm(){

    }

    showMessage(message, cssClass){
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${cssClass}`;
    alertDiv.appendChild(document.createTextNode(message));
    // Show in DOM
    const container = document.querySelector('.clock-container');
    const clock = document.querySelector('.clock');
    container.insertBefore(alertDiv, clock);
    setTimeout(() =>{
        document.querySelector('.alert').remove();
    }, 2000);

    };
}

// DOM Events
// Create an alarm on DOM
document.getElementById('newAlarm')
    .addEventListener('click', () => {
        const hour = document.getElementById('alarm-hour').value;
        const minute = document.getElementById('alarm-minute').value;

        const alarmObject = new Alarm(hour, minute);
        alarmObject.setAlarm();
        console.log(alarmObject);

        const ui = new UI();
        if(hour === '' || minute === ''){
            return ui.showMessage('Complete fields', 'info');

        }
        ui.addAlarm(alarmObject);
        ui.resetForm();
        ui.showMessage('Alarm set!', 'success');
});

//Delete an alarm from DOM
document.getElementById('new-alarm').addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteAlarm(e.target);
    audio.pause();
});




//Set Alarm code
/*const alarmBtn = document.getElementById('setAlarm');
alarmBtn.addEventListener('click',  () => {
    alarmValues();
    currentValues();
    alarmTotal = alarmHr + alarmMin;
    currTotal = currHr + currMin + currSec;
    console.log('The current total time is: ', currTotal)
    console.log('The alarm total is: ', alarmTotal)

    if(alarmTotal > currTotal){
        const timeOut = alarmTotal - currTotal;
        console.log('The time remaining for the alarm is: ', timeOut);
        alarmTimeOut = setTimeout(() => audio.play(), timeOut);
    }
});*/
//Clear Alarm Code
/*const clrBtn = document.getElementById('clearAlarm');
clrBtn.addEventListener('click', () => {
    audio.pause()
    let input1 = document.getElementById('alarm-hour').value='';
    let input2 = document.getElementById('alarm-minute').value='';
});*/

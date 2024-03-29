{
    // const progress_bar_background_color = '#e3e3ef';
    let progress_bar_background_color = 'white';
    let progress_bar_foreground_color = 'limegreen';
    const message_digit = 100000;
    const update_date_interval_time = 50;
    const isDebug = false;
    let progress_bar = document.querySelector("#progress_bar");
    let message_elem = document.querySelector("#progress_bar_message");
    let show_next_year_progress_bar_button = document.querySelector("#show_next_year_progress_bar_button");
    let update_date_interval = null;
    let old_year = new Date().getFullYear();
    let isUpdateRunning = false;

    let display_update = function(p, message) {

        progress_bar.style.background = `linear-gradient(to right, ${progress_bar_foreground_color} 0%, ${progress_bar_foreground_color} ${(Math.floor(p * 10) / 10)}%, ${progress_bar_background_color} ${(Math.floor(p * 10) / 10)}%, ${progress_bar_background_color} 100%)`

        message_elem.innerText = message;

        if(isDebug) {
            console.log(`complete: ${p}%`);
            console.log(`message: ${message}`);
            console.log(`progress_bar: ${Math.floor(p * 10) / 10}%`);
        }
    }
    console.log(display_update(1,1));

    let update_date = function() {
        if (isUpdateRunning) {
            return;
        }
        isUpdateRunning = true;
        let now_date = new Date();
        if(
            old_year < now_date.getFullYear() ||
            (
                now_date.getMonth() == 0 &&
                now_date.getDate() == 1 &&
                now_date.getHours() == 0 &&
                now_date.getMinutes() == 0 &&
                (
                    now_date.getSeconds() == 0 ||
                    now_date.getSeconds() == 1
                )
            )
        ) {
            clearInterval(update_date_interval);
            let p = 100;
            let message = (now_date.getFullYear() - 1) + " is 100% complete!"; 
            setTimeout(function () {
                show_next_year_progress_bar_button.style.display = "";
            }, 3000);
            display_update(p, message);
        } else {
            let now_year = now_date.getFullYear();
            let oneyear_time = new Date(now_year + 1, 1 - 1, 1, 0, 0, 0).getTime() - new Date(now_year, 1 - 1, 1, 0, 0, 0).getTime(); 
            let until_next_year = new Date(now_year + 1, 1 - 1, 1, 0, 0, 0).getTime() - now_date.getTime(); 
            if(isDebug) {
                console.log(`now_year: ${now_year}`);
                console.log(`oneyear_time: ${oneyear_time}`);
                console.log(`until_next_year: ${until_next_year}`);
            }
            let p = 100 - until_next_year / oneyear_time * 100; 
            let message =" " + now_date.getFullYear() + " is " + (Math.floor(p * message_digit) / message_digit )+ " percent complete ";
            display_update(p, message);
        }
        old_year = now_date.getFullYear();
        isUpdateRunning = false;
    }

    update_date();
    update_date_interval = setInterval(update_date, update_date_interval_time);

    /* show_next_year_progress_bar_button.addEventListener("click", function (e) {
        e.target.style.display = "none";
        isUpdateRunning = false;
        update_date_interval = setInterval(update_date, update_date_interval_time);
    })*/
}

// xwidth

var ele_xlen= document.getElementById("x_len")

// ele_xlen.addEventListener("load",ele_xlen.innerHTML=`${display_update(1,1)}`)

function toggleFullscreen() {
  let elem = document.querySelector("body");

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
      );
    });
  } else {
    document.exitFullscreen();
  }
}

document.getElementById("fs-btn").addEventListener("click",()=>{toggleFullscreen()})

// console.log(display_update());

// ======= For Day % =======

let progress_bar_day = document.getElementById("progress_bar_day") 
let progress_bar_day_msg = document.getElementById("progress_bar_day_message")


t_mins= 24*60; //adding secs

c_mins= new Date().getHours()*60 + new Date().getMinutes()

t_percent = ((c_mins/t_mins)*100).toFixed(2)


console.log("c_mins % : "+c_mins);
console.log("t % : "+t_percent);


let progress_bar_background_color = 'white';
let progress_bar_foreground_color = 'limegreen';

progress_bar_day.style.background = `linear-gradient(to right, ${progress_bar_foreground_color} 0%, ${progress_bar_foreground_color} ${t_percent}%, ${progress_bar_background_color} ${t_percent}%, ${progress_bar_background_color} 100%)`

// progress_bar_day_msg.innerHTML=`${t_percent} percent day complete`;
setInterval(()=>{
progress_bar_day_msg.innerHTML=`${t_percent} percent day complete`;
// console.log('Running..');
},3000)




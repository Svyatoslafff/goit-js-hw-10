import"./assets/styles-DAx6gqLf.js";import{i,f}from"./assets/vendor-BbbuE1sJ.js";function g(t){const l=Math.floor(t/864e5),d=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:l,hours:d,minutes:m,seconds:h}}function s(t){return t=`${t}`,t.length<2?`0${t}`:t}let r;const y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){n.verifyDate(t[0])}},n={dateInput:document.querySelector("#datetime-picker"),button:document.querySelector(".calendar-container button[data-start]"),verifyDate(t){t.getTime()>Date.now()&&e.seconds.textContent==0?(n.button.dataset.start="active",r=t.getTime()):(n.button.dataset.start="inactive",e.seconds.textContent==0?n.invalidDateAlert():n.timerIsRunningAlert())},invalidDateAlert(){i.warning({title:"Invalid date",message:"Please choose a date in the future",position:"topRight",color:"red",iconUrl:"./img/close-outlined.svg",timeout:5e3})},timerIsRunningAlert(){i.warning({title:"Timer is running",message:"Please wait until timer ends",position:"topRight",color:"red",iconUrl:"./img/close-outlined.svg",timeout:5e3})}},e={days:document.querySelector(".timer span[data-days]"),hours:document.querySelector(".timer span[data-hours]"),minutes:document.querySelector(".timer span[data-minutes]"),seconds:document.querySelector(".timer span[data-seconds]"),setTimer(){if(n.button.dataset.start==="active"){n.button.dataset.start="inactive";let t=Date.now();t=e.setTimerDate(t);const o=setInterval(()=>{r-t>=0?t=e.setTimerDate(t):(clearInterval(o),i.success({title:"Succes",message:"Timer has ended",position:"topRight",timeout:5e3}))},1e3)}else e.seconds.textContent==0?n.invalidDateAlert():n.timerIsRunningAlert()},setTimerDate(t){let{days:o,hours:a,minutes:c,seconds:u}=g(r-t);return e.days.textContent=s(o),e.hours.textContent=s(a),e.minutes.textContent=s(c),e.seconds.textContent=s(u),t+=1e3}};f("#datetime-picker",y);n.button.addEventListener("click",e.setTimer);
//# sourceMappingURL=1-timer.js.map
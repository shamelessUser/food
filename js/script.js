"use strict";
window.addEventListener("DOMContentLoaded", function () {
    //tab logic start
    const tabsHeaders = document.querySelectorAll(".tabheader__item");
    const tabsContents = document.querySelectorAll(".tabcontent");
    const tabsHeadersParent = document.querySelector(".tabheader__items");

    function hideTabContent () {
        tabsContents.forEach(tabsContent => {
            tabsContent.classList.add("hide");
            tabsContent.classList.remove("show", "fade");
        });

        tabsHeaders.forEach(tabsHeader => tabsHeader.classList.remove("tabheader__item_active"))
    }

    function showTabContent(i = 0) {
        tabsContents[i].classList.add("show", "fade");
        tabsContents[i].classList.remove("hide");
        tabsHeaders[i].classList.add("tabheader__item_active")
    }

    hideTabContent();
    showTabContent();

    tabsHeadersParent.addEventListener("click", (e) => {
        if (e.target && e.target.matches(".tabheader__item")) {
            tabsHeaders.forEach((tabHeader, index) => {
                if (e.target === tabHeader) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
    // tab logic end

    //timer logic start
    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24));
            hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((total / (1000 * 60)) % 60);
            seconds = Math.floor((total / 1000) % 60);
        }

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function setZero (n) {
        return n >= 0 && n < 10 ? `0${n}` : n;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const daysBlock = timer.querySelector("#days");
        const hoursBlock = timer.querySelector("#hours");
        const minutesBlock = timer.querySelector("#minutes");
        const secondsBlock = timer.querySelector("#seconds");
        const timerId = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const {total, days, hours, minutes, seconds} = getTimeRemaining(endtime);

            daysBlock.textContent = setZero(days);
            hoursBlock.textContent = setZero(hours);
            minutesBlock.textContent = setZero(minutes);
            secondsBlock.textContent = setZero(seconds);

            if (total <= 0) {
                clearInterval(timerId);
            }
        }
    }

    setClock(".timer", "2023-07-17");
    //timer logic end
});
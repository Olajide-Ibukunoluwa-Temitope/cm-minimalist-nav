import { cities } from "./cities.js";

document.addEventListener("DOMContentLoaded", () => {
  let activeTimezone = null;
  let intervalId = null;

  const navBar = document.getElementById("navBar");
  const cityTime = document.getElementById("cityTime");
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  navBar.appendChild(indicator);

  // Create nav items and add them to the navBar
  cities.forEach(({ section, label, timezone }) => {
    const navItem = document.createElement("a");
    navItem.classList.add("nav-item");
    navItem.textContent = label;
    navItem.dataset.section = section;
    navItem.dataset.timezone = timezone;
    navItem.setAttribute("aria-label", `Navigate to ${label}`);
    navItem.setAttribute("href", "#");
    navBar.appendChild(navItem);

    // handle action on click on nav item
    navItem.addEventListener("click", () => {
      // remove active class from all nav items
      document
        .querySelectorAll(".nav-item")
        .forEach((item) => item.classList.remove("active"));

      navItem.classList.add("active");
      moveIndicator(navItem);
      realTimeUpdate(navItem.dataset.timezone);
    });
  });

  function updateTime() {
    if (!activeTimezone) return;

    const time = new Date().toLocaleTimeString("en-US", {
      timeZone: activeTimezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    cityTime.textContent = `Local time: ${time}`;
  }

  function realTimeUpdate(timezone) {
    activeTimezone = timezone;
    clearInterval(intervalId);

    updateTime();
    intervalId = setInterval(updateTime, 1000);
  }

  function moveIndicator(element) {
    indicator.style.width = `${element.offsetWidth}px`;
    indicator.style.transform = `translateX(${element.offsetLeft}px)`;
  }

  const firstItem = document.querySelector(".nav-item");

  if (firstItem) {
    firstItem.classList.add("active");
    moveIndicator(firstItem);
    realTimeUpdate(firstItem.dataset.timezone);
  }

  window.addEventListener("resize", () => {
    const activeItem = document.querySelector(".nav-item.active");
    if (activeItem) moveIndicator(activeItem);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cities = [
    {
      section: "cupertino",
      label: "Cupertino",
      timezone: "America/Los_Angeles",
    },
    {
      section: "new-york-city",
      label: "New York City",
      timezone: "America/New_York",
    },
    { section: "london", label: "London", timezone: "Europe/London" },
    { section: "amsterdam", label: "Amsterdam", timezone: "Europe/Amsterdam" },
    { section: "tokyo", label: "Tokyo", timezone: "Asia/Tokyo" },
    { section: "hong-kong", label: "Hong Kong", timezone: "Asia/Hong_Kong" },
    { section: "sydney", label: "Sydney", timezone: "Australia/Sydney" },
  ];

  const navBar = document.getElementById("navBar");
  const cityTime = document.getElementById("cityTime");
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  navBar.appendChild(indicator);

  cities.forEach(({ section, label, timezone }) => {
    const navItem = document.createElement("a");
    navItem.classList.add("nav-item");
    navItem.textContent = label;
    navItem.dataset.section = section;
    navItem.dataset.timezone = timezone;
    navItem.setAttribute("aria-label", `Navigate to ${label}`);
    navItem.setAttribute("href", "#");
    navBar.appendChild(navItem);

    navItem.addEventListener("click", () => {
      document
        .querySelectorAll(".nav-item")
        .forEach((item) => item.classList.remove("active"));

      navItem.classList.add("active");
      moveIndicator(navItem);
      updateTime(navItem.dataset.timezone);
    });
  });

  function updateTime(timezone) {
    const time = new Date().toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    cityTime.textContent = `Local time: ${time}`;
  }

  function moveIndicator(element) {
    indicator.style.width = `${element.offsetWidth}px`;
    indicator.style.transform = `translateX(${element.offsetLeft}px)`;
  }

  window.addEventListener("resize", () => {
    const activeItem = document.querySelector(".nav-item.active");
    if (activeItem) moveIndicator(activeItem);
  });

  const firstItem = document.querySelector(".nav-item");

  if (firstItem) {
    firstItem.classList.add("active");
    moveIndicator(firstItem);
    updateTime(firstItem.dataset.timezone);
  }
});

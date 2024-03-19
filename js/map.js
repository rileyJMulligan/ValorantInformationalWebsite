// Get the current year
var currentYear = new Date().getFullYear();

// Set the current year in the footer
document.getElementById("currentYear").innerHTML = currentYear;


let index = 0;
const maps = [];

function updateMapData() {
  document.getElementById('displayName').textContent = maps[index].displayName;
  document.getElementById('displayIcon').src = maps[index].displayIcon;
  document.getElementById('listviewicon').src = maps[index].listViewIcon;
  document.getElementById('splash').src = maps[index].splash;
  document.getElementById('coordinates').textContent = maps[index].coordinates;

  // Update active dot
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) {
      dot.classList.add('active');
    }
  });
}

function updateIndex(offset) {
  index += offset;
  if (index < 0) {
    index = maps.length - 1;
  } else if (index >= maps.length) {
    index = 0;
  }
  updateMapData();
}

function fetchMaps() {
  fetch('https://valorant-api.com/v1/maps')
    .then(response => response.json())
    .then(data => {
      maps.push(...data.data);

      // Create dots
      const dotsContainer = document.getElementById('dots-container');
      maps.forEach(() => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
      });

      updateMapData();
    })
    .catch(error => console.error(error));
}

document.getElementById('previousBtn').addEventListener('click', () => {
  updateIndex(-1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  updateIndex(1);
});

fetchMaps();
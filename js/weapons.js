// Wait for the DOM to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Get the current year
    var currentYear = new Date().getFullYear();

    // Set the current year in the footer
    document.getElementById("currentYear").innerHTML = currentYear;
    // Get a reference to the container for the weapon buttons
    var weaponsContainer = document.querySelector('.weapons');
  
    // Load the JSON file
    fetch('weapons.json')
      .then(response => response.json())
      .then(data => {
  
        // Loop through each weapon and create a button for it
        console.log(data)
        data.forEach(function(weapon) {
            
          var button = document.createElement('button');
          var img = document.createElement('img');
          img.setAttribute('src', weapon.weapon_asset.url);
          button.appendChild(img);
          weaponsContainer.appendChild(button);
  
          // When the button is clicked, fill in the details panel
          button.addEventListener('click', function() {
            document.querySelector('#weapon-name').textContent = weapon.Name;
            document.querySelector('#weapon-image').setAttribute('src', weapon.weapon_asset.url);
            document.querySelector('#weapon-tagline').textContent = weapon.weapon_tagline;
            document.querySelector('#weapon-mode').textContent = weapon.Stats.Mode;
            document.querySelector('#weapon-damage').textContent = weapon.Stats.Damage[0].Head + ' (headshot), ' + weapon.Stats.Damage[0].Body + ' (body)';
            document.querySelector('#weapon-credit-cost').textContent = weapon.Stats.CredCost;
            document.querySelector('#weapon-equip-speed').textContent = weapon.Stats.EquipSpeed;
            document.querySelector('#weapon-reload-speed').textContent = weapon.Stats.ReloadSpeed;
            document.querySelector('#weapon-magazine-bullets').textContent = weapon.Stats.MagazineBullets;
            document.querySelector('#weapon-extra-magazine').textContent = weapon.Stats.ExtraMagazine;
            document.querySelector('#weapon-total-bullets').textContent = weapon.Stats.TotalBullets;
            document.querySelector('#weapon-fire-rate').textContent = weapon.Stats.FireRate;
            document.querySelector('#weapon-spread').textContent = weapon.Stats.Spread;
            document.querySelector('#weapon-run').textContent = weapon.Stats.Run;
            document.querySelector('#weapon-walk').textContent = weapon.Stats.Walk;
            document.querySelector('#weapon-penetration').textContent = weapon.Stats.Penetration;
          });
        });
      })
      .catch(error => console.error(error));
  
  });
  
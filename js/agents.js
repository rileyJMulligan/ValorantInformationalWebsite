const getElement = (id) => document.getElementById(id);
const getClassElement = (className, index = 0) => document.getElementsByClassName(className)[index];

const prevBtn = getElement("prev-btn");
const nextBtn = getElement("next-btn");
const agentName = getElement("agent-name");
const agentImage = getElement("agent-image");
const agentRole = getElement("agent-role");
const agentDescription = getElement("agent-description");
const agentAbilities = getElement("agent-abilities");
const portraitBackground = getClassElement("portrait");
const infoBackground = getClassElement("agent-info-container");
const abilityBC = getClassElement("ability-container");
const roleBC = getClassElement("extra-info");
const agentDeveloperName = getElement("agent-developer-name");
const agentDisplayName = getElement("agent-display-name");
const agentDisplayIcon = getElement("agent-display-icon");
const agentFullPortrait = getElement("agent-full-portrait");
const agentKillfeedPortrait = getElement("agent-killfeed-portrait");
const agentBackground = getElement("agent-background");
const agentBackgroundGradientColors = getElement("agent-background-gradient-colors");
const agentRoleUuid = getElement("agent-role-uuid");
const agentRoleDisplayName = getElement("agent-role-display-name");
const agentRoleDescription = getElement("agent-role-description");
const agentAbility1Slot = getElement("agent-ability1-slot");
const agentAbility1DisplayName = getElement("agent-ability1-display-name");
const agentAbility1Description = getElement("agent-ability1-description");
const agentAbility1DisplayIcon = getElement("agent-ability1-display-icon");
const agentAbility2Slot = getElement("agent-ability2-slot");
const agentAbility2DisplayName = getElement("agent-ability2-display-name");
const agentAbility2Description = getElement("agent-ability2-description");
const agentAbility2DisplayIcon = getElement("agent-ability2-display-icon");
const agentGrenadeSlot = getElement("agent-grenade-slot");
const agentGrenadeDisplayName = getElement("agent-grenade-display-name");
const agentGrenadeDescription = getElement("agent-grenade-description");
const agentGrenadeDisplayIcon = getElement("agent-grenade-display-icon");
const agentUltimateSlot = getElement("agent-ultimate-slot");
const agentUltimateDisplayName = getElement("agent-ultimate-display-name");
const agentUltimateDescription = getElement("agent-ultimate-description");
const agentUltimateDisplayIcon = getElement("agent-ultimate-display-icon");
const agentPassiveDisplayName = getElement("agent-passive-display-name");
const agentPassiveDisplayIcon = getElement("agent-passive-display-icon");
const agentPassiveSlot = getElement("agent-passive-slot");
const agentPassiveDescription = getElement("agent-passive-description");






// Get the current year
var currentYear = new Date().getFullYear();

// set agents list
let agents = [];

// Set the current year in the footer
document.getElementById("currentYear").innerHTML = currentYear;

let currentIndex = 0;
const agentsPerPage = 1;
const apiUrl = "https://valorant-api.com/v1/agents";

async function fetchAgents() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
    agentName.innerText = "404";
    agentImage.src = "images/agents/agents-background.jpg";
    agentRole.innerText = "Agent Not Found";
    agentDescription.innerText = "Could not fetch agent data. Please try again later.";
    agentAbilities.innerHTML = "";
    return [];
  }
}

async function renderAgent(agent) {
    console.log("rendering agent");
    agentName.innerText = agent.displayName;
    agentRole.innerText = agent.role.displayName;
    agentImage.src = agent.displayIcon;
    const colors = agent.backgroundGradientColors.map(color => `#${color}`);
    portraitBackground.style.backgroundImage = `linear-gradient(to bottom, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`;

    infoBackground.style.backgroundImage = `url(${agent.background})`;
    abilityBC.style.backgroundImage = `url(${agent.background})`;
    roleBC.style.backgroundImage = `url(${agent.role.displayIcon})`;



    

    agentDescription.innerText = agent.description;
    agentDeveloperName.innerText = "Internal Name: " + agent.developerName;
    agentFullPortrait.src = agent.fullPortrait;
    //agentBackgroundGradientColors.innerText = agent.backgroundGradientColors;
    agentRoleDescription.innerText = agent.role.description;

      agentAbility1Slot.innerText = agent.abilities[0].slot;
      agentAbility1DisplayName.innerText = agent.abilities[0].displayName;
      agentAbility1Description.innerText = agent.abilities[0].description;
      agentAbility1DisplayIcon.src = agent.abilities[0].displayIcon;

      agentAbility2Slot.innerText = agent.abilities[1].slot;
      agentAbility2DisplayName.innerText = agent.abilities[1].displayName;
      agentAbility2Description.innerText = agent.abilities[1].description;
      agentAbility2DisplayIcon.src = agent.abilities[1].displayIcon;

      agentGrenadeSlot.innerText = agent.abilities[2].slot;
      agentGrenadeDisplayName.innerText = agent.abilities[2].displayName;
      agentGrenadeDescription.innerText = agent.abilities[2].description;
      agentGrenadeDisplayIcon.src = agent.abilities[2].displayIcon;

      agentUltimateSlot.innerText = agent.abilities[3].slot;
      agentUltimateDisplayName.innerText = agent.abilities[3].displayName;
      agentUltimateDescription.innerText = agent.abilities[3].description;
      agentUltimateDisplayIcon.src = agent.abilities[3].displayIcon;

    if (agent.abilities.length === 4) 
    {
      agentPassiveDisplayName.innerText = "No Passive Ability";
        agentPassiveDisplayIcon.src = "images/agents/agents-background.jpg";
        agentPassiveSlot.innerText = "";
        agentPassiveDescription.innerText = "This agent does not have a passive ability.";
    }

    if (agent.abilities.length === 5) {
      let passive = agent.abilities[4];
      let agentPassiveDisplayIcon = getElement('agent-passive-display-icon');
    
      // Check passive.displayIcon before setting the src
      if (passive.displayIcon === undefined || passive.displayIcon === null) {
        agentPassiveDisplayIcon.src = "images/agents/passiveIconNotFound.png";
      } else {
        agentPassiveDisplayIcon.src = passive.displayIcon;
      }
    
      getElement('agent-passive-display-name').innerText = passive.displayName;
      getElement('agent-passive-slot').innerText = passive.slot;
      getElement('agent-passive-description').innerText = passive.description;
    } else {
      // If the agent does not have a passive ability, put default values in the passive ability section
      getElement('agent-passive-display-name').innerText = "No Passive Ability";
      getElement('agent-passive-display-icon').src = "images/agents/agents-background.jpg";
      getElement('agent-passive-slot').innerText = "";
      getElement('agent-passive-description').innerText = "This agent does not have a passive ability.";
    }
  renderDots(agents.length);
  }

async function init() {
  agents = await fetchAgents();
  if (agents.length > 0) {
    // Remove the 9th element (index 8) from the agents array (faulty data from the API)
    if (agents.length > 8) {
      agents.splice(9, 1);
    }
    renderAgent(agents[currentIndex]);
    renderDots(agents.length);
  }
  else
  {
    agentName.innerText = "404";
    agentImage.src = "images/agents/agents-background.jpg";
    agentRole.innerText = "Agent Not Found";
    agentDescription.innerText = "Could not fetch agent data. Please try again later.";
    agentAbilities.innerHTML = "";
  
  }
}

prevBtn.addEventListener("click", async () => {
  currentIndex -= agentsPerPage;
  if (currentIndex < 0) {
    currentIndex = agents.length - 1;
  }
  renderAgent(agents[currentIndex]);
  renderDots(agents.length);
});

nextBtn.addEventListener("click", async () => {
  currentIndex += agentsPerPage;
  if (currentIndex >= agents.length) {
    currentIndex = 0;
  }
  renderAgent(agents[currentIndex]);
  renderDots(agents.length);
});

function renderDots(numAgents) {
  // Clear any existing dots
  document.getElementById('dots-container').innerHTML = '';

  // Create a dot for each agent
  for (let i = 0; i < numAgents; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === currentIndex) {
      dot.classList.add('active');
    }
    document.getElementById('dots-container').appendChild(dot);
  }
}



init();





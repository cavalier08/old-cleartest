//0.8.3
class Country {
  constructor(
    countryName,
    totalPollution,
    airPollution,
    landPollution,
    waterPollution,
    naturalResource,
    factories,
    population,
    Im,
    Ex,
    economy,
    happiness,
    pollutionTolerance
  ) {
    this.countryName = countryName;
    // Pollution Levels
    this.totalPollution = totalPollution;
    this.airPollution = airPollution;
    this.landPollution = landPollution;
    this.waterPollution = waterPollution;

    // Natural Resources (e.g., { oil: 40, coal: 20, forests: 60 })
    this.naturalResource = naturalResource;

    // Factories (e.g., { car: 200, plastic: 50, textile: 120 })
    this.factories = factories;

    // Population (could further break down into high, medium, low consumption if needed)
    this.population = population;

    // Imports (e.g., { cars: 1000, fruits: 5000 })
    this.Im = Im;

    // Exports (e.g., { electronics: 2000 })
    this.Ex = Ex;

    // Economy
    this.economy = economy;

    // Happiness Level
    this.happiness = happiness;

    this.pollutionTolerance = pollutionTolerance;
  }

  calculateTotalPollution() {
    return (this.airPollution + this.landPollution + this.waterPollution) / 3;
  }

  pollutionDecay() {
    this.airPollution *= 0.9;
    this.landPollution *= 0.97;
    this.waterPollution *= 0.95;
  }

  consumeResources() {
    for (let factoryType in this.factories) {
      const factory = globalFactories[factoryType];
      const quantity = this.factories[factoryType];

      this.economy += factory.economicGain * quantity;

      for (let resource in factory.resourceConsumption) {
        if (resource in this.naturalResource) {
          let resourceConsumed =
            factory.resourceConsumption[resource] * quantity;

          this.naturalResource[resource] -= resourceConsumed;

          this.economy -= globalResourceCosts[resource] * resourceConsumed;

          const pollutionPercentage = globalPollutionPercentages[resource];
          this.airPollution +=
            pollutionPercentage *
            resourceConsumed *
            globalAirPollutionFractions[resource];
          this.waterPollution +=
            pollutionPercentage *
            resourceConsumed *
            globalWaterPollutionFractions[resource];
          this.landPollution +=
            pollutionPercentage *
            resourceConsumed *
            globalLandPollutionFractions[resource];
        }
      }
    }
    this.totalPollution = this.calculateTotalPollution();
  }
  renewResource() {
    this.naturalResource["forests"] += 0.1 * (100 - this.totalPollution);
  }

  // In your Country class
  removeFactory(factoryType, percentage) {
    let numToRemove = Math.ceil(
      this.factories[factoryType] * (percentage / 100)
    );
    this.factories[factoryType] -= numToRemove;
    if (this.factories[factoryType] < 0) {
      this.factories[factoryType] = 0;
    }
  }

  addFactory(factoryType, percentage) {
    let numToAdd = Math.ceil(this.factories[factoryType] * (percentage / 100));
    this.factories[factoryType] += numToAdd;
    if (this.factories[factoryType] < 0) {
      this.factories[factoryType] = 0;
    }
  }
}

// Define pollution percentages associated with each resource
const globalPollutionPercentages = {
  oil: 0.1, // 50% pollution due to using oil (original: 5%)
  coal: 0.16, // 80% pollution due to using coal (original: 8%)
  forests: 0.06, // 30% pollution due to deforestation (original: 3%)
};

// Define fractions of pollution that contribute to each type (air, water, land) for each resource
const globalAirPollutionFractions = {
  oil: 0.7, // 70% of oil pollution affects air
  coal: 0.6, // 60% of coal pollution affects air
  forests: 0.3, // 30% of deforestation pollution affects air
};

const globalWaterPollutionFractions = {
  oil: 0.2, // 20% of oil pollution affects water
  coal: 0.3, // 30% of coal pollution affects water
  forests: 0.5, // 50% of deforestation pollution affects water
};

const globalLandPollutionFractions = {
  oil: 0.1, // 10% of oil pollution affects land
  coal: 0.1, // 10% of coal pollution affects land
  forests: 0.2, // 20% of deforestation pollution affects land
};

class Factory {
  constructor(type, resourceConsumption, economicGain) {
    this.type = type;
    this.resourceConsumption = resourceConsumption;
    this.economicGain = economicGain; // e.g., 1200 for tech, 800 for car, 1000 for mining
  }
}

const globalFactories = {
  tech: new Factory("tech", { oil: 0.1 }, 1200),
  car: new Factory("car", { coal: 0.15, oil: 0.25 }, 800),
  mining: new Factory("mining", { forests: 0.1 }, 1000),
  renewable_energy: new Factory(
    "renewable_energy",
    { coal: 0.2, oil: 0.1 },
    1500
  ),
  agriculture: new Factory("agriculture", { coal: 0.05, forests: 0.3 }, 600),
  textile: new Factory("textile", { coal: 0.1, forests: 0.05 }, 700),
  electronics: new Factory("electronics", { coal: 0.1, oil: 0.15 }, 1300),
  machinery: new Factory("machinery", { coal: 0.15, oil: 0.1 }, 1100),
  garments: new Factory("garments", { coal: 0.05, oil: 0.05 }, 500),
  software: new Factory("software", { oil: 0.15 }, 2000),
  tourism: new Factory("tourism", { coal: 0.1, forests: 0.1 }, 900),
};

const globalResourceCosts = {
  oil: 500,
  coal: 400,
  forests: 700,
};
//eruope
let norlandia = new Country(
  "Norlandia",
  50,
  30,
  10,
  10,
  { oil: 1000, coal: 1500, forests: 5000 },
  { tech: 270, car: 200, renewable_energy: 150 },
  10000000,
  { cars: 12000, fruits: 45000 },
  { electronics: 22000 },
  3500000000000,
  85,
  70
);

//africa
let sudoria = new Country(
  "Sudoria",
  80,
  40,
  30,
  10,
  { oil: 2000, coal: 3000, forests: 4000 },
  { mining: 220, agriculture: 260, textile: 80 },
  12000000,
  { cars: 3000, fruits: 60000 },
  { electronics: 1000 },
  1500000000000,
  45,
  100
);

//asia
let estasia = new Country(
  "Estasia",
  90,
  50,
  20,
  20,
  { oil: 4500, coal: 6000, forests: 30000 },
  { electronics: 480, machinery: 320, garments: 350 },
  140000000,
  { cars: 20000, fruits: 50000 },
  { electronics: 50000 },
  11000000000000,
  65,
  90
);

//north america
let westhaven = new Country(
  "Westhaven",
  60,
  35,
  15,
  10,
  { oil: 2500, coal: 4000, forests: 6000 },
  { car: 280, software: 400, agriculture: 230 },
  32000000,
  { cars: 15000, fruits: 40000 },
  { electronics: 30000 },
  19000000000000,
  80,
  70
);

//south america and australia
let australen = new Country(
  "Australen",
  55,
  30,
  15,
  10,
  { oil: 4000, coal: 7000, forests: 2000 },
  { mining: 210, agriculture: 150, tourism: 90 },
  2500000,
  { cars: 8000, fruits: 25000 },
  { electronics: 7000 },
  1500000000000,
  82,
  80
);

class Policy {
  constructor(name, effect) {
    this.name = name;
    this.effect = effect; // Effects would be something like: { air_pollution: -5, economy: -0.05 }
  }

  apply(country) {
    if (country.factories === undefined) {
      console.error("country.factories is undefined!");
      return;
    }

    for (let factoryType in this.effect) {
      console.log("Checking for factory:", factoryType);
      if (factoryType in country.factories) {
        this.effect[factoryType](globalFactories[factoryType]);
      }
    }
  }
}

const electricCarIncentive = new Policy("Electric Car Incentive", {
  car: (factory) => {
    factory.economicGain *= 0.5; // Reduce economic gain of car factories by 50%
    factory.resourceConsumption["oil"] = 0;
    removeFactoryFromAllCountries("car", 40);
  },
  tech: (factory) => {
    factory.economicGain *= 1.1; // Increase economic gain of tech factories by 10%

    addFactoryFromAllCountries("tech", 10);
  },
});

const deforestationBan = new Policy("Deforestation Ban", {
  mining: (factory) => {
    factory.resourceConsumption.forests = 0; // No more forest consumption
    factory.economicGain *= 0.7; // Reduce economic gain by 30% due to loss of forest resources
    removeFactoryFromAllCountries("mining", 50);
  },
});

const carbonTax = new Policy("Carbon Tax", {
  car: (factory) => {
    factory.resourceConsumption.coal *= 0.9; // Reduce coal consumption by 10%
    factory.economicGain *= 0.8; // Reduce economic gain by 20% due to the tax
    removeFactoryFromAllCountries("car", 20);
  },
  plastic: (factory) => {
    factory.resourceConsumption.oil *= 0.9; // Reduce oil consumption by 10%
    factory.economicGain *= 0.85; // Reduce economic gain by 15% due to the tax
    removeFactoryFromAllCountries("plastic", 20);
  },
});

const renewableEnergyIncentives = new Policy("Renewable Energy Incentives", {
  textile: (factory) => {
    factory.resourceConsumption.oil = 0; // No more oil consumption
    factory.resourceConsumption.solar += 50; // Increase solar power usage
    factory.economicGain *= 1.1; // Increase economic gain by 10% due to lower energy costs
    removeFactoryFromAllCountries("textile", 20);
  },
});

const waterConservation = new Policy("Water Conservation", {
  agriculture: (factory) => {
    factory.resourceConsumption.water *= 0.8; // Reduce water consumption by 20%
    factory.economicGain *= 0.9; // Reduce economic gain by 10% due to less water availability
    removeFactoryFromAllCountries("agriculture", 40);
  },
});

const educationAndTraining = new Policy("Education and Training", {
  all: (factory) => {
    // Affects all industries
    factory.productivity *= 1.2; // Increase productivity by 20%
    factory.economicGain *= 1.1; // Increase economic gain by 10% due to higher productivity
  },
});

const greenInfrastructure = new Policy("Green Infrastructure", {
  construction: (factory) => {
    factory.resourceConsumption.coal = 0; // No more coal consumption
    factory.resourceConsumption.solar += 50; // Increase solar power usage
    factory.economicGain *= 0.95; // Slight decrease in economic gain by 5% due to higher initial costs
    addFactoryFromAllCountries("solar", 5);
  }
});

const wasteRecycling = new Policy("Waste Recycling Initiative", {
  plastic: (factory) => {
    factory.resourceConsumption.land *= 0.7; // Reduce land pollution by 30%
    factory.economicGain *= 1.05; // Increase economic gain by 5% from selling recycled materials
    addFactoryFromAllCountries("recycling", 10);
  },
  tech: (factory) => {
    factory.resourceConsumption.land *= 0.7; // Reduce land pollution by 30%
    factory.economicGain *= 1.02; // Slight increase in economic gain by 2% due to recycling initiative
  }
});

const sustainableFarming = new Policy("Sustainable Farming Practices", {
  agriculture: (factory) => {
    factory.resourceConsumption.water *= 0.6; // Reduce water consumption by 40%
    factory.resourceConsumption.land *= 0.7; // Reduce land consumption by 30%
    factory.economicGain *= 1.1; // Increase economic gain by 10% due to higher demand for organic produce
    addFactoryFromAllCountries("organic_farm", 15);
  }
});

const policyPool = [
  electricCarIncentive,
  deforestationBan,
  carbonTax,
  renewableEnergyIncentives,
  waterConservation,
  educationAndTraining,
  wasteRecycling,
  greenInfrastructure,
  sustainableFarming
];


function getRandomPolicies(policies, count) {
  let shuffled = policies.slice(0);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function promptUser(selectedPolicies) {
  return new Promise((resolve) => {
    const policyButtonContainer = document.getElementById("policyButtons");
    const modal = document.getElementById("policyModal");
    const closeModal = document.querySelector(".modal-close");
    policyButtonContainer.innerHTML = "";

    closeModal.onclick = function () {
      modal.style.display = "none";
      resolve(null);
    };

    selectedPolicies.forEach((policy, index) => {
      const button = document.createElement("button");
      button.textContent = policy.name;
      button.onclick = function () {
        modal.style.display = "none";
        resolve(selectedPolicies[index]);
      };
      policyButtonContainer.appendChild(button);
    });

    const tip = document.getElementById("policyTip");
    tip.textContent="Tips: "+getRandomNationalPolicy();

    // Show the modal
    modal.style.display = "block";
  });
}

function handlePolicyChoice(selectedPolicy) {
  if (selectedPolicy) {
    console.log("You selected:", selectedPolicy.name);
  } else {
    console.log("Canceled or No policy selected");
  }
}

const maxPerCapitaIncome = 500000;
function getRandomNationalPolicy() {
  const randomIndex = Math.floor(Math.random() * nationalEnvironmentalPolicies.length);
  return nationalEnvironmentalPolicies[randomIndex];
}
const nationalEnvironmentalPolicies = [
  "Implement a carbon tax to reduce greenhouse gas emissions.",
  "Establish strict emissions standards for industries and vehicles.",
  "Invest in renewable energy sources such as wind and solar power.",
  "Enforce regulations to protect critical ecosystems and wildlife habitats.",
  "Promote energy-efficient building standards and retrofits.",
  "Support research and development of clean energy technologies.",
  "Implement a nationwide recycling program with incentives.",
  "Develop and enforce laws against illegal logging and deforestation.",
  "Create protected marine reserves to conserve ocean biodiversity.",
  "Invest in public transportation infrastructure to reduce car emissions.",
  "Promote the use of electric vehicles through incentives.",
  "Implement water conservation policies and reduce water pollution.",
  "Enforce restrictions on the use of harmful pesticides and herbicides.",
  "Support organic farming practices and sustainable agriculture.",
  "Implement plastic waste reduction and recycling programs.",
  "Preserve and restore wetlands to mitigate flooding and protect ecosystems.",
  "Establish a national emissions trading system (cap and trade).",
  "Promote green building and sustainable urban planning.",
  "Create green job initiatives in the renewable energy sector.",
  "Support policies to phase out single-use plastics.",
  "Invest in research to combat air and water pollution.",
  "Enhance environmental education in schools and communities.",
  "Enforce stricter regulations on industrial waste disposal.",
  "Protect and restore native forests to combat deforestation.",
  "Encourage responsible mining practices to minimize environmental impact.",
  "Implement policies to reduce food waste and promote sustainable diets.",
  "Support initiatives to combat invasive species and protect native flora/fauna.",
  "Invest in clean and efficient public transportation networks.",
  "Promote policies to reduce energy consumption in the industrial sector.",
  "Establish emissions reduction targets in line with international agreements."
];

// You can access these national-level policy tips using nationalEnvironmentalPolicies[index], where index is a number from 0 to 29.

function calculateHappiness(country) {
  let happiness = country.happiness || 50;
  let perCapitaIncome = country.economy / country.population;
  let economyFactor = Math.log(perCapitaIncome + 1) / Math.log(100001);
  let pollutionFactor = 1 - country.totalPollution / 50;
  let adjustment = 0.5 * economyFactor + 0.6 * pollutionFactor;
  happiness = happiness + (adjustment - 0.5) * 0.05;
  happiness = Math.max(0, Math.min(100, happiness));
  return happiness;
}

const difficulties = {
  easy: {
    pollutionRateMultiplier: 0.5,
    resourceConsumptionMultiplier: 0.8,
    policyEffectMultiplier: 1.2,
  },
  normal: {
    pollutionRateMultiplier: 1,
    resourceConsumptionMultiplier: 1,
    policyEffectMultiplier: 1,
  },
  hard: {
    pollutionRateMultiplier: 1.5,
    resourceConsumptionMultiplier: 1.2,
    policyEffectMultiplier: 0.8,
  },
};

function applyDifficultySettings(country, difficulty) {
  country.pollutionRateMultiplier =
    difficulties[difficulty].pollutionRateMultiplier;
  country.resourceConsumptionMultiplier =
    difficulties[difficulty].resourceConsumptionMultiplier;
  country.policyEffectMultiplier =
    difficulties[difficulty].policyEffectMultiplier;
}

let chosenDifficulty = null;

function chooseDifficulty() {
  console.log("choose difficulty");
  document.getElementById("difficultyModal").style.display = "block";
}

function setDifficulty(difficulty) {
  chosenDifficulty = difficulty;
  document.getElementById("difficultyModal").style.display = "none";
  runSimulation();
}

const randomEvents = [
  {
    name: "Earthquake",
    effects: (country) => {
      country.totalPollution += 10;
      country.happiness -= 10;
      country.economy -= 1000000;
    },
  },
  {
    name: "Flood",
    effects: (country) => {
      country.waterPollution += 15;
      country.happiness -= 5;
      country.economy -= 500000;
    },
  },
  // Add more random events with their effects
];

const eventLikelihoods = {
  Norlandia: { Earthquake: 0.05, Flood: 0.1 },
  Sudoria: { Earthquake: 0.1, Flood: 0.05 },
  Estasia: { Earthquake: 0.075, Flood: 0.075 },
  Westhaven: { Earthquake: 0.025, Flood: 0.025 },
  Australen: { Earthquake: 0.05, Flood: 0.05 },
};

function triggerRandomEvent(countries) {
  for (let country of countries) {
    for (let eventName in eventLikelihoods[country.countryName]) {
      if (Math.random() < eventLikelihoods[country.countryName][eventName]) {
        let randomEvent = getRandomEventByName(eventName);
        alert(`${country.countryName} is undergoing an ${randomEvent.name}`);
        applyRandomEventEffects(country, randomEvent);
      }
    }
  }
}

let norlandiaData = {
  totalPollution: [],
  landPollution: [],
  airPollution: [],
  waterPollution: [],
};
let sudoriaData = {
  totalPollution: [],
  landPollution: [],
  airPollution: [],
  waterPollution: [],
};
let estasiaData = {
  totalPollution: [],
  landPollution: [],
  airPollution: [],
  waterPollution: [],
};
let westhavenData = {
  totalPollution: [],
  landPollution: [],
  airPollution: [],
  waterPollution: [],
};
let australenData = {
  totalPollution: [],
  landPollution: [],
  airPollution: [],
  waterPollution: [],
};

function updateData(country, countryData) {
  countryData.totalPollution.push(country.totalPollution);
  countryData.landPollution.push(country.landPollution);
  countryData.airPollution.push(country.airPollution);
  countryData.waterPollution.push(country.waterPollution);
}

async function simulateDay(countries, difficulty) {
  console.log("ran simulate");
  let selectedPolicies = getRandomPolicies(policyPool, 3);

  let chosenPolicy = await promptUser(selectedPolicies); // Now it will wait
  console.log(chosenPolicy);

  triggerRandomEvent(countries);

  for (let country of countries) {
    applyDifficultySettings(country, difficulty);
    if (chosenPolicy !== null) {
      chosenPolicy.apply(country);
    }

    country.renewResource();
    country.consumeResources();
    country.pollutionDecay();
    country.happiness = calculateHappiness(country);
  }
}
let allCountries = [norlandia, sudoria, estasia, westhaven, australen];

function removeFactoryFromAllCountries(factory, num) {
  allCountries.forEach((country) => {
    if (country.factories[factory] > 0) {
      country.removeFactory(factory, num); // Remove `num` percentage of factories of type `factory`
    }
  });
}

function addFactoryFromAllCountries(factory, num) {
  allCountries.forEach((country) => {
    if (country.factories[factory] !== undefined) {
      country.addFactory(factory, num); // Add `num` factories of type `factory`
    }
  });
}

function getRandomEventByName(eventName) {
  return randomEvents.find((event) => event.name === eventName);
}

// Function to apply effects of a random event to a country
function applyRandomEventEffects(country, randomEvent) {
  randomEvent.effects(country);
}

function formatObject(obj) {
  let formatted = "";
  for (let [key, value] of Object.entries(obj)) {
    if (value > 0) {
      formatted += `${key}: ${parseFloat(value).toFixed(0)}, `;
    }
  }
  return formatted.slice(0, -2); // Remove the last comma and space
}

// Get references to the container and policyButtons elements
const container = document.getElementById("container");
const policyButtons = document.getElementById("policyButtons");

// format economy
function formatEconomyValue(economyValue) {
  if (economyValue >= 1_000_000_000_000) {
    return `${(economyValue / 1_000_000_000_000).toFixed(2)}T`;
  } else if (economyValue >= 1_000_000_000) {
    return `${(economyValue / 1_000_000_000).toFixed(2)}B`;
  } else if (economyValue >= 1_000_000) {
    return `${(economyValue / 1_000_000).toFixed(2)}M`;
  } else {
    return economyValue.toLocaleString();
  }
}

// Function to create country blocks
function createCountryBlock(country) {
  const block = document.createElement("div");
  block.className = "country-block";
  block.id = country.countryName + "Block";
  block.innerHTML = `
    <h2>${country.countryName}<div class="bar"> </div></h2>
    <p>Economy: ${formatEconomyValue(country.economy)}</p>
    <p>Happiness: ${parseFloat(country.happiness).toFixed(2)}</p>
    <p>Total Pollution: ${parseFloat(country.totalPollution).toFixed(2)}</p>
    <p>Air Pollution: ${parseFloat(country.airPollution).toFixed(2)}</p>
    <p>Land Pollution: ${parseFloat(country.landPollution).toFixed(2)}</p>
    <p>Water Pollution: ${parseFloat(country.waterPollution).toFixed(2)}</p>
    <p>Industry: ${formatObject(country.factories)}</p>
    <p>Natural Resource: ${formatObject(country.naturalResource)}</p>
    <!-- Add more stats as needed -->
  `;
  block.style.display = "none";
  return block;
}

// Additional functions for updating UI and handling user interactions
function updateCountryInfo() {
  // Update country blocks with new data
  const countryBlocks = document.querySelectorAll(".country-block");
  countryBlocks.forEach((block, index) => {
    block.innerHTML = `
      <h2>${allCountries[index].countryName}<div class="bar"> </div></h2>
      <p>Economy: ${formatEconomyValue(allCountries[index].economy)}</p>
      <p>Happiness: ${parseFloat(allCountries[index].happiness).toFixed(2)}</p>
      <p>TotalPollution: ${parseFloat(
        allCountries[index].totalPollution
      ).toFixed(2)}</p>
      <p>Air Pollution: ${parseFloat(allCountries[index].airPollution).toFixed(
        2
      )}</p>
      <p>Land Pollution: ${parseFloat(
        allCountries[index].landPollution
      ).toFixed(2)}</p>
      <p>Water Pollution: ${parseFloat(
        allCountries[index].waterPollution
      ).toFixed(2)}</p>
      <p>Industry: ${formatObject(allCountries[index].factories)}</p>
      <p>Natural Resource: ${formatObject(
        allCountries[index].naturalResource
      )}</p>

      <!-- Update other stats as needed -->
    `;
  });
}

let currentBlock = null;

function showCountryBlock(countryName) {
  if (currentBlock) {
    currentBlock.style.display = "none";
  }
  const block = document.getElementById(countryName + "Block");
  if (block) {
    block.style.display = "block";
  }
  currentBlock = block;
}


// Display country blocks
allCountries.forEach((country) => {
  const countryBlock = createCountryBlock(country);
  container.appendChild(countryBlock);
});

// Add event listeners
const norlandiaRegion = document.getElementById("norlandiaRegion");
norlandiaRegion.addEventListener("mouseover", () =>
  showCountryBlock("Norlandia")
);

const sudoriaRegion = document.getElementById("sudoriaRegion");
sudoriaRegion.addEventListener("mouseover", () => showCountryBlock("Sudoria"));

const estasiaRegion = document.getElementById("estasiaRegion");
estasiaRegion.addEventListener("mouseover", () => showCountryBlock("Estasia"));

const westhavenRegion = document.getElementById("westhavenRegion");
westhavenRegion.addEventListener("mouseover", () =>
  showCountryBlock("Westhaven")
);

const australenRegion = document.getElementById("australenRegion");
australenRegion.addEventListener("mouseover", () =>
  showCountryBlock("Australen")
);

// If you'd like to hide the blocks when the mouse moves out of the region:
const allRegions = [
  norlandiaRegion,
  sudoriaRegion,
  estasiaRegion,
  westhavenRegion,
  australenRegion,
];
allRegions.forEach((region) => {
  region.addEventListener("mouseout", () => {
    // Hide all blocks
    const allBlocks = document.querySelectorAll(".country-block");
    allBlocks.forEach((block) => {
      block.style.display = "none";
    });
  });
});

let charts = {}; // Global object to hold all chart instances

function updateChartData(chart, newData) {
  for (let i = 0; i < newData.datasets.length; i++) {
    chart.data.datasets[i].data = newData.datasets[i].data;
  }
  chart.data.labels = newData.labels || chart.data.labels;
  chart.update();
}

async function animateLoadingBar(duration) {
  return new Promise((resolve) => {
    const loadingBar = document.getElementById("loading-bar");
    let start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;

      // Update the width of the loading bar
      const progress = Math.min(elapsed / duration, 1);
      loadingBar.style.width = `${progress * 100}%`;

      // If the animation duration is over, resolve the Promise
      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        loadingBar.style.width = "0%"; // Reset for the next turn
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

function checkGameOverOrWin(country) {
  // Check for game over conditions for specific countries
  if (country.totalPollution > country.pollutionTolerance) {
    alert(
      `Game Over for ${country.countryName}! Total pollution exceeded acceptable levels.`
    );
    return true;
  }

  for (const resource in country.naturalResource) {
    if (country.naturalResource.hasOwnProperty(resource)) {
      if (country.naturalResource[resource] < 20) {
        alert(
          `Game Over for ${country.countryName}! ${resource} has been depleted.`
        );
        return true;
      }
    }
  }

  // Check for happiness level
  if (country.happiness < 30) {
    // Replace 30 with the actual threshold
    alert(
      `Game Over for ${country.countryName}! Happiness level dropped too low.`
    );
    return true;
  }

  // Check for game won conditions
  if (country.totalPollution < 10 && country.happiness > 90) {
    // Replace 50 and 80 with the actual thresholds
    alert(
      `Congratulations, you won for ${country.countryName}! Pollution is under control and happiness is high.`
    );
    return true;
  }
  return false;
}

function playMusic(){
  const audio=document.getElementById('background-music');
  audio.loop = true;
  audio.play().catch(error => {
    console.error("Playback failed.", error);
  });
}
let isNextRoundReady = false;

document.getElementById("runSimulation").addEventListener("click", function () {
  document.getElementById("runSimulation").remove();
  document.getElementById("startNextRound").style.display = "block";
  playMusic();
  chooseDifficulty();
});

const countries = [norlandia, sudoria, estasia, westhaven, australen];
const dataSets = [
  norlandiaData,
  sudoriaData,
  estasiaData,
  westhavenData,
  australenData,
];

function showModal(country, data) {
  // Update modal title
  document.getElementById('modalTitle').innerText = country;

  // Display modal
  let modal = document.getElementById('myModal');
  modal.style.display = "block";

  // Create chart datasets
  let datasets = [];

  // Total pollution as line graph
  datasets.push({
    type: 'line',
    label: 'Total Pollution',
    data: data.totalPollution,
    borderWidth: 1,
    fill: false
  });

  // Other pollution types as bar graph
  for (let key in data) {
    if (key !== 'totalPollution') {
      datasets.push({
        type: 'bar',
        label: key,
        data: data[key],
        borderWidth: 1
      });
    }
  }

  // Create chart
  const ctx = document.getElementById('modalCanvas').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'bar',  // default type, but each dataset will override this
    data: {
      labels: [...Array(data.totalPollution.length).keys()],
      datasets: datasets
    }
  });
}

function hideModal() {
  // Hide modal
  let modal = document.getElementById('myModal');
  modal.style.display = "none";

  // Destroy chart
  if (myChart) {
    myChart.destroy();
  }
}

document
  .getElementById("startNextRound")
  .addEventListener("click", function () {
    isNextRoundReady = true;
  });

async function runSimulation() {
  let gameIsRunning = true;

  if (difficulties[chosenDifficulty]) {
    while (gameIsRunning) {
      while (!isNextRoundReady) {
        await new Promise((r) => setTimeout(r, 500));
      }
      isNextRoundReady = false;

      await simulateDay(allCountries, chosenDifficulty);
      updateCountryInfo();

      for (let i = 0; i < countries.length; i++) {
        await updateData(countries[i], dataSets[i]);

        if (checkGameOverOrWin(countries[i])) {
          gameIsRunning = false;
          break;
        }
      }

      if (gameIsRunning) {
        await animateLoadingBar(3000);
      }
    }
  } else {
    console.log("Invalid difficulty level chosen.");
  }
}

// Initialize the UI when the page loads
function initializeUI() {
  updateCountryInfo();
}

document.addEventListener("DOMContentLoaded", function () {
  initializeUI(); // Initialize the UI when the DOM is fully loaded
});

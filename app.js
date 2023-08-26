//0.6.1
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
    happiness
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
}

// Define pollution percentages associated with each resource
const globalPollutionPercentages = {
  oil: 5, // 5% pollution due to using oil
  coal: 8, // 8% pollution due to using coal
  forests: 3, // 3% pollution due to deforestation
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
  tech: new Factory("tech", { oil: 2 }, 1200),
  car: new Factory("car", { coal: 3, oil: 5 }, 800),
  mining: new Factory("mining", { forests: 2 }, 1000),
  renewable_energy: new Factory("renewable_energy", { coal: 4, oil: 2 }, 1500),
  agriculture: new Factory("agriculture", { coal: 1, forests: 1 }, 600),
  textile: new Factory("textile", { coal: 2, forests: 1 }, 700),
  electronics: new Factory("electronics", { coal: 2, oil: 3 }, 1300),
  machinery: new Factory("machinery", { coal: 3, oil: 2 }, 1100),
  garments: new Factory("garments", { coal: 1, oil: 1 }, 500),
  software: new Factory("software", { oil: 3 }, 2000),
  tourism: new Factory("tourism", { coal: 2 }, 900),
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
  { oil: 30, coal: 15, forests: 50 },
  { tech: 270, car: 200, renewable_energy: 150 },
  100000000,
  { cars: 12000, fruits: 45000 },
  { electronics: 22000 },
  3500000000000,
  85
);

//africa
let sudoria = new Country(
  "Sudoria",
  80,
  40,
  30,
  10,
  { oil: 50, coal: 30, forests: 40 },
  { mining: 220, agriculture: 260, textile: 80 },
  120000000,
  { cars: 3000, fruits: 60000 },
  { electronics: 1000 },
  1500000000000,
  65
);

//asia
let estasia = new Country(
  "Estasia",
  90,
  50,
  20,
  20,
  { oil: 45, coal: 50, forests: 30 },
  { electronics: 480, machinery: 320, garments: 350 },
  1400000000,
  { cars: 20000, fruits: 50000 },
  { electronics: 50000 },
  11000000000000,
  75
);

//north america
let westhaven = new Country(
  "Westhaven",
  60,
  35,
  15,
  10,
  { oil: 25, coal: 20, forests: 60 },
  { car: 280, software: 400, agriculture: 230 },
  320000000,
  { cars: 15000, fruits: 40000 },
  { electronics: 30000 },
  19000000000000,
  80
);

//south america and australia
let australen = new Country(
  "Australen",
  55,
  30,
  15,
  10,
  { oil: 20, coal: 40, forests: 65 },
  { mining: 210, agriculture: 150, tourism: 90 },
  25000000,
  { cars: 8000, fruits: 25000 },
  { electronics: 7000 },
  1500000000000,
  82
);

class Policy {
  constructor(name, effect) {
    this.name = name;
    this.effect = effect; // Effects would be something like: { air_pollution: -5, economy: -0.05 }
  }

  apply(country) {
    for (let factoryType in this.effects) {
      if (factoryType in country.factoriesQuantities) {
        this.effects[factoryType](globalFactories[factoryType]);
      }
    }
    country.consumeResources(); // Re-evaluate after policy effects
  }
}

const electricCarIncentive = new Policy("Electric Car Incentive", {
  car: (factory) => {
    factory.economicGain *= 0.5; // Reduce economic gain of car factories by 50%
  },
  tech: (factory) => {
    factory.economicGain *= 1.1; // Increase economic gain of tech factories by 10%
  },
});

const deforestationBan = new Policy("Deforestation Ban", {
  mining: (factory) => {
    factory.resourceConsumption.forests = 0; // No more forest consumption
    factory.economicGain *= 0.7; // Reduce economic gain by 30% due to loss of forest resources
  },
});

const carbonTax = new Policy("Carbon Tax", {
  car: (factory) => {
    factory.resourceConsumption.coal *= 0.9; // Reduce coal consumption by 10%
    factory.economicGain *= 0.8; // Reduce economic gain by 20% due to the tax
  },
  plastic: (factory) => {
    factory.resourceConsumption.oil *= 0.9; // Reduce oil consumption by 10%
    factory.economicGain *= 0.85; // Reduce economic gain by 15% due to the tax
  }
});

const renewableEnergyIncentives = new Policy("Renewable Energy Incentives", {
  textile: (factory) => {
    factory.resourceConsumption.oil = 0; // No more oil consumption
    factory.resourceConsumption.solar += 50; // Increase solar power usage
    factory.economicGain *= 1.1; // Increase economic gain by 10% due to lower energy costs
  }
});

const waterConservation = new Policy("Water Conservation", {
  agriculture: (factory) => {
    factory.resourceConsumption.water *= 0.8; // Reduce water consumption by 20%
    factory.economicGain *= 0.9; // Reduce economic gain by 10% due to less water availability
  }
});

const educationAndTraining = new Policy("Education and Training", {
  all: (factory) => { // Affects all industries
    factory.productivity *= 1.2; // Increase productivity by 20%
    factory.economicGain *= 1.1; // Increase economic gain by 10% due to higher productivity
  }
});


const policyPool = [electricCarIncentive, deforestationBan, carbonTax, renewableEnergyIncentives, waterConservation, educationAndTraining];

function getRandomPolicies(policies, count) {
  let shuffled = policies.slice(0);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function promptUser(policies) {
  console.log("Please choose a policy");
  for (let i = 0; i < policies.length; i++) {
    console.log(`${i + 1}. ${policies[i].name}`);
  }
  let choice = parseInt(prompt("Enter the number of your chosen policy:")) - 1;
  return policies[choice];
}

const maxPerCapitaIncome = 500000;

function calculateHappiness(country) {
  let perCapitaIncome = country.economy / country.population;

  // Scaling the per capita income to a happiness scale of 0 to 100.
  let happiness = (perCapitaIncome / maxPerCapitaIncome) * 100;

  // Ensuring happiness remains between 0 and 100.
  if (happiness > 100) happiness = 100;
  if (happiness < 0) happiness = 0;

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

function chooseDifficulty() {
  console.log("choose difficulty");
  let chosenDifficulty = prompt(
    "Choose a difficulty level (easy/normal/hard):"
  );
  return chosenDifficulty;
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
  Norlandia: { Earthquake: 0.1, Flood: 0.2 },
  Sudoria: { Earthquake: 0.2, Flood: 0.1 },
  Estasia: { Earthquake: 0.15, Flood: 0.15 },
  Westhaven: { Earthquake: 0.05, Flood: 0.05 },
  Australen: { Earthquake: 0.1, Flood: 0.1 },
};

function triggerRandomEvent(countries) {
  for (let country of countries) {
    for (let eventName in eventLikelihoods[country.countryName]) {
      if (Math.random() < eventLikelihoods[country.countryName][eventName]) {
        let randomEvent = getRandomEventByName(eventName);
        applyRandomEventEffects(country, randomEvent);
      }
    }
  }
}

function simulateDay(countries, difficulty) {
  console.log("ran simulate");
  let selectedPolicies = getRandomPolicies(policyPool, 3);

  let chosenPolicy = promptUser(selectedPolicies);
  console.log(chosenPolicy);

  triggerRandomEvent(countries);

  for (let country of countries) {
    applyDifficultySettings(country, difficulty);
    chosenPolicy.apply(country);

    country.renewResource();
    country.consumeResources();
    country.happiness = calculateHappiness(country);
  }
}
let allCountries = [norlandia, sudoria, estasia, westhaven, australen];

function getRandomEventByName(eventName) {
  return randomEvents.find((event) => event.name === eventName);
}

// Function to apply effects of a random event to a country
function applyRandomEventEffects(country, randomEvent) {
  randomEvent.effects(country);
}

function formatObject(obj) {
  let formatted = '';
  for (let [key, value] of Object.entries(obj)) {
    formatted += `${key}: ${value}, `;
  }
  return formatted.slice(0, -2); // Remove the last comma and space
}

// Get references to the container and policyButtons elements
const container = document.getElementById("container");
const policyButtons = document.getElementById("policyButtons");

// Function to create country blocks
function createCountryBlock(country) {
  const block = document.createElement("div");
  block.className = "country-block";
  block.innerHTML = `
    <h2>${country.countryName}</h2>
    <p>Economy: ${country.economy}</p>
    <p>Happiness: ${parseFloat(country.happiness).toFixed(2)}</p>
    <p>Total Pollution: ${country.totalPollution}</p>
    <p>Air Pollution: ${country.airPollution}</p>
    <p>Land Pollution: ${country.landPollution}</p>
    <p>Water Pollution: ${country.waterPollution}</p>
    <p>Industry: ${formatObject(country.factories)}</p>
    <p>Natural Resource: ${formatObject(country.naturalResource)}</p>
    <!-- Add more stats as needed -->
  `;
  return block;
}

// Display country blocks
allCountries.forEach((country) => {
  const countryBlock = createCountryBlock(country);
  container.appendChild(countryBlock);
});

// Add click event for the "Run Simulation" button
document.getElementById("runSimulation").addEventListener("click", function () {
  // Simulate the day when the button is clicked

      let chosenDifficulty = chooseDifficulty();
      console.log(chosenDifficulty);

      if (difficulties[chosenDifficulty]) {
        // Simulate a day with the chosen difficulty
        simulateDay(allCountries, chosenDifficulty);
        updateCountryInfo(); // Update displayed country info
      } else {
        console.log("Invalid difficulty level chosen.");
      }
});

// Additional functions for updating UI and handling user interactions
function updateCountryInfo() {
  // Update country blocks with new data
  const countryBlocks = document.querySelectorAll(".country-block");
  countryBlocks.forEach((block, index) => {
    block.innerHTML = `
      <h2>${allCountries[index].countryName}</h2>
      <p>Population: ${allCountries[index].population}</p>
      <p>Economy: ${allCountries[index].economy}</p>
      <p>Happiness: ${parseFloat(allCountries[index].happiness).toFixed(2)}</p>
      <p>TotalPollution: ${allCountries[index].totalPollution}</p>
      <p>Air Pollution: ${allCountries[index].airPollution}</p>
      <p>Land Pollution: ${allCountries[index].landPollution}</p>
      <p>Water Pollution: ${allCountries[index].waterPollution}</p>
      <p>Industry: ${formatObject(allCountries[index].factories)}</p>
      <p>Natural Resource: ${formatObject(allCountries[index].naturalResource)}</p>

      <!-- Update other stats as needed -->
    `;
  });
}

// Initialize the UI when the page loads
function initializeUI() {
  updateCountryInfo();
}

document.addEventListener("DOMContentLoaded", function () {
  initializeUI(); // Initialize the UI when the DOM is fully loaded
});

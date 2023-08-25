class Country {
    constructor (countryName, totalPollution, airPollution, landPollution, waterPollution, naturalResource, factories, population, Im, Ex, economy, happiness){
        this.countryName = countryName;
        // Pollution Levels
        this.total_pollution = total_pollution;
        this.air_pollution = air_pollution;
        this.land_pollution = land_pollution;
        this.water_pollution = water_pollution;

        // Natural Resources (e.g., { oil: 40, coal: 20, forests: 60 })
        this.natural_resources = natural_resources;

        // Factories (e.g., { car: 200, plastic: 50, textile: 120 })
        this.factories = factories;

         // Population (could further break down into high, medium, low consumption if needed)
         this.population = population;

          // Imports (e.g., { cars: 1000, fruits: 5000 })
        this.imports = imports;

        // Exports (e.g., { electronics: 2000 })
        this.exports = exports;

        // Economy
        this.economy = economy;

        // Happiness Level
        this.happiness = happiness;
    }

    consumeResources(){
        for(let factoryType in this.factories){
            const factory = globalFactories[factoryType];
            const quantity = this.factories[factoryType];

            this.economy+=factory.economicGain*quantity;

            for(let resource in factory.resourceConsumption){
                if(resource in this.natural_resources) {
                    let resourceConsumed = factory.resourceConsumption[resource]*quantity;

                    this.natural_resources[resource] -=resourceConsumed;

                    this.economy -= globalResourceCosts[resource] * resourceConsumed;
                }
            }
        }
    }
}

class Factory {
    constructor (type, resourceConsumption, economicGain){
        this.type=type;
        this.resourceConsumption=resourceConsumption;
        this.economicGain=economicGain; // e.g., 1200 for tech, 800 for car, 1000 for mining
    }


}

const globalFactories={
    tech: new Factory('tech', { oil: 2 }, 1200),
    car: new Factory('car', { coal: 3, oil: 5 }, 800),
    mining: new Factory('mining', { forests: 2 }, 1000),
    renewable_energy:
    agriculture:
    textile:
    electronics:
    machinery:
    garments:
    software:
    tourism:
}

const globalResourceCost = {
    oil: 500,
    coal: 400,
    forests: 700
}
//eruope
let norlandia = new Country(
    "Norlandia", 
    50, 30, 10, 10,
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
    80, 40, 30, 10,
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
    90, 50, 20, 20,
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
    60, 35, 15, 10,
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
    55, 30, 15, 10,
    { oil: 20, coal: 40, forests: 65 },
    { mining: 210, agriculture: 150, tourism: 90 },
    25000000,
    { cars: 8000, fruits: 25000 },
    { electronics: 7000 },
    1500000000000,
    82
);

class Policy {
    constructor (name, effect){
        this.name=name;
        this.effect=effect; // Effects would be something like: { air_pollution: -5, economy: -0.05 }
    }

    apply(country) {
        for (let factoryType in this.effects) {
            if (factoryType in country.factoriesQuantities) {
                this.effects[factoryType](globalFactories[factoryType]);
            }
        }
        country.consumeResources();  // Re-evaluate after policy effects
    }
}

const electricCarIncentive = new Policy("Electric Car Incentive", {
    car: (factory) => {
        factory.economicGain *= 0.50;  // Reduce economic gain of car factories by 50%
    },
    tech: (factory) => {
        factory.economicGain *= 1.10;  // Increase economic gain of tech factories by 10%
    }
});

const deforestationBan = new Policy("Deforestation Ban", {
    mining: (factory) => {
        factory.resourceConsumption.forests = 0;  // No more forest consumption
        factory.economicGain *= 0.70;  // Reduce economic gain by 30% due to loss of forest resources
    }
});

const policyPool=[electricCarIncentive, deforestationBan];

function getRandomPolicies(policies, count){
    let shuffled = policies.slice(0);
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

function promptUser(policies){
    console.log("Please choose a policy");
    for (let i = 0; i < policies.length; i++) {
        console.log(`${i + 1}. ${policies[i].name}`);
    }
    let choice = parseInt(prompt("Enter the number of your chosen policy:")) - 1;
    return policies[choice];
}

const maxPerCapitaIncome = 500000;

function calculateHappiness(country){
    let perCapitaIncome = country.economy / country.population;
    
    // Scaling the per capita income to a happiness scale of 0 to 100.
    let happiness = (perCapitaIncome / maxPerCapitaIncome) * 100;
    
    // Ensuring happiness remains between 0 and 100.
    if (happiness > 100) happiness = 100;
    if (happiness < 0) happiness = 0;
    
    return happiness;
}

function simulateDay(countries) {
    let selectedPolicies = getRandomPolicies(policyPool, 3);

    let chosenPolicy = promptUserForPolicy(selectedPolicies);

    for(let country of countries){
        chosenPolicy.apply(country);
        country.consumeResources();
        country.happiness=calculateHappiness(country);
    }
}
let allCountries = [norlandia, sudoria, estasia, westhaven, australen];

simulateDay();

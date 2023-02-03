const { kitties } = require('./datasets/kitties');
const { puppers } = require('./datasets/puppers');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { nationalParks } = require('./datasets/nationalParks');
const { weather } = require('./datasets/weather');
const { boardGames } = require('./datasets/boardGames');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');



// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangePetNames(petType) {
    // Return an array of just the names of kitties who are orange e.g.
        // ['Tiger', 'Snickers']

        let orangePets = petType.filter(element => element.color === "orange").map(element => element.name);

        return orangePets;

    // Annotation:
    // Given an array of objects, and want an array of strings 
    // first we want to filter a new array into just the objects that have the color value of orange
    // then we want to map the objects to a new array of just the name value of each of those objects
    // return our new array of strings
  },

  sortByAge(petType) {
    // Sort the kitties by their age

    const givenPets = petType.sort((x, y) => y.age - x.age);

    return givenPets;

    // Annotation:
    // Given an array of objects, want an array of objects in a particular order
    // sort the objects in descending order by subtracting the next elements age by the current elements age
    // sort will order them accordingly
  },

  growUp(petType) {
    // Return an array of kitties who have all grown up by 2 years e.g.
    // [{
    //   name: 'Felicia',
    //   age: 4,
    //   color: 'grey'
    // },
    // {
    //   name: 'Tiger',
    //   age: 7,
    //   color: 'orange'
    // },
    // ...etc]

    let givenPets = petType.map(element => {
      element.age +=2;
      return element;
    });

    return givenPets;
  }
};

// PLEASE READ-----------------------
// Currently, your functions are probably using the `kitties` global import variable.
// refactor the above functions using arguments and parameters so that
// they can perform the same utility
// for the kitties or puppers datasets, depending on what arguments you send through.


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs(clubsData) {
    // Your function should access the clubs data through a parameter (it is being passed as an argument in the test file)
    // Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g.
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }

    let clubMembers = clubsData.map(element => element.members);
    clubMembers = clubMembers.flat(1);
    clubMembers = clubMembers.filter((element, index, array) => array.indexOf(element) === index);

    const memberClubs = clubMembers.map(element => clubsData.filter(dataElement => dataElement.members.includes(element)));

    const memberObject = clubMembers.reduce((accumulator, element, index) => {
      accumulator[element] = memberClubs[index].map(element => element.club);
      return accumulator;
    }, {});

    return memberObject;

    // Annotation:
    // Mapping an array of all the arrays of club members
    // flattening it down to just one big array
    // filtering out the duplicates, this variable is our keys for our object

    // mapping an array of arrays with each club object the member shows up in
    
    // reducing the members down to one object with the keys being each element in the club members array
    // and the values as a mapped array of the clubs the member is in from the array of club objects the member is in
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    // Return an array of objects where the keys are mod (the number of the module)
    // and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
    // [
    //   { mod: 1, studentsPerInstructor: 9 },
    //   { mod: 2, studentsPerInstructor: 11 },
    //   { mod: 3, studentsPerInstructor: 10 },
    //   { mod: 4, studentsPerInstructor: 8 }
    // ]

    const stuPerInst = mods.map(calcStuPerInst);

    function calcStuPerInst(element) {
      let newOb = {
        mod: element.mod,
        studentsPerInstructor: element.students / element.instructors
      }
      return newOb;
    };

    return stuPerInst;

    // Annotation:
    // Mapping a new array that creates an object with new properties, then returning it with math done
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  stockPerCake() {
    // Return an array of objects that include just the flavor of the cake and how
    // much of that cake is in stock e.g.
    // [
    //    { flavor: 'dark chocolate', inStock: 15 },
    //    { flavor: 'yellow', inStock: 14 },
    //    ..etc
    // ]

    const cakesFlavCount = cakes.map(element => ({
        flavor: element.cakeFlavor,
        inStock: element.inStock
      }));

    return cakesFlavCount;

    // Annotation:
    // map an array where each element is an object with keys flavor and inStock and the respective values
  },

  onlyInStock() {
    // Return an array of only the cakes that are in stock
    // e.g.
    // [
    //   {
    //   cakeFlavor: 'dark chocolate',
    //   filling: null,
    //   frosting: 'dark chocolate ganache',
    //   toppings: ['dutch process cocoa', 'toasted sugar', 'smoked sea salt'],
    //   inStock: 15
    // },
    // {
    //   cakeFlavor: 'yellow',
    //   filling: 'citrus glaze',
    //   frosting: 'chantilly cream',
    //   toppings: ['berries', 'edible flowers'],
    //   inStock: 14
    // },
    // ..etc
    // ]

    const inStockCakes = cakes.filter(element => element.inStock);

    return inStockCakes;

    // Annotation:
    // filter the element looking for a truthy value
    // if the cake isn't in stock it's value is 0 which is falsy
  },

  totalInventory() {
    // Return the total amount of cakes in stock e.g.
    // 59

    const totalCakes = cakes.reduce((accumulator, currentElement) => accumulator + currentElement.inStock, 0);

    return totalCakes;

    // Annotation:
    // reduce to one value, add the accumulator and current elements, give it an initial value of 0(int)
  },

  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]

    let cakeToppings = cakes.map(element => element.toppings);

    cakeToppings = cakeToppings.flat(1);

    const noDupesToppings = cakeToppings.filter(checkForDupes);

    function checkForDupes(element, index, array) {
      return array.indexOf(element) === index;
    };

    return noDupesToppings;

    // Annotation:
    // map the toppings to an array (array of arrays)
    // flatten the array of arrays to one array (only one level of depth)
    // filter checking if the index of the current element in the array is equal to the current index of the loop
  },

  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // {
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2,
    //    ...etc
    // }

    let cakeToppings = cakes.map(element => element.toppings);
    cakeToppings = cakeToppings.flat(1);

    const noDupesToppings = cakeToppings.filter((element, index, array) => {
      return array.indexOf(element) === index;
    });
    
    const shoppingList = noDupesToppings.reduce(createList, {});

    function createList(accumulator, element, index) {
      accumulator[noDupesToppings[index]] = cakeToppings.filter(secElement => secElement === element).length;
      return accumulator;
    };

    return shoppingList;

    // Annotation:
    // initialized an empty object
    // same as above, made an array of arrays for toppings and flattened it down
    // filtered out the duplicates to get the first list of toppings to use as keys
    // for each element in the no dupes want to give it a key of whatever element it's currently at (no dupes)

    // then want to set each of those properties to the length of the array of each topping filtered out from 
    // the array that includes duplicates, so that we can "count" the number of times each topping appears
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    // Create an array of just the front-end classrooms. e.g.
    // [
    //   { roomLetter: 'A', program: 'FE', capacity: 32 },
    //   { roomLetter: 'C', program: 'FE', capacity: 27 },
    //   { roomLetter: 'E', program: 'FE', capacity: 22 },
    //   { roomLetter: 'G', program: 'FE', capacity: 29 }
    // ]

    const onlyFe = classrooms.filter(element => element.program === 'FE');

    return onlyFe;

    // Annotation:
    // filtering the array to check if the program is frontend
  },

  totalCapacities() {
    // Create an object where the keys are 'feCapacity' and 'beCapacity',
    // and the values are the total capacity for all classrooms in each program e.g.
    // {
    //   feCapacity: 110,
    //   beCapacity: 96
    // }

    const totCap = classrooms.reduce((acc, element)=> {
      element.program === 'FE' ? acc.feCapacity += element.capacity : acc.beCapacity += element.capacity;
      return acc;
    }, {feCapacity: 0, beCapacity: 0});

    return totCap;

    // Annotation:
  },

  sortByCapacity() {
    // Return the array of classrooms sorted by their capacity (least capacity to greatest)

    const sortedClasses = classrooms.sort((x, y) => x.capacity - y.capacity);

    return sortedClasses;

    // Annotation:
    // use the sort method to sort things
  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: books from './datasets/books

const bookPrompts = {
  removeViolence(bookData) {
    // Your function should access the books data through a parameter (it is being passed as an argument in the test file)
    // return an array of all book titles that are not horror or true crime. Eg:

    //  ['1984', 'The Great Gatsby', 'Lord of the Flies', 'Harry Potter and the Sorcerer\'s Stone',
    //   'The Hitchhiker\'s Guide to the Galaxy', 'Flowers for Algernon', 'Slaughterhouse-Five',
    //   'The Handmaid\'s Tale', 'The Metamorphosis', 'Brave New World', 'Life of Pi',
    //   'The Curious Incident of the Dog in the Night - Time', 'The Bell Jar',
    //   'Catch-22', 'Treasure Island']


    const notViolent = bookData.filter(element => element.genre !== 'Horror' && element.genre !== 'True Crime');
    const notViolentTitles = notViolent.map(element => element.title);

    return notViolentTitles;

    // Annotation:
    // Filter out all the violent books
    // make a new array of just the titles of the nonviolent books

  },
  getNewBooks(bookData) {
    // return an array of objects containing all books that were
    // published in the 90's and 00's. Inlucde the title and the year Eg:

    // [{ title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
    //  { title: 'Life of Pi', year: 2001 },
    //  { title: 'The Curious Incident of the Dog in the Night-Time', year: 2003 }]

    const newerBooks = bookData.filter(element => element.published > 1989 && element.published < 2010);
    const newBookObjects = newerBooks.map(element => ({title: element.title, year: element.published}));

    return newBookObjects;

    // Annotation:
    // filter for all the books from 1990 to 2009
    // map a new array that returns an object with a title and year property of the elements title and published year
  },

  getBooksByYear(books, year) {
    // return an array of objects containing all books that were
    // published after the specified year without the author or genre data. 
    // The published property should be changed to year for the returned books.
    // e.g. given 1990, return

    // [{ title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
    //  { title: 'Life of Pi', year: 2001 },
    //  { title: 'The Curious Incident of the Dog in the Night-Time', year: 2003 }]

    const booksPastYear = books.filter(element => element.published > year);
    const newBookObjects = booksPastYear.map(element => ({title: element.title, year: element.published}));

    return newBookObjects;

    // Annotation:
    // filter out all the elements that come after the specified year
    // map a new array of objects with a title and year property that has the value of the elements title and published year
  }

};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: weather from './datasets/weather

const weatherPrompts = {
  getAverageTemps() {
    // return an array of all the average temperatures. Eg:
    // [ 40, 40, 44.5, 43.5, 57, 35, 65.5, 62, 14, 46.5 ]

    const avgTemps = weather.map(element => {
      return (element.temperature.high + element.temperature.low) / 2
    });

    return avgTemps;

    // Annotation:
    // mapping a new array that will just have the average temp for each element
  },

  findSunnySpots() {
    // Return an array of sentences of the locations that are sunny
    // and mostly sunny. Include the location and weather type. Eg:
    // [ 'Atlanta, Georgia is sunny.',
    // 'New Orleans, Louisiana is sunny.',
    // 'Raleigh, North Carolina is mostly sunny.' ]

    const sunnyLocations = weather.filter(checkForSunny);

    function checkForSunny(element) {
      return element.type.includes("sunny");
    };

    const locationSentences = sunnyLocations.map(structureSentences);

    function structureSentences(element) {
      return `${element.location} is ${element.type}.`;
    };

    return locationSentences;

    // Annotation:
    // filtering the array to get a new array with just the elements that have sunny somewhere in their type
    // mapping a new array with that array to use those passing elements in making the sentences
  },

  findHighestHumidity() {
    // Return the location with the highest humidity. Eg:
    // {
    //   location: 'Portland, Oregon',
    //   type: 'cloudy',
    //   humidity: 84,
    //   temperature: { high: 49, low: 38 }
    // }

    weather.sort((x, y) => y.humidity - x.humidity);

    return weather[0];

    // Annotation:
    // Sorting the array by humidity highest to lowest
    // Returning the first element (highest humidity)
  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: nationalParks from ./datasets/nationalParks

const nationalParksPrompts = {
  getParkVisitList() {
    /// Return an object containing the names of which parks I need to visit
    // and the ones I have already visited eg:
    // {
    //   parksToVisit: ["Yellowstone", "Glacier", "Everglades"],
    //   parksVisited: ["Rocky Mountain", "Acadia", "Zion"]
    //}
    
    const parks = nationalParks.reduce(acc => {
      acc.parksToVisit = nationalParks.filter(element => !element.visited).map(element => element.name);
      acc.parksVisited = nationalParks.filter(element => element.visited).map(element => element.name);
      return acc;
    }, {});

    return parks;

    // Annotation:
  },

  getParkInEachState() {
    // Return an array of objects where the key is the state and the value is its National Park
    // eg: [ { Colorado: 'Rocky Mountain' },
    // { Wyoming: 'Yellowstone' },
    // { Montana: 'Glacier' },
    // { Maine: 'Acadia' },
    // { Utah: 'Zion' },
    // { Florida: 'Everglades' } ]


    const statesParks = nationalParks.map(createStateParksObj);

    function createStateParksObj(element) {
      let obj = {
        [element.location]: element.name 
      };
      return obj;
    };

    return statesParks;

    // Annotation:
    // map a new array of objects with the key being each element's location and the value being each element's name
  },

  getParkActivities() {
    // Return an array of all the activities I can do
    // in a National Park. Make sure to exclude duplicates. eg:
    // [ 'hiking',
    //   'shoeshoing',
    //   'camping',
    //   'fishing',
    //   'boating',
    //   'watching wildlife',
    //   'cross-country skiing',
    //   'swimming',
    //   'bird watching',
    //   'canyoneering',
    //   'backpacking',
    //   'rock climbing' ]

    let activities = nationalParks.map(element => element.activities);

    activities = activities.flat(1);

    const noDupesActivities = activities.filter(checkForDupes);

    function checkForDupes(element, index, array) {
      return array.indexOf(element) === index;
    };

    return noDupesActivities;

    // Annotation:
    // Create an array of the arrays of activites
    // flatten the array of arrays down to just one array (with 1 layer deep of flattening)
    // filter the array of activites checking for duplicates

    // the check sees if the indexOf the element (first location of the element) is equal to the current
    // index of the loop, and if it is it pulls the element
  }
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    // Return the total beer count of all beers for every brewery e.g.
    // 40

    const totalBeers = breweries.reduce(countBeers, 0);

    function countBeers(total, brewery) {
      return total + brewery.beers.length;
    };

    return totalBeers;

    // Annotation:
    // Using .reduce with a callback function and an initial value for the accumulator
    // passing in the accumulator and current element
    // adding the length of the current elements "beer" property's array to the accumulator
    // returning the reduced value
  },

  getBreweryBeerCount() {
    // Return an array of objects where each object has the name of a brewery
    // and the count of the beers that brewery has e.g.
    // [
    //  { name: 'Little Machine Brew', beerCount: 12 },
    //  { name: 'Ratio Beerworks', beerCount: 5},
    // ...etc.
    // ]

    const breweriesAndCounts = breweries.map(returnNameAndCount);

    function returnNameAndCount(element) {
      let currentBrewery = {
        name: element.name,
        beerCount: element.beers.length
      }

      return currentBrewery;
    };

    return breweriesAndCounts;

    // Annotation:
    // creating a new array and transforming the data of the current array with map
    // using a function to create a new object literal with the passed in element's name and beerCount as length of it's beers array
    // returning the newly mapped array
  },

  getSingleBreweryBeerCount(breweryName) {
    // Return a number that is the count of beers that the specified
    // brewery has e.g.
    // given 'Ratio Beerworks', return 5

    const specifiedBrewery = breweries.find(element => element.name === breweryName);

    return specifiedBrewery.beers.length;

    // Annotation:
    // Looking for the element that has the name property that's equal to the passed in name
    // returning the length of the beers property array of the single matching element
  },

  findHighestAbvBeer() {
    // Return the beer which has the highest ABV of all beers
    // e.g.
    // { name: 'Barrel Aged Nature\'s Sweater', type: 'Barley Wine', abv: 10.9, ibu: 40 }

    const eachHighestAbvBeer = breweries.map(checkAbvs);

    function checkAbvs(element) {
      let beers = element.beers.sort((x, y) => {
        return y.abv - x.abv;
      });

      return beers[0];
    };

    const sortedBeers = eachHighestAbvBeer.sort((x, y) => {
      return y.abv - x.abv;
    });

    return sortedBeers[0];

    // Annotation:
    // Creating an array of all of the highest abv beers for each brewery
    // sorting the new array of highest abv beers for each brewery
    // returning the first element in the sorted array (sorted by abv in descending order)
  }
};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: weather from './datasets/boardGames

const boardGamePrompts = {
  listGames(type) {
    // Return an array of just the names of the games within a specified type. 
    // e.g. given an argument of "strategy", return
    // ["Chess", "Catan", "Checkers", "Pandemic", "Battle Ship", "Azul", "Ticket to Ride"]

    const gamesByType = boardGames[type].map(game => game.name);

    return gamesByType;

    // Annotation:
    // Make a new array of just the names of the specified type of board game
  },

  listGamesAlphabetically(type) {
    // Return an array of just the names of the games within a specified 
    // type, sorted alphabetically. 
    // e.g. given an argument of "childrens", return
    // ["Candy Land", "Connect Four", "Operation", "Trouble"]

    const gamesByTypeAlpha = boardGames[type].map(game => game.name).sort();

    return gamesByTypeAlpha;

    // Annotation:
    // Make a new array of the names of games of specified type, sort it alphabetically
  },

  findHighestRatedGamesByType(type) {
    // Return an object which is the highest rated game within the specified type.
    // e.g. given the argument of 'party', return
    // { name: 'Codenames', rating: 7.4, maxPlayers: 8 },

    const highestRatedByType = boardGames[type].sort((x, y) => y.rating - x.rating);

    return highestRatedByType[0];

    // Annotation:
    // Sort the array of the games of a specified type by highest rating to lowest and return the first one
  },

  averageScoreByType(type) {
    // Return the average score for the specified type.
    // e.g. given the argument of "strategy", return 7
    // note: do not worry about rounding your result.

    const avgScoreByType = boardGames[type].reduce((score, game) => score + game.rating, 0) / boardGames[type].length;

    return avgScoreByType;

    // Annotation:
    // Add all of the ratings of the games of a specified type together and divide by the length of the specified type's array
  },

  averageScoreByTypeAndPlayers(type, maximumPlayers) {
    // Return the average score of any games that match the specified type
    // and maximum number of players.
    // e.g. given the arguments of "strategy" and 2, return 6.16666666667
    // note: do not worry about rounding your result.

    const maxPlayerGames = boardGames[type].filter(game => game.maxPlayers === maximumPlayers);
    const avgByTypeAndPlayers = maxPlayerGames.reduce((score, game) => score + game.rating, 0) / maxPlayerGames.length;

    return avgByTypeAndPlayers;

    // Annotation:
    // Get all the games with the specified number of maximum players
    // Average their ratings
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g.
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    const studentsEach = instructors.map((element) => {
      return {
        name: element.name, 
        studentCount: cohorts.find(cohort => element.module === cohort.module).studentCount
      };
    });

    return studentsEach;

    // Annotation:
    // Create an array with an object for each element with the properties name and studentCount
    // Set name to the value of whatever the current instructors name is
    // Set studentCount to the studentCount of whatever cohort matches the module of the current instructor
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // {
    // cohort1806: 15,
    // cohort1804: 7
    // }

    const cohortsObj = cohorts.reduce((newObj, element) => {
      newObj[`cohort${element.cohort}`] = element.studentCount / instructors.filter(instructor => instructor.module === element.module).length;
      return newObj;
    }, {});

    return cohortsObj;

    // Annotation:
    // Create an object that has the key of each cohort
    // Give each key a value of the studentCount per cohort divided by the number of instructors for that cohort's module
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    const instructorMods = instructors.reduce((newInstOb, currInst) => {
      const possibleCohorts = cohorts.filter(currCohort => currCohort.curriculum.some(canTeach => currInst.teaches.includes(canTeach)));
      newInstOb[currInst.name] = possibleCohorts.map(cohort => cohort.module);
      return newInstOb;
    }, {});

    return instructorMods;

    // Annotation:
    // Create an object with the keys of each instructors name
    // Create an array of the cohort objects that have at least one curriculum element in common with the elements of what the instructor teaches
    // Denote each key of the instructors name to a new array of all of the modules the instructor can teach
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    let currics = cohorts.map(cohort => cohort.curriculum);
    currics = currics.flat(1);
    currics = currics.filter((element, index, array) => array.indexOf(element) === index);

    const curriculumTeachers = currics.reduce((curricOb, currentSubject) => {
      const possibleInstructors = instructors.filter(instructor => instructor.teaches.some(subject => subject === currentSubject));
      curricOb[currentSubject] = possibleInstructors.map(instructor => instructor.name);
      return curricOb;
    }, {});

    return curriculumTeachers;

    // Annotation:
    // Create an array of arrays of all of the curriculums of every cohort
    // Turn it into just one array of all curriculums
    // Clear out duplicates of the curriculums

    // Create an object with keys of each curriculum
    // Create an array of the possible instructors by checking if the current curriculum is in the instructors 'teaches' array at all
    // Give each key a value of a new array of just the possible instructors names
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    let bossesArray = sidekicks.map(sidekick => bosses[sidekick.boss.toLowerCase()]);
    bossesArray = bossesArray.filter((element, index, array) => array.indexOf(element) === index);

    const newObj = bossesArray.map(boss => {
      let bossSidekicks = sidekicks.filter(sidekick => boss.name === sidekick.boss);
      return {
        bossName: boss.name,
        sidekickLoyalty: bossSidekicks.reduce((loyalty, currentSidekick) => loyalty + currentSidekick.loyaltyToBoss, 0)
      };
    });

    return newObj;

    // Annotation:
    // Turn the bosses object of properties into an array of objects
    // no duplicates
    
    // Make a new object with bossName and sidekickLoyalty keys
    // for each boss make an individual array of only their sidekicks
    // set the bossName value to the current boss' name
    // set the sidekickLoyalty value to the sum of all of the boss' individual sidekick's loyaltyToBoss values
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the star objects that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' },
    //   {
    //     name: 'Achernar',
    //     visualMagnitude: 0.46,
    //     constellation: 'The Plow',
    //     lightYearsFromEarth: 140,
    //     color: 'blue'
    //   },
    //   {
    //     name: 'Hadar',
    //     visualMagnitude: 0.61,
    //     constellation: 'The Little Dipper',
    //     lightYearsFromEarth: 350,
    //     color: 'blue'
    //   }
    // ]

    const constKeys = Object.keys(constellations);
    const constNames = constKeys.map(key => Object.values(constellations[key])).flat(2);

    const constellationStars = stars.filter(star => constNames.some(constellation => constellation === star.constellation));

    constellationStars.sort((x, y) => {
      const const1 = x.constellation.length;
      const const2 = y.constellation.length;

      if (const1 < const2) {
        return -1;
      } else if (const1 > const2) {
        return 1;
      };
      return 0;
    });

    return constellationStars;

    // Annotation:
    // Write your annotation here as a comment
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const starColors = stars.reduce((acc, star) => {
      acc[star.color] = stars.filter(eachStar => eachStar.color === star.color);
      return acc;
    }, {});

    return starColors;

    // Annotation:
    // Write your annotation here as a comment
  },

  constellationsStarsExistIn() {
    // Sort the stars by brightness and return an array of the star's constellation names
    // Brightest Stars are indicated by visualMagnitude - the lower the number, the brighter the star
    // e.g.
    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]


    stars.sort((x, y) => x.visualMagnitude - y.visualMagnitude);

    const starsByLowBrightness = stars.map(star => star.constellation).filter(name => name);

    return starsByLowBrightness;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    const allWeapons = characters.map(char => char.weapons).flat();

    let allDamage = allWeapons.reduce((acc, weap) => {
      return acc + weapons[weap].damage;
    }, 0);

    return allDamage;

    // Annotation:
    // Write your annotation here as a comment
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    const combatStats = characters.map(char => {
      const charStatSum = {};
        charStatSum[char.name] = char.weapons.reduce((statsAcc, statsWeap) => {
          statsAcc.damage += weapons[statsWeap].damage;
          statsAcc.range += weapons[statsWeap].range;
          return statsAcc;
        }, {damage: 0, range: 0});
      return charStatSum;
    });

    return combatStats;

    // const combatXtra = characters.map(element => Object.keys(element));

    // const combatStatsTwo = characters.map((ele, index) => {
    //   let comb = combatXtra[index].reduce(acc => {
    //     acc[ele.name] = ele.weapons.reduce((statsAcc, statsWeap) => {
    //       statsAcc.damage += weapons[statsWeap].damage;
    //       statsAcc.range += weapons[statsWeap].range;
    //       return statsAcc;
    //     }, {damage: 0, range: 0});
    //     return acc;
    //   }, {});
    //   return comb;
    // });
      
    // return combatStatsTwo;

    // Annotation:
    // Write your annotation here as a comment
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    const awesomeMovies = movies.reduce((acc, movie) => {
      let dinoAcc = movie.dinos.filter(element => dinosaurs[element].isAwesome)
      acc[movie.title] = dinoAcc.length;
      return acc;
    }, {});

    return awesomeMovies;

    // Annotation:
    // Write your annotation here as a comment
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    const movieAges = movies.reduce((acc, movie) => {
      if (acc[movie.director]) {
        acc[movie.director][movie.title] = movie.cast.reduce((castAcc, castMember) => {
          castAcc += (movie.yearReleased - humans[castMember].yearBorn);
          return castAcc;
        }, 0);
      } else {
        acc[movie.director] = movie.cast.reduce((castAcc, castMember) => {
          castAcc[movie.title] += movie.yearReleased - humans[castMember].yearBorn;
          return castAcc;
        }, {[movie.title]: 0});
      };
      acc[movie.director][movie.title] = Math.floor(acc[movie.director][movie.title] / movie.cast.length);
      return acc;
    }, {});

    return movieAges;

    // Annotation:
    // Write your annotation here as a comment
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */

    const actors = Object.keys(humans);
    const allCast = movies.map(movie => movie.cast).flat().filter((element, index, array) => array.indexOf(element) === index);
    const notActed = actors.filter(actor => !allCast.includes(actor));

    const uncast = notActed.map(ele => {
      return notActed.reduce(acc => {
        acc.name = ele;
        acc.nationality = humans[ele].nationality;
        acc.imdbStarMeterRating = humans[ele].imdbStarMeterRating;
        return acc;
      }, {name: undefined});
    });

    uncast.sort((x, y) => {
      const notact1 = x.nationality;
      const notact2 = y.nationality;

      if (notact1 < notact2) {
        return -1;
      } else if (notact1 > notact2) {
        return 1;
      };
      return 0;
    });

    return uncast;

    // Annotation:
    // Write your annotation here as a comment
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    const actors = Object.keys(humans);
    const allCast = movies.map(movie => movie.cast).flat().filter((element, index, array) => array.indexOf(element) === index);
    const notActed = actors.filter(actor => allCast.includes(actor));

    const allActors = notActed.map(actor => {
      return notActed.reduce(acc => {
        acc.name = actor;
        acc.ages = movies.filter(movie => movie.cast.includes(actor)).map(mapMovie => mapMovie.yearReleased - humans[actor].yearBorn);
        return acc;
      }, {});
    });

    return allActors;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  weatherPrompts,
  bookPrompts,
  dinosaurPrompts,
  boardGamePrompts,
};

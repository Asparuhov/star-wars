
# WELCOME TO THE STAR WARS UNIVERSE

### This project is all about the star wars universe, you can explore different people, planets, species, starships, vehicles, the relations between them, which person which vehicles owns, which planet is someone from, the statistics of the planet, population etc. and many many more. If you are a Star Wars fan, this applicaiton could keep you occupied for hours.

##Technologies:

###Initialization:
The project is initialized using the refine.dev framework

###Core logic:
The size is written on React with Typescript

###UI:
The App's interactive UI is made with great help from Material UI

## How to run the project:

### Install the dependencies:

```bash
    npm install
```

### Start the server.

```bash
    npm run dev
```

### Head to localhost:3000 to see the ran project.


## Features

### Searching feature
When you enter the home page, right off the start, you will see a search bar, in which you can choose a category from all of the avaialble entities in the Star Wars universe and search them by their name, from the results you can dive deeply into the entity's relations tree

###Entity page
Each entity will have their own page in which you can take a look, click on them, learn more about their being, add them to favurites, or why not check what relations they have.

###Image for every entity
Swapi.dev doesn't provide us with images from their API, so what I did is align swapi's api with starwars-visualguide.com's CDN API, so I can give you images of EVERY SINGLE entity on the application, which makes the site alive.

###Responsive design
All pages and views work on all types of devices, from the smallest to the biggest.

###Favorites
When you enter the detailed profile of some entity, you can press the heart icon to add them to your favorites, which will be saved the next time you enter the site, because it uses localStorage to persist your favorites.

###Galactic Trade Calculator 
And probaby the most intruiging part of the App is the Galactic Trade Exchanger as I like to call it. It uses fictional currencies and a REAL TIME CHART to show the simulated demand and supply for the currencies, buying or selling a currency WILL affect the rate of the other currencies just like in the real world, when you choose a currency and it changes its value, the chart will automatically show the change in real time.

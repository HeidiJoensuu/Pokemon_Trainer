# PokemonTrainer

In this project goal was to make simple website for catching pokemons. !n this project we used Angular.js. The purpose of this project was to master our Angular knowledge.

The goal was list and show pokemons with pictures and user can catch and release them.

## scr-folder's structure

```
.
│   favicon.ico
│   index.html                          # Project's main root element
│   main.ts                             # Entry point for project
│   polyfills.ts
│   styles.css
│   test.ts
│
├───app
│   │   app-routing.module.ts           # Contains project URL routing
│   │   app.component.css
│   │   app.component.html
│   │   app.component.ts                # 
│   │   app.module.ts                   # Describes parts of the application
│   │
│   ├───components                      # Contains components of the project
│   │   ├───login-form                  # Form for log in
│   │   │
│   │   ├───navbar                      # 
│   │   │
│   │   ├───pokemon-catalogue           # Lists all pokemons and shows them
│   │   │
│   │   └───trainer-list-items          # Lists all pokemons that have been camptured
│   │
│   ├───enums
│   │       storage-keys.ts             # Contains key-names for browser's storage 
│   │
│   ├───guards
│   │       auth.guard.ts               # Checks if the user is logged in to access any other pages than root page
│   │
│   ├───models                          # Contains models
│   │       pokemon.model.ts
│   │       user.model.ts
│   │
│   ├───pages                           # Contains pages of the project
│   │   ├───catalogue                   # Connects components that are needed in catalogue-page
│   │   │
│   │   ├───login                       # Connects components that are needed in login-page
│   │   │
│   │   └───profile                     # Connects components that are needed in profile-page
│   │
│   ├───services                        # Contains services that contact different APIs
│   │       login.service.ts
│   │       pokemons.service.ts
│   │       unfavourite.service.ts
│   │       user.service.ts
│   │
│   └───utils
│           storage.utils.ts            # Manages localstorage savings
│
└───assets                              # Project's assets
│       .gitkeep
│       Pokeball.png
│       treeComponent.pdf
│
└───environments
        environment.prod.ts
        environment.ts
```
## Run the server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Link to deployed site
https://glitch.com/ is used as API in this project. It is slow (starting) in first api call, so first api call (log in, catching pokemon) might take 5-10 sekonds.

Link to running server: https://pokemon-trainer-h9m597awa-heidijoensuu.vercel.app/
# Phaser-typescript-rpg
The start of a turn-based role playing game.  Mostly turned into an experiment with Vue, Typescript, Phoenix and Elixir.

# Setup
Clone, `npm install`.

Note that in order to run this locally, it's assumed you are running [the rpg-server project](https://github.com/kphurley/rpg-server) on port 4000.

# Scripts

`npm run dev` - This will run a server so you can run the game in a browser.  Open your browser and enter localhost:3000 into the address bar. This will also start a watch process, so you can change the source and the process will recompile and refresh the browser

`npm run deploy` - This will optimize and minimize the compiled bundle.

`npm run check` - Check the project for style issues.

`npm run fix` - Fix all style errors, if possible.

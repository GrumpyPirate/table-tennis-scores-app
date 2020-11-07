# table-tennis-scores-app
Apologies for the length of this README...! I feel it's always good to make notes while developing these mini apps, and I have a lot of fun with these.

## Build and run
1. Build
> npm run build

2. Run the app, and run the dev REST API
> npm run start:app
> npm run start:api

## Developer notes
- The `games` dataset had to be extended so that each game has an `id`, in order to be able to add a new one via a POST request. I also noticed that the games are in a random date order. Ultimately, we need to display these in date order in the visualisation, so this was performed at the API level.
  - This allows frontends to simply display what they get back, avoiding the need for CPU-intensive post-processing. In the real world, this ordering would then also get cached by the infrastructure, speeding up subsequent responses.

- The visualisation I settled on sucks. There isn't really enough data displayed for it to be a useful representation, and adding more than 20 entries to the x axis from the current derived data renders it illegible. I wanted to improve this further, but ended up having to timebox it to focus on other areas of the app like styling, and testing.
  - There are a million ways to skin this cat, and I would take direction from UX/design here on what _should_ ultimately be displayed, so that I could make an informed decision on the right chart and config.
  - Perhaps a way I'd extend the visualisation would be to segment the scores by month, so that the visualisation displays the players' monthly scores, allowing more data to be displayed, and giving an arguably more useful view.

- I wanted to add more tests, but they do take time, so I ensured I covered one of each key area of the app. So complex/simple components, selectors, and state slices, simply to demonstrate how I'd approach and flesh out those tests.

- I came across the wonderful [msw](https://www.npmjs.com/package/msw) library during development, so I messed around with that to mock API responses within tests. It works really well IMO, and I like that it means I don't have to mock the fetching lib of choice. Previously I've used libs like [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter), and even just basic module mocking via Jest to mock API responses.

## Limitations/Solutions/Things to extend
- Scoring system is binary, i.e. it's either a win or a loss between 2 players. What about games with multiple players, like Mario Kart? Where players can score 2nd, 3rd, 5th etc. place - i.e. a 'leaderboard' scoring system?
  - Perhaps add 'GameType' or 'ScoringType' to the data model, allowing frontends to determine exactly how to calculate player score increases/decreases.

- Inability to specify user avatars when creating users.
  - In a real-world scenario we'd likely have a 'user account' section to allow editing user info (including avatars), and a proper 'Create user' form rather than a basic window prompt.

- It'd be nice to be able to sort the `PlayersList` by player score. This should ideally be done at the `PlayersView` level, with perhaps some other options for how to sort them visually.

- There are a LOT of games played. The selected data structure for `gamesByTimestamp` is quick, dirty, and inefficient. Things to consider:
  - It'd be insane to try and display all of these games in one graph. We could perhaps segment the scores into 'Seasons', perhaps by year, or month, and display a separate graph for each.
  - Performance can likely be more optimised by rethinking how to derive player scores per game over time.

- Lots of Array `find`, `filter`, `map` and `reduce` calls to select and derive data from the store, and by extension, the dataset. Memoised selectors have been set up, but would still become more taxing over time given larger arrays of games and players, especially as more and more games are logged.

- There should be a data mapping layer between API responses and the application, ensuring that components never work directly with raw API objects. This would decouple the app from the backend. However those take a while to set up and test, and would be overkill for this challenge.

## App name shortlist

All apps need a name. Here were a few runner-ups, in no order of quality:

- DevTennis
- Epic Tennis Battle
- PingWin
- Without a Paddle
- Off the Table
- Ping When You're Winning
- Not now, I'm develoPing
- PNG
- There Can Be Only One
- What's my ping?

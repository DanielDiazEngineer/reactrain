export const musicLibrary = [
    {
        'title': 'Bohemian Rhapsody',
        'artist': 'Queen',
        'rating': 5,
        'playCount': 1000000,
        'durationSec': 354
    },
    {
        'title': 'Stairway to Heaven',
        'artist': 'Led Zeppelin',
        'rating': 4,
        'playCount': 750000,
        'durationSec': 482
    },
    {
        'title': 'Hotel California',
        'artist': 'Eagles',
        'rating': 4,
        'playCount': 600000,
        'durationSec': 390
    },
    {
        'title': 'Achy Breaky Heart',
        'artist': 'Billy Ray Cyrus',
        'rating': 2,
        'playCount': 300000,
        'durationSec': 205
    },
    {
        'title': 'Sweet Child O\' Mine',
        'artist': 'Guns N\' Roses',
        'rating': 4,
        'playCount': 500000,
        'durationSec': 356
    },
    {
        'title': 'Friday',
        'artist': 'Rebecca Black',
        'rating': 1,
        'playCount': 200000,
        'durationSec': 199
    },
    {
        'title': 'Smells Like Teen Spirit',
        'artist': 'Nirvana',
        'rating': 5,
        'playCount': 800000,
        'durationSec': 301
    },
    {
        'title': 'Don\'t Stop Believin\'',
        'artist': 'Journey',
        'rating': 3,
        'playCount': 450000,
        'durationSec': 251
    },
    {
        'title': 'Wonderwall',
        'artist': 'Oasis',
        'rating': 3,
        'playCount': 400000,
        'durationSec': 258
    },
    {
        'title': 'Another One Bites the Dust',
        'artist': 'Queen',
        'rating': 4,
        'playCount': 550000,
        'durationSec': 214
    },
    {
        'title': 'Ice Ice Baby',
        'artist': 'Vanilla Ice',
        'rating': 2,
        'playCount': 350000,
        'durationSec': 240
    }
]

// 👇 fill out this function
export function noBadSongs(songs) {
    // return only the songs with a `rating` higher than 2
}

// 👇 fill out this function
export function songsSortedByPopularity(songs) {
    // return the songs sorted by `playCount` (highest to lowest)
}

// 👇 fill out this function
export function averageRating(songs) {
    // return the average of all the ratings (with 2 digits after the decimal point) and as a real Number data type
}

// 👇 fill out this function
export function topSongs(songs, count) {
    // return an array with only the top ${count} songs (based on playCount)
}


/*
 * No need to touch the code below
 * however you can reference it to see how the functions are being used
 */
export function main() {
    const funcs = [
        noBadSongs,
        songsSortedByPopularity,
        averageRating,
        topSongs
    ]
    funcs.forEach((func) => {
        const args = func.name === 'topSongs'
            ? [
                musicLibrary,
                5
            ]
            : [musicLibrary]
        document.querySelector(`#${func.name}`).textContent = JSON.stringify(func(...args), null, 2)
    })
}



/////////

// 👇 fill out this function
export function rollDice(sides) {
    // returns a random number between 1 and the sides argument (can 1 exactly or `sides` exactly or anything in between)
}

// 👇 fill out this function
export function roll6SidedDice() {
    // returns a number that's always a max of 6
}

// 👇 fill out this function
export function rollForOneOrMorePlayers(players) {
    // rolls a 6 sided dice for each player and return an object of the results
    return {
        'Player Name': 4, // the random number rolled
        'Another Player Name': 2, // the random number rolled
        'Etc': 2 // the random number rolled
    }
}

/*
 * No need to touch the code below
 * however you can reference it to see how the functions are being used
 */
export function main() {
    function rollForJackAndJill() {
        const rollsForJackAndJill = rollForOneOrMorePlayers([
            'Jack',
            'Jill'
        ])

        document.querySelector('#rollForOneOrMorePlayers').textContent = JSON.stringify(rollsForJackAndJill, null, 2)
    }


    function rollForThomas() {
        const rollForThomas = rollForOneOrMorePlayers('Thomas')
        document.querySelector('#rollForOnePlayer').textContent = JSON.stringify(rollForThomas, null, 2)
    }


    rollForJackAndJill()
    rollForThomas()

    document.getElementById('rollForOneOrMorePlayersButton').addEventListener('click', rollForJackAndJill)
    document.getElementById('rollForOnePlayerButton').addEventListener('click', rollForThomas)
}


/*<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/javascript.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Music Library</title>
  <script type="module" src="/index.js"></script>
  <style>
    body{
      background:#0B0C15;
    }
  </style>
</head>

<body>
  <ul id="nav" class="top-nav"></ul>
  <div id="app">
    <h1 class="exercise-title">Music Library</h1>
    <h3>No Bad Songs (rating > 2)</h3>
    <pre id="noBadSongs"></pre>

    <h3>Songs Sorted by Popularity</h3>
    <pre id="songsSortedByPopularity"></pre>

    <h3>Average Rating</h3>
    <pre id="averageRating"></pre>

    <h3>Top Songs</h3>
    <pre id="topSongs"></pre>
  </div>
  <script type="module">
    import { main } from './scripts/1-music-library.js'
    main()
  </script>
</body>

</html>





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dice Roller</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <script type="module" src="/index.js"></script>
  <style>
    body{
      background:#0B0C15;
    }
  </style>
</head>
<body>
  <ul id="nav" class="top-nav"></ul>
  <div id="app" class="dice-roller-app">
    <div >
      <div >
        <h1 class="exercise-title">Dice Roller</h1>
        <h3>
          Roll For Jack and Jill
          <button id="rollForOneOrMorePlayersButton">Roll</button>

        </h3>
        <pre id="rollForOneOrMorePlayers"></pre>

        <h3>Roll For Thomas

          <button id="rollForOnePlayerButton">Roll</button>
        </h3>
        <pre id="rollForOnePlayer"></pre>
        
      </div>
    </div>
  </div>
  <script type="module">
    import { main } from './scripts/2-dice-roller.js'
    main()
  </script>
</body>
</html>


*/
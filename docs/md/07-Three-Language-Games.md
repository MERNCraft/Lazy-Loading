<!-- Three Language Games -->
<section
  id="three-language-games"
  aria-labelledby="three-language-games"
  data-item="Three Language Games"
>
  <h2><a href="#three-language-games">Three Language Games</a></h2>

In the folder `Sandbox/05_three_games/` you can find the `index.html` file and open it with your local server. You should see a page with three buttons, with the names of the games, and a grey array, where the games will appear.

![The Three Games web app, with none of the games loaded](images/05-three-games.webp)

You can click on each button in turn, to see the game that the app imports and displays:

![Which word is the odd one out?](images/05-odd-one-out.webp)

![Which picture matches the word?](images/05-choose-picture.webp)

![Which word matches the picture?](images/05-choose-word.webp)

## The container app

### index.html

The `index.html` file is deliberately boring: three buttons, one mount point, no framework.

If it helps, you can think of this as the non-React equivalent of a root component with three event triggers and one render target.

<details class="tldr">
<summary>So bore me with it</summary>
The `index.html` file loads a basic stylesheet (which I won't treat here) and a plain JavaScript file (which I describe below).

It creates three buttons and a `<div>` with the `id` `game-space` (the grey area), and wraps these in a `<main>` tag. Nothing complex.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Three Games</title>
  <link rel="stylesheet" href="styles.css">
  <b><script defer src="script.js"></script></b>
</head>
<body>
  <main>
    <div id="buttons">
      <<b>button</b> type="button" id="difference-game">
        Odd One Out
      </button>
      <<b>button</b> type="button" id="picture-game">
          Picture Game
      </button>
      <<b>button</b> type="button" id="word-game">
        Word Game
      </button>
    </div>
    <b><div id="game-space"></div></b>
  </main>
</body>
</html>
```

</details>

### script.js

The `script.js` file is almost identical to the <button data-name="anchor-import-placeholder">ones you've already seen</button>. The only major differences are that this time:

1. There are three buttons which are given the same event listener
2. The `url` of the module that is loaded is obtained using the `id` of the button that was clicked.

```javascript
const buttons = document.<b>getElementsByTagName</b>("button")
const gameSpace = document.getElementById("game-space")

<b>Array.from(buttons).forEach( button => {</b>
  button.addEventListener("click", importGame)
<b>})</b>

function importGame(<b>event</b>) {
  <b>const gameName = event.target.id
  const url = `./games/${gameName}.js`</b>
  const promise = import(url)
  promise
    .then(result => result.default)
    .then(renderGame => renderGame(gameSpace))
    .catch(error => console.error(error))
}
```
As you will see later, this is the same pattern that `React.lazy()` uses internally: a user action triggers a dynamic import, which resolves to a render function.

## The three games

The first game (Odd One Out) is clearly different from the other two. It has no images and it uses a different set of words.

The other two games (Picture Game and Word Game) have a lot in common. Although each has its own specific game logic, they share:

* the same word list
* the same images
* the same basic styling and layout
* the method for checking if the player got the right answer.

It would make sense for them to import these shared features from the same modules. These modules would be loaded and evaluated once, when the first of the two games is imported, and then be already available when the second game is opened.

## Making work for you
But this is a tutorial, so I have deliberately coded them differently, to give you some work to do.

You can imagine that each of these files was written by a different member of your Dev Team, after an initial discussion about the use of modules. Each member of the team has understood the concept slightly differently.

If you can apply the same elegant modular to each of these mini-games, then you will have shown how much you have understood so far.

But first you need to know what you have to work on.

## picture-game.js: a standalone approach

I won't show all the code in `Sandbox/05-three-games/games/picture-game.js` here, because you can have the file itself that you can look at. You don’t need to understand the whole file. Just notice how many different responsibilities it has.

Here's what to look out for:

* Everything lives in one file
* Styles, data, logic are bundled
* The module exports a single render function

<details class="tldr">
<summary>A closer look</summary>
You'll find that the file at `Sandbox/05-three-games/games/picture-game.js` is organized in a similar way to the <button data-name="anchor-number-game">Number Game</button> from the last section:

1. Everything is included in one file.
2. The data used by the game is defined inside the file itself:
   ```javascript-#6
   const words = [
     "ball",
     "bear",
     "bell",
     "boar",
     "fair",
     "fall",
     "fell",
     "four"
   ]
   ```
3. There are helper functions to control the logic of the game, such as:
   ```javascript-#92
   const checkClick = ( target, word, button, div ) => {
   ```
   ```javascript-w
   // 9 lines skipped
   ```
   ```javascript-#102
   }
   ```
4. The UI is generated using the function that is exported as `default`:
   ```javascript-#106
   export default function renderGame(root) {
   ```
  ```javascript-w
  // 40 lines skipped
  ```
   ```javascript-#147
   }
   ```
1. Styling is treated inline (using a somewhat more sophisticated method than in the <button data-name="anchor-number-game">Number Game</button>):
   ```javascript-#33
   const <b>h2Styles</b> = {
     margin: 0,
     "text-align": "center",
   }
   ```
   ```javascript-#60
   const <b>applyStyles</b> = (element, styles) => {
     Object.assign(element.style, styles)
   }
   ```
   ```javascript-#135
   const h2 = document.createElement("h2")
   h2.textContent = word
   <b>applyStyles(h2, h2Styles)</b>
  ```

</details>

### Cleaning up before moving in

If you look at both `difference.js` and `picture-game.js`, you will see that, despite their differences, they both clear out any DOM elements before they start adding their own. Each of them contains its own `clear()` function, which it calls before it does anything else:

```javascript-w
const clear = element => {
  while (element.firstChild) {
    element.firstChild.remove()
  }
}
```
```javascript-w

  const newGame = () => {
    // Empty the parent element
    clear(root)
```
```javascript-w
    // core of newGame() function skipped
```
```javascript-w
  }
```

This is not best practice. Best practice is DRY: Don't Repeat Yourself. In short, `picture-game.js`, like `difference.js`, are independent and self-contained. But they don't need to be. There's a better way.

<details class="pivot" open>
<summary>Summary</summary>
In this section, you've been able to play with three simple games which can be loaded on demand, using `import()`. In the current set-up, the games are mutually exclusive; you can only play one of them at a time. Each one clears out any DOM components that another has created before installing its own.

The most troubling is that each is independent of the others: they share nothing between them.

When working in React, you have been used to creating components that are stored in a single script but which can be used in multiple places. As you will see in the next section, this is also possible in plain JavaScript. In fact, plain JavaScript could do it first.

In the next section, you'll see how the elements that can be shared between the games can be broken out into separate modules that all can use.

</details>

</section>
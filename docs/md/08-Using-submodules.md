<!-- Using submodules -->
<section
  id="using-submodules"
  aria-labelledby="using-submodules"
  data-item="Using submodules"
>
  <h2><a href="#using-submodules">Using submodules</a></h2>

It's time to look at the `word-game.js` script, and its modular approach.

The `word-game.js` script is much more compact than the other two. Much of the code it needs has been externalized in other modules. The `word-game.js` module uses static `import ... from ...` statements to load the submodules it needs synchronously as part of module evaluation, before continuing executing its own code.

```javascript-#6
<b>import</b> wordGame <b>from</b> './submodules/word.js'
<b>import</b> words <b>from</b> '../../words.json' with { type: 'json' }
<b>import</b> {
  clear,
  getChoices,
  checkClick
} <b>from</b> './submodules/helpers.js'
```

<details class="note" open>
<summary>import ... with { type: "json" }</summary>
Notice how the JSON file is imported:

```javascript-#7
import words from '../../words.json' <b>with { type: 'json' }</b>
```

The [import attribute](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with) `{ type: "json" }` that is applied using the keyword `with` ensures that the browser parses the incoming file correctly.

The Internet is often an unsafe place for packets of data, and a file with the extension `.json` might actually contain malicious JavaScript. The browser does not simply parse it as an _object_: it parses the incoming data specifically as a _JSON object_, and throws an error if this is not the case. Potentially malicious code is neutralized.

See the [MDN article on the subject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with) for more details.

</details>

The `word-game.js` file also contains a function to append a stylesheet to the HTML created by the `index.html` file, rather than using inline styles:

```javascript-#15
const applyStyles = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = './games/submodules/styles.css'
  document.head.appendChild(link)
}
```

Finally, it exports a function which itself activates a module which it imported at the beginning:

```javascript-#26
// This function is the module's public API
export default function renderGame(root) {
  applyStyles()
  return wordGame({ root, words, clear, getChoices, checkClick })
}
```

If you are looking for buzzwords to describe this kind of design pattern, you might like to read more about:

* [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control)
* [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection)

Can you see how, from a React perspective, this parallels the way hooks are passed into components? 

## The submodules/ folder

The real work of `word-game.js` has been delegated to the imported files. The `words.json` file is stored at the root of the `Sandbox/` folder, because you will be using it later. The other imported files are stored in `submodules/` folder.

### submodules/helpers.js

If you compare `helper.js` with `picture-game.js`, you will see that they both include a number of identical functions.

You don’t need to understand every line here — just notice that none of these functions know which game they’re being used in.

```javascript-#6
export const clear = element => {
  while (element.firstChild) {
    element.firstChild.remove()
  }
}


export const getChoices = (words) => {
  // Choose a random word that did not appear in the last 3 times
  let random = Math.floor(Math.random() * (words.length - 3))
  const word = words.splice(random, 1)[0]
  words.push(word) // move to end of words

  const decoys = [...words]
  // Remove the last word, which cannot be a decoy
  decoys.pop()

  // Choose 3 decoys at random
  const choices = Array.from({ length: 3 })
  choices.forEach(( _, index, array ) => {
    const random = Math.floor(Math.random() * decoys.length)
    const decoy = decoys.splice(random, 1)[0]
    array[index] = decoy
  })

  // Place the correct word in a random position
  random = Math.floor(Math.random() * 4)
  choices.splice(random, 0, word)

  return { word, choices }
}


export const checkClick = (target, correct, button) => {
  if (correct) {
    target.classList.add("right")
    button.disabled = false

  } else {
    target.classList.add("wrong")
  }
}
```

The Word Game needs these functions just as much as the Picture Game does, so it makes sense to create a separate module that both games can share. One download: multiple uses.

And as a bonus: you can test these functions in isolation, to make sure that they do exactly what you expect, before making other modules depend on them.

<details class="note" open>
<summary>Named exports, but no default export</summary>
Notice that the functions in `helpers.js` are all declared in a similar way, with an obligatory name:

```javascript-w
export const functionNameRequired = (parameters) => { ... }
```
None of the functions are exported as `default`, like you have seen before:

```javascript-w
export default function optionalFunctioName(parameters) { ... }
```

**Question: Without a default export, what will the imported object look like?**
<details class="answer">
<summary>Answer</summary>
As you might expect: the imported module is an object with no `default` key:

<pre>{
  checkClick: checkClick(target, correct, button),
  clear:      clear(element),
  getChoices: getChoices(words),
  Symbol(Symbol.toStringTag): "Module"
}
</pre>

</details>

</details>

### submodules/word.js

The `submodules/word.js` script receives the `clear()`, `getChoices()` and `checkClick()` functions in the call it receives from `word-games.js`, along with the `words` array, and the `root` DOM element that has been forwarded from the `script.js` module.

All the rest of the code in the `submodules/word.js` script is specific to this one game. The `newGame()` function simply creates the DOM elements needed for one iteration of this particular game.

Note that there are no inline styles. Styling is taken care of by the stylesheet that was appended to the HTML `<head>`.

```javascript-#6
export default function gameCore({
  root,
  words,
  clear,
  getChoices,
  checkClick
}) {
  const newGame = () => {
    // Empty the parent element
    clear(root)

    // Choose a target word and three decoys
    const { word, choices } = getChoices(words)

    // Recreate the game UI with a custom div inside root
    const space = document.createElement("div")
    space.className = "word-game"
    root.append(space)

    const title = document.createElement("h2")
    title.textContent = "Choose the Word"
    space.append(title)

    const image = document.createElement("img")
    image.src = `../images/${word}.webp`
    image.alt = word
    space.append(image)

    const p = document.createElement("p")
    choices.forEach( text => {
      const span = document.createElement("span")
      span.textContent = text
      span.addEventListener(
        "click",
        ({target}) => checkClick( target, text === word, button ))
      p.append(span)
    })
    space.append(p)

    const button = document.createElement("button")
    button.type = "button"
    button.textContent = "Next Image"
    button.addEventListener("click", newGame)
    button.disabled = true
    space.append(button)
  }

  // Force game() to run as soon as gameCore() is called
  newGame()
}
```

## Really?

I just wrote: "All the rest of the code in the `submodules/word.js` script is specific to this one game". It's time for you to prove me wrong, in the following challenge.

<details class="challenge" open>
<summary>Challenge: Refactoring the Games</summary>
How much of the code in `word-game.js` and its submodules can be shared with the Picture Game?

Your challenge (if you accept it) is to refactor the files in the '05-three-games/` folder, so that the least amount of bandwidth is used when a visitor plays all three games.

Consider that you are "coding by differences". Any time you find something that is duplicated in two or more scripts, move that thing out into a module, and import it into the scripts that need to use it.

Do your best to come up with a neat, elegant solution, before you look at my scoring system and my suggested answer.

<details class="solution">
<summary>Scoring</summary>
You can earn a total of 30 points.

 * 1 point for moving `applyStyles()` from `word-game.js` into `helpers.js`
 * 1 point for making it possible to customize the url for the stylesheet in the `applyStyles()` call
 * 2 point for noticing that the creation of the button that triggers `newGame()` is common to all three games, and can be moved to `helpers.js`
 * 1 point for making it possible to customize the name of this button
 * 3 points for noticing that the `differences-game.js` module can use the same `clear()`, `checkClick()` and `newButton()` functions as the other two games, so you can import these from `helpers.js`
 * 4 points for expanding `styles.css` so that it can be used for all three games
 * 4 points for noticing that now the only difference between any of the games is the module that generates the UI for the game, and that this means you can reduce the files `differences-game.js`, `picture-game.js` and `word-game.js` to thin entry points
 * 10 points for creating a generic game module for your thin entry points to use. You can only get this points if your generic module gathers up the data and functions required by all the games, and calls the appropriate game UI function with all the necessary information 
 * 4 points for arranging all the files in a folder hierarchy, and for giving all your files and folders meaningful names.

 You'll find my solution (for which I award myself 30 points) in `06-three-modularized-games/`. And you can award yourself a bonus of 20 points if your own solution is better than mine.

</details>
</details>

<details class="pivot" open>
<summary>Summary</summary>
In this section, you’ve seen a different way to structure a game module: instead of doing everything in one file, `word-game.js` acts as a thin entry point that pulls together data, shared helpers, styles, and a game-specific UI module.

Static imports determine what gets bundled together. Anything that `word-game.js` imports synchronously becomes part of the same download, and anything that lives outside that boundary can be shared with other games at no extra cost.

By pushing common logic into submodules, you reduce duplication, make the code easier to test, and ensure that shared functionality is loaded once and reused. The result is a design that scales: adding new games means writing only what’s different, while everything else stays the same.

You’ve also had the chance to practice refactoring code you didn’t write, with the explicit goal of optimizing it for code splitting.

In the next section, you’ll see the same ideas expressed in JSX, and explore why React needs to provide `lazy()` and `Suspense` when components are loaded dynamically with `import()`. 

</details>

</section>
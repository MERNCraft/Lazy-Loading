<!-- A Simplistic Game -->
<section
  id="a-simplistic-game"
  aria-labelledby="a-simplistic-game"
  data-item="A Simplistic Game"
>
  <h2><a href="#a-simplistic-game">A Simplistic Game</a></h2>

The <button data-name="anchor-import-placeholder">proof of concept code in the last section</button> does not create anything interactive. You can change the content of `placeholder.js` to what is shown below, or open the `04_import_number_game/` subfolder in your `Sandbox/` folder, where you will find the same code.

<h3 name="anchor-number-game">Edited placeholder.js</h3>

```javascript
export default function renderGame(root) {
  root.innerHTML = ""

  const target = Math.ceil(Math.random() * 5)

  const checkNumber = (event) => {
    const button = event.target
    if (button.textContent == target) {
      button.style.background = "green"
      button.style.color = "white"
      
    } else {
      button.disabled = true
    }
  }

  const title = document.createElement("h2")
  title.textContent = `Click number ${target}`
  root.append(title)


  for (let i = 1; i <= 5; i++) {
    const button = document.createElement("button")
    button.textContent = i
    button.style.margin = "0.5em"

    button.onclick = checkNumber

    root.append(button)
  }
}
```
This creates a simple, yet functional game that demonstrates the basics of user interaction:

![Importing an interactive mini-game](images/04-number-game.webp)

<details class="hint" open>
<summary>A React version of the same game</summary>
Compare the plain JavaScript code above to how it would look when written in JSX for React:

### Placeholder.jsx
```javascript
const RenderGame = () => {

  const target = Math.ceil(Math.random() * 5)

   const checkNumber = (event) => {
    const button = event.target
    if (button.textContent == target) {
      button.style.background = "green"
      button.style.color = "white"
      
    } else {
      button.disabled = true
    }
  }

  const title = <h2>Click number {target}</h2>

  const buttons = [1,2,3,4,5].map( number => (
    <button
      key={number}
      onClick={checkNumber}
      style={{
        margin: "0.5em"
      }}
    >
      {number}
    </button>
  ))

  return (
    <>
      { title }
      { buttons }   
    </>
  )
}

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<RenderGame />)
```

You can test this JSX version by launching the `JSindeX.html` file that you'll find in the same `Sandbox/04-import-number-game/` folder.

Do you see how the plain vanilla JavaScript performs an identical function to the JSX code? 

Only the line...

```javascript-#2
  root.innerHTML = ""
```
... has no equivalent in the JSX code, because the JSX code is not imported.

### A peek behind the curtain

The `JSindeX.html` file uses `<script>` tags in the `<head>` to download the code for React and ReactDOM from a CDN, and also downloads a Babel standalone that transpiles the JSX code in `Placeholder.jsx` to plain JavaScript directly in the browser.

```html
<!DOCTYPE html>
<html>
<head>
  <title>JSX Number Game</title>

  <!-- Load React and ReactDOM from CDN -->
  <b><script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script></b>
  <!-- Load Babel standalone to convert JSX to JS -->
  <b><script src="https://unpkg.com/@babel/standalone@7.21.4/babel.min.js"></script></b>

  <!-- Load the custom script that creates the React components -->
    <script defer <b>type="text/babel"</b> src="./Placeholder.jsx"></script>
  
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

**NOTE: Using the Babel standalone is fine for a quick and dirty demo, like this one, but it won't allow you to use `import` in any shape or form. This is why you need to use `esbuild` to precompile the JSX code elsewhere in this tutorial.**

</details>

<details class="pivot" open>
<summary>Summary</summary>
This section has shown you that plain JavaScript can do everything that React's JSX code can do. Indeed, this should go without saying, because JSX transpiles down to JavaScript for production.

The way you write code in modular components in React is made possible by the native JavaScript keyword, `import`.

In the next section, you'll see JavaScript versions of the three mini-language game modules that make up the final React project, which you already saw as a preview at the beginning.

</details>
</section>
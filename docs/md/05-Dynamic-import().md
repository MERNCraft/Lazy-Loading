<!-- Dynamic import() -->
<section
  id="dynamic-import"
  aria-labelledby="dynamic-import"
  data-item="Dynamic import()"
>
  <h2><a href="#dynamic-import">Dynamic import()</a></h2>
  
  The [`import()` command](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) is native JavaScript. You can use it completely independently of React. Its purpose is to request a JavaScript module by URL, downloading it if it has not already been loaded, and to return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). This Promise should resolve to the usable contents of the file if the download is successful.

## Proof of concept

Here's a very simple demo of dynamic `import()` at work. You can create your own scripts similar to the ones listed below, or you can open the `03_import_demo` subfolder in your `Sandbox/` folder.

In either case, you'll need to open the `index.html` file with your local server, for the reasons explained <button data-name="anchor-opening-a-mini-app-in-your-browser">here</button>.

### index.html
A simple HTML file with a button and a `<div>` with the `id` "game-space", which is where an imported module will appear after the button is clicked.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Import() Demo</title>
  <script defer src="script.js"></script>
</head>
<body>
  <button id="button">
    Import Placeholder Module
  </button>
  <div id="game-space"></div>
</body>
</html>
```

<h3 name="anchor-import-placeholder">script.js</h3>
The JavaScript file that is loaded directly by `index.html`. I'll describe how it works shortly.
```javascript
const button = document.getElementById("button")
const gameSpace = document.getElementById("game-space")

button.addEventListener("click", importGame)

function importGame() {
  const url = `./placeholder.js`
  const promise = import(url)
  promise
    .then(result => {
      console.log("result:", result)
      return result.default
    })
    .then(renderGame => renderGame(gameSpace))
    .catch(error => console.error(error))
}
```

### placeholder.js
The external JavaScript file which will be imported by a click on the button. It does nothing special. It simply indicates its presence by adding some text to the `#game-space` div, a pointer to which is passed to it by the `root` argument.

```javascript
export default function (root) {
  root.textContent = "🎉 Placeholder module loaded!";
}

console.log("Placeholder module evaluated")
```

## Testing this proof of concept

Launch `index.html` with your local server. You should see a button:

![Before the Import Placeholder Module button is pressed](images/03-placeholder-button.webp)

Click on the button. You should see that the function from placeholder.js has been called and the `textContent` of the `#game-space` div has been set.

![After the Placeholder Module button is loaded](images/03-placeholder-loaded.webp)

## Modules and JSON imports

You can use the `import` keyword to load either functional code from a `.js` file or data from a `.json` file. I'll explain how to import JSON data later.

A JavaScript file that is loaded using import is called a `module`. A module exports one or more objects. These objects may be functions, plain old JavaScript objects (POJOs) created with `{}` curly brackets, or arrays. A module can export one object as `default`. Any other object it exports must have a name. The example you have just tested uses an anonymous function exported as `default`. You'll see other possibilities later in the tutorial.

<details class="note" open>
<summary>`import` vs `require`</summary>
You may have used the `require` keyword in Node projects. This has a similar, but not identical, function, and browsers do not support `require`. In particular, `require()` is synchronous. Node.js stops executing the current script while it loads the required file and executes _it_. This is fine when the required file is stored locally on the server and can be loaded fast.

In a browser, it can take some time before a file is downloaded, so `import` works asynchronously, and returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). This `Promise` needs to be resolved before it can be used.

</details>

## Understanding function importGame()

This is the code which is executed when you click on the Import Placeholder Module button:

```javascript-#7
  const url = `./placeholder.js`
  const promise = import(url)
  promise
    .then(result => {
      console.log("result:", result)
      return result.default
    })
    .then(renderGame => renderGame(gameSpace))
    .catch(error => console.error(error))
```

Things to notice:

1. The path to the file to import is given by a URL. This can be relative to the location of the page that calls it (as in the case above), or it can be an absolute URL to a file on some other server.

2. The `import()` call returns a promise. When this resolves, the `.then()` function logs it to the console, so that you can see that the resolved value is an object with a property `default`, whose value is the anonymous function from `placeholder.js`, which has now been given a name: `default`.

    ```console
    Object {
      default: function default(root)
      Symbol(Symbol.toStringTag): "Module"
    }
    ```
  
  In addition there is a Symbol with the value "Module". This symbol indicates that the object represents an ES module. All ES modules are automatically executed in ["strict mode"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode). This means that you will see more meaningful errors, and the browser can perform certain optimizations which are not available in JavaScript's default ["sloppy" mode](https://developer.mozilla.org/en-US/docs/Glossary/Sloppy_mode).

3. I've explicitly used a Promise here, rather than the sweeter `async/await` syntax that you might already know. This is simply to underline the fact that the output of `import()` is a Promise which must be resolved before the imported module can be used.

4. Line 14 then receives this `default` function and renames it to `renderGame` and then executes it. Which is how the `textContent` of the `#game-space` div got set.

## Multiple import() calls, only one download

You may already have noticed evidence that the `placeholder.js` file is only downloaded once. If you open the Console tab of your Developer Tools, you should see that the line...

```javascript-#5
console.log("Placeholder module evaluated")
```

... logs only one message in the Console, even if you click on the Import Placeholder Module multiple times.

!["Placeholder module evaluated" is logged to the console only once](images/03-single-download.webp)

Once the browser has downloaded the file and evaluated it, it will not ask for it again, even if you disable the browser cache.

![The Network tab only shows one download, even when caching is disabled](images/03-downloaded-once.webp)

<details class="pivot" open>
<summary>Summary</summary>
The points to note here are:

* `import()` returns a Promise which must be resolved before the imported module can be used
* The imported module is evaluated once and for all
* The imported data is an object with a `default` property that allows you to access the module.

Now that you understand how `import()` can load a module dynamically, let's see how to make the imported module interactive. In the next section, you'll work with a tiny game that you can actually play.

</details>
</section>
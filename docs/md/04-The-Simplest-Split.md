<!-- The Simplest Split -->
<section
  id="the-simplest-split"
  aria-labelledby="the-simplest-split"
  data-item="The Simplest Split"
>
  <h2><a href="#the-simplest-split">The Simplest Split</a></h2>

In the Sandbox folder that you created in the <a href="#installing-the-work-files">last step</a>, take a look at the files at the root of the `01/` folder:

## index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Code Splitting <b>01</b></title>
  <!-- The build step guarantees this is a valid link -->
  <b><script defer type="module" src="./assets/App.js"></script></b>
</head>
<body>
  <b><div id="root"></div></b>
</body>
</html>
```
This is a generic HTML file, which is identical in every numbered folder, except that the title changes to match the folder name:

```html-#5
  <i><title>Code Splitting </i><b>01</b><i></title></i>
```
It simply defines...

```html-#10
<div id="root"></div>
```

... which React will use as the container for all the DOM elements that it generates, and it loads the `App.js` script from the `assets/` folder, which was created by the `esbuild` when you ran `node buildAll.mjs`.

```html-#7
  <script defer type="module" src="./assets/App.js"></script>
```

## App.jsx
```javascript
import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

const LazyComponent = lazy(() => import('./LazyComponent.jsx'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

createRoot(document.getElementById('root')).render(<App />);
```
The `App.jsx` file implements many powerful concepts that I'll explain in the following sections. In short, it uses...

```javascript-#4
<b>import</b>('./LazyComponent.jsx')
```
... to load the `LazyComponent.jsx` file asynchronously at run time, and it uses `lazy()` and `<Suspense>` to handle this import elegantly for React. More about this later.

## LazyComponent.jsx
```javascript
export default function LazyComponent() {
  return <h1>I am lazy.</h1>;
}
```
`LazyComponent.jsx` is an ultra-simple component function, which shows the text `"I am lazy."` as a header.

**Note that the `LazyComponent()` function is explicitly exported as the `default`. This makes it easier for the `React.lazy`, which expects the dynamically imported module to provide a `default` export.** You'll see how to deal with named exports later.

## assets/

The `assets/` folder, which was created by the build process, contains 6 files. 

The random-looking last eight letters in a file's name are a hash of its contents. The name will stay the same, so long as the contents do not change. This means that the browser can safely cache the file, knowing that when a file with an identical name is requested, its contents will be identical. This means it it is safe to use its cached copy instead of triggering a new download.

However, if the contents of any file have changed since I wrote this tutorial, then the hashes that you see will be different.

```
01
├── App.jsx
├── assets
│   ├── App.js
│   ├── App.js.map
│   ├── chunk-U3XB4E5Q.js
│   ├── chunk-U3XB4E5Q.js.map
│   ├── LazyComponent-27PLPFAM.js
│   └── LazyComponent-27PLPFAM.js.map
├── index.html
└── LazyComponent.jsx
```

### The `.map` files

The files with the extension `.map` are not required for your code to run. They are used by the browser to make it easier for you to use the Debugger. Thanks to the `.map` files, you can step through your original JSX code, and the browser will follow your steps through the compiled JavaScript code behind the scenes for you.

![Inspecting the original JSX code in the browser Debugger](images/01-mapped.webp)

Without the `.map` files, the JSX code will not be available, and all the browser can show you is the compiled JavaScript code, which you didn't write and which is much more complex to follow.

![Without the .map files, the browser Debugger is harder to use](images/01-mapless.webp)

### App.js

`App.js` is a pure JavaScript file, and it is huge. It contains all the code that React wants to use at runtime, and which `esbuild` chose not to place in the `chunk-XXXXXXXX.js`, in addition to the compiled version of the original `App.jsx` file.

```javascript
import {
  __commonJS,
  __toESM,
  require_jsx_runtime,
  require_react
} from "./chunk-U3XB4E5Q.js";
```
```javascript-w
// Over 20000 lines skipped, then the code compiled from App.jsx... //
```
```javascript-#20448
// 01/App.jsx
var require_App = __commonJS({
  "01/App.jsx"() {
    var import_react = __toESM(require_react());
    var import_client = __toESM(require_client());
    var import_jsx_runtime = __toESM(require_jsx_runtime());
    var LazyComponent = (0, import_react.lazy)(() => import("./LazyComponent-27PLPFAM.js"));
    function App() {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Loading..." }), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyComponent, {}) });
    }
    (0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}));
  }
});
export default require_App();
```

### chunk-XXXXXXXX.js

The file whose name begins `chunk-` and which has the extension `.js` contains code that `esbuild` chose share between multiple modules.


It only exists because the `App.jsx` code contains `import()`, and because the `App.jsx` file and the `LazyComponent.jsx` file both need access to the same React functions.

It, too, is a fairly big file, and it would be even bigger if your split modules had more code in common. 

It will be downloaded when the browser is executing `App.js` and encounters a static import from `chunk-XXXXXXXX.js`, as a dependency.


### LazyComponent-XXXXXXXX.js

LazyComponent has been given its own file, because it is loaded by the `import()` command. It is a fairly small file, because all the React features it requires have already been included in `App.js` or `chunk-XXXXXXXX.js`. React runtime helpers have been placed in the shared chunk, while App.js contains application glue code.

Its contents are a pure JavaScript version of `LazyComponent.jsx`.

```javascript
import {
  __esm,
  __toESM,
  require_jsx_runtime
} from "./chunk-U3XB4E5Q.js";

// 01/LazyComponent.jsx
function LazyComponent() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "I am lazy." });
}
var import_jsx_runtime;
var init_LazyComponent = __esm({
  "01/LazyComponent.jsx"() {
    import_jsx_runtime = __toESM(require_jsx_runtime());
  }
});
init_LazyComponent();
export {
  LazyComponent as default
};
//# sourceMappingURL=LazyComponent-27PLPFAM.js.map
```

<details class="note" open>
<summary>The weight of React</summary>
Take a moment to compare the size of the raw App.jsx file and the size of the JavaScript bundle that now includes your code and its dependencies. `App.js` is around 3000 times larger than `App.jsx`.

But I said that the whole purpose of this tutorial was to show you how to reduce the size of the initial download, didn't I?

No worries. Most of this size increase does not come from your code, but from bundling React and ReactDOM into the same file.

![Comparing the compiled file with the raw JSX](images/compiled-size.webp)

To be fair, at this point, `esbuild` is transpiling the JSX for development purposes, so it is generating unminified JavaScript and helpers that are useful during dev-time debugging.

There are ways to reduce the amount of production code that your server will deploy for the Internet, using minification and tree-shaking, but this tutorial is not the place to discuss that.

The arguments for using React are:

1. **Productivity now**
    
   You'll complete your projects faster with the tools that React provides.
2. **Real-world context**

   The production-ready projects that you will be working on are far more complex than what is covered by this tutorial
3. **Future-proofing**

   Unused power today is likely to be used later. The actual project that I am creating will eventually contain activities that have not even been thought of yet. React gives me room to expand.

However, if you have just a small project that you know is never going to grow big, it might be worthwhile writing it in plain JavaScript.

</details>

</details>
<details class="pivot" open>
<summary>Summary</summary>

In summary, `esbuild` has split the code of this mini-app into three files:

1. The entry-point bundle for App.jsx, with all the code for running the pure JavaScript version of App.jsx
2. Code shared between the compiled versions of App.jsx and LazyComponent.jsx
3. The code specific to each module that is loaded with the `import()` command. (In this case, there is only one such module).

For each of these three files, `esbuild` has also created a file with a `.map` extension, to help you when you are stepping through or debugging your JSX code.

## import(), lazy() and Suspense

In the next sections, you can explore how `import()`, `lazy()` and `Suspense` work, separately and together.

The `import()` command is native JavaScript. `Suspense` and `lazy()` are React-specific features, designed to handle the asynchronous nature of `import()` cleanly in a React environment.

</details>
</section>
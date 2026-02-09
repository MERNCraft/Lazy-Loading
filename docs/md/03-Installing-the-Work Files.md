<!-- Installing the Work Files -->
<section
  id="installing-the-work-files"
  aria-labelledby="installing-the-work-files"
  data-item="Installing the Work Files"
>
  <h2><a href="#installing-the-work-files">Installing the Work Files</a></h2>
      
Eventually, I'll show you how to build a demo app using [npm](https://en.wikipedia.org/wiki/Npm) and  [Vite](https://vite.dev/) to provide a sturdy development framework. But for now, you can use something more lightweight.

Browsers cannot understand the JSX syntax that React uses, so your React code has to be compiled to plain JavaScript before it is deployed to a server. Vite provides all the tools you need to compile your code and create a production-ready app. For this tutorial, though, you can use [esbuild](https://esbuild.github.io/) to take care of compilation. Vite is built on top of esbuild, so the JavaScript output will be the same. You'll just have to provide your own local server to host the files you create.

## Preparing a workspace

Clone or download the files in this repository: [Lazy-Loading Sandbox](https://github.com/MERNCraft/Lazy-Loading-Sandbox).

Open your IDE and a Terminal window inside the Sandbox directory. You should see a folder hierarchy like this:

```
.
├── 01
│   ├── App.jsx
│   ├── index.html
│   └── LazyComponent.jsx
├── 02
│   ├── App.jsx
│   ├── index.html
│   └── LazyComponent.jsx
├── .../
├── build.mjs
├── buildAll.mjs
├── cleanUp.js
├── package-lock.json
├── package.json
└── README.md
```

Each numbered folder contains a mini-app for you to practise with, but these have to be compiled to JavaScript before you can open them in your browser.

## Installing node modules

In the Terminal run this command:

```bash-w
npm i esbuild react react-dom
```
You should see a new folder appear in your Sandbox directory:

```
┆
├── node_modules
│   ├── @esbuild
│   ├── esbuild
│   ├── react
│   ├── react-dom
│   └── scheduler
┆
```

I assume that you are used to seeing `react`, `react-dom` and `scheduler` in your dependencies. The `esbuild` module is the one which will compile your React code to JavaScript and perform code splitting for you.

## Building all the mini-apps at once

Each mini-app is contained in a numbered folder. To minimize the download size, none of the mini-apps have been built for deployment. To do this, run the following command in your Terminal:

`node buildAll.mjs`

This will tell the buildAll.mjs script to create an `assets/` subfolder inside each of the numbered folders. This will look something like this, but the exact names of the files may be different:

```
.
├── 01
│   ├── App.jsx
│   ├── assets
│   │   ├── App.js
│   │   ├── App.js.map
│   │   ├── chunk-UASCOLGB.js
│   │   ├── chunk-UASCOLGB.js.map
│   │   ├── LazyComponent-C4ZJBLUW.js
│   │   └── LazyComponent-C4ZJBLUW.js.map
│   ├── index.html
│   └── LazyComponent.jsx
├── .../
├── launch.mjs
├── buildAll.mjs
├── cleanUp.js
├── node_modules/
├── package-lock.json
├── package.json
└── README.md
```

## Opening a mini-app in your browser

Use your local server to open the `index.html` file in any of the numbered folders. If you are working with VS Code, this is how you do this:

![Opening an HTML file with Live Server in VS Code](images/live-server.webp)

The file should open in your browser:

![You can inspect the React code in the browser's Debugger](images/01-index.webp)

<details class="alert" open>
<summary>Double-click doesn't work</summary>
**You must use a local server to open the `index.html` files.**

If you simply double-click on a mini-app `index.html` file on your desktop, it _will_ open in your browser, but, for your safety, the browser will refuse to load any files via the `import()` command, so none of the code splitting features will work.

![import() is not supported for URLs with the `file:///` protocol](images/01-file.webp)

</details>

</section>
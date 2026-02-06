<!-- Just Lazy -->
<section
  id="just-lazy"
  aria-labelledby="just-lazy"
  data-item="Just Lazy"
>
  <h2><a href="#just-lazy">Just Lazy</a></h2>
  
Eventually, I'll show you how to build a demo app using `npm` and  `Vite` to provide a sturdy development framework, but you can start with a simple HTML file that you can open with a local server, such as [Live Server](https://www.npmjs.com/package/live-server).

Here's a generic HTML page that will launch any file called `main.js` that it finds in the same folder:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lazy Loading</title>

  <!-- Load React and ReactDOM from CDN -->
  <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>

  <!-- Load Babel standalone to convert JSX to JS -->
  <script src="https://unpkg.com/@babel/standalone@7.21.4/babel.min.js"></script>

  <!-- Load the custom script that creates the React components -->
  <script defer type="text/babel" src="main.js"></script>

</head>
<body>
  <div id="root"></div>
</body>
</html>
```

And here's a basic `main.js` file which is designed to load a separate file

```javascript
// Lazy-load the component
const LazyComponent = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: function() {
          return <div>This component was lazy-loaded!</div>;
        }
      });
    }, 2000); // Simulate a 2-second loading delay
  });
});

// Main app component
const App = () => {
  return (
    <div>
      <h1>React.lazy() Demo</h1>
      <React.Suspense fallback={<div>2 seconds please...</div>}>
        <LazyComponent />
      </React.Suspense>
    </div>
  );
};

// Render the app to the DOM
ReactDOM.render(<App />, document.getElementById('root'));

```


          '
<details class="solution">
<summary>Standalone version (if you don't have a local server)</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React.lazy() Demo</title>

  <!-- Load React and ReactDOM from CDN -->
  <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>

  <!-- Load Babel standalone to handle JSX -->
  <script src="https://unpkg.com/@babel/standalone@7.21.4/babel.min.js"></script>

</head>
<body>
  <div id="root"></div>

  <!-- Script to run JSX, make sure it has type="text/babel" -->
  <script type="text/babel">
    // Lazy-load the component
    const LazyComponent = React.lazy(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            default: function() {
              return <div>This component was lazy-loaded!</div>;
            }
          });
        }, 2000); // Simulate a 2-second loading delay
      });
    });

    // Main app component
    const App = () => {
      return (
        <div>
          <h1>React.lazy() Demo</h1>
          <React.Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
          </React.Suspense>
        </div>
      );
    };

    // Render the app to the DOM
    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>
```

</details>

</section>
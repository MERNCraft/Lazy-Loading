const a = import('./Component.js').then(({ default: Component }) => {
  const App = () => (
    <>
      <h1>App goes here</h1>
      <Component />
    </>
  );

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
});

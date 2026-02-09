---
title: Code Splitting with React and Vite
subtitle: using import(), React.lazy() and React.Suspense
month: February 2026
organization: MERNCraft
repo: Lazy-Loading
---
<section
  id="intro"
  aria-labelledby="intro"
  data-item="Introduction"
>
  <h2><a href="#intro">A Use Case for Code Splitting</a></h2>

Alice teaches French as a foreign language. She has a smartboard in her classroom, and there are enough tablets for all her students. She wants to create a number of fun activities, to encourage her students to practice their new language, and she has a vivid imagination. Ideally, she wants web app with a single simple URL, to which she (or rather we) can add new activities from time to time, as her plans crystallize.

To begin with, the app will have a single activity, and it won't take long to load. But over time, the amount of code and assets required for all the activities that Alice plans will become too much to load all at once. Why make the end-user wait while the code and assets load for activities that are not yet needed? Why not load files just in time?

What we need to create is basicly a _generic engine_ whose possibilities can evolve organically, without us having to rewrite the core code each time a new activity is added.

**Code splitting** seems to be the solution. So that's what this tutorial is about.

## Sneak preview

In this tutorial, you won't be building the powerhouse app that Alice wants. Your own project has very different requirements.

Instead, you'll be building an app with three ultra-simple language games that are loaded on demand. This will be enough for you to master the necessary techniques. It will be up to you to replace these simple games with features that you actually need in your own project.

The app that you will create here will look something like this:

<iframe
  id="iframe-split"
  title="iframe-split"
  width="300"
  height="150"
  src="https://merncraft.github.io/Lazy-Loading-Project/">
</iframe>

</section>

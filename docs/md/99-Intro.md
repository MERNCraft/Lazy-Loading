---
title: Lazy-Loading
subtitle: (set subtitle in 99-Intro.md, if required)
month: February 2026
organization: MERNCraft
repo: Lazy-Loading
---
<section
  id="intro"
  aria-labelledby="intro"
  data-item="Introduction"
>
  <h2><a href="#intro">Introduction</a></h2>

Alice teaches French as a foreign language. She has a smartboard in her classroom, and there are enough tablets for all her students. She wants to create a number of interesting activities, where her students for her students, and she has a vivid imagination. Ideally, she wants web app with a single simple URL, to which she (or rather we) can add new activities each time she finalizes her plans for a new one.

To begin with, the app will have a single activity, and it won't take long to load. But over time, the amount of code and assets required for all the activities that she plans will become too much to load all at once. Why load the code and assets for an activity that is not needed now? Why not wait and load files only when they are needed?

What we need to create is basicly a _generic engine_ whose possibilities can evolve organically, without us having to rewrite the core code each time a new activity is added.

**Lazy loading** seems to be the solution. So that's what this tutorial is about.

I plan to show, step-by-step, how lazy loading works in a React frontend, and how to build an app where you can simply create a new directory on your server that contains all the code and assets that you need for a new activity, and the app will be able to load the activity on the fly, and maintain its state if you navigate to a different activity and back.

</section>

<!-- What is Code Splitting -->
<section
  id="what-is-code-splitting"
  aria-labelledby="what-is-code-splitting"
  data-item="What is Code Splitting?"
>
  <h2><a href="#what-is-code-splitting">What is Code Splitting?</a></h2>

In a simple React project, the final `build` process creates three files:

* a minified JavaScript file
* a compact CSS file
* a skeleton `index.html` file which loads the JavaScript and CSS files

When you open the production version of your app, the `index.html` file is downloaded first, and the `<script>` and `<link>` tags it contains in its `<head>` trigger the download of the JavaScript and CSS files, and the JavaScript file in turn may trigger the download of various assets.

In other words, there is a one-time flood of data from the server, and then everything the app needs is available locally. But this flood can take a significant amount of time.

With code splitting, your build tool creates separate JavaScript and CSS files for each feature, and only loads those file when they are explicitly requested. This means that the initial download of data is minimized, but there may be a delay before a newly-requested feature is operational, while its files download.

## How does your build tool know where to split your code?

The answer is: you tell your build tool where to split your code by the way you write it. You indicate where the code should be split with requests for `import()`. 

Since early 2019, [all major browsers](https://caniuse.com/?search=import%28%29) support the [dynamic `import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) feature. Dynamic import allows you to load a module asynchronously at run-time.

During the build process, your build tool will notice every time you use the `import()` syntax, and will bundle each block of imported code into its own JavaScript and CSS files. The main JS file that is requested by the `index.html` file will contain the relative URLs of each of these feature bundles, so it can `import()` them whenever they are needed.

## The challenges

Imagine this scenario: you click on a link to an activity which downloads a feature bundle. Let's call this Activity A. You start working with Activity A, and then you switch to a different activity. When you come back to Activity A later, you find that all the changes you have made have been forgotten, and you are back to where the activity started.

When you navigate away from an activity, your browser dismounts the components associated with it, and all the state associated with those components is lost. One solution is to keep the state for the activity in a Context which does not get dismounted. If you do that, you can restore the component state from the Context when the activity is remounted later.

If the Context only contains state for Activity A, then it would make sense to import it at the same time as the components for Activity A, but then you have to insert the Context's Provider into your app's component hierarchy, as a parent or ancestor of the activity components.

If you later add a new activity (Activity B) that needs to store some of the same state as Activity A, you might need to place the shared Provider higher up the component hierarchy, so that it can make the Context available to both activities.

## Building a code-splitting app, step by step

I plan to show, step-by-step, how code splitting works in a React frontend. I'll show you how to build an app where you can simply create a new directory in your development environment that contains all the code and assets that you need for a new activity, so that the new version of the deployed app will be able to load the activity on the fly. I'll show you how to ensure that each activity maintains its state if you navigate to a different activity and back.

</section>
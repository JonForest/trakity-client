#TODO
* Canceling a new task should clear values and return it to 'minimal' state
* Deleting a new task should clear values and return it to a 'minimal' state
*. Wire up the Add Task button. That should move focus into the current minimal task and expand
4. Keyboard controls wired up
  - n - focus in the minimal edit
  - s - save an edited task
  - c - cancel an edit
  
x. Consider refactoring out 'minimalEdit'
x. Controls for each task are not keyboard accessible. 

# DONE
* Want to be able to expand/contract the minimal edit task in a way that doesn't just need the tab key during edit (16/06/19)
* Saving a minimal edit task should create a new minimal edit task. (16/06/19)
* Adding a minimal edit task and hitting 'enter' to save, should move the focus into the next minimal edit task (16/06/19)
* Edit of an existing task should open in full edit mode (23/06/19)



//    todo: try adding the action back onto the <Icon and see if it now throws?
//    todo: remove the action helper and replace with the on helper
//    todo: look at svg-jar to see if it can replace my icon component



# trakity-client

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd trakity-client`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

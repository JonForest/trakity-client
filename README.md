#TODO
* New task to default to the nearest half-hour
  * Think about this - should it only show a date picker when not on the calendar, and then switch to a date time picker when added to the map?
* Investigate how to hook up an external calendar - within Calendar control
* Investigate how to integrate with Google Calendar 
   - https://devguide.calconnect.org/CalDAV/building-a-caldav-client/
   - https://developers.google.com/calendar/caldav/v2/guide
   - https://console.developers.google.com/apis/api/caldav.googleapis.com/overview?project=trakity&authuser=1&supportedpurview=project
   - https://stackoverflow.com/questions/22911963/using-the-caldav-api-for-google-calender
* Investigate how to add/update items back into remote calendar
* Add in Ember Embroider
* Deleting a new task should clear values and return it to a 'minimal' state
*. Keyboard controls wired up
  - n - focus in the minimal edit
  - s - save an edited task
  - c - cancel an edit
* Think about using local storage to handle saving midway through an edit so data is not lost if navigated or refreshed
* Changing the date on a task should have it animate to it's new home
* Do we want Tags in this version?  
* Remove `class="list-reset"` from <ul> when tailwind updates 
x. Consider refactoring out 'minimalEdit'
x. Controls for each task are not keyboard accessible. 

# DONE
* Want to be able to expand/contract the minimal edit task in a way that doesn't just need the tab key during edit (16/06/19)
* Saving a minimal edit task should create a new minimal edit task. (16/06/19)
* Adding a minimal edit task and hitting 'enter' to save, should move the focus into the next minimal edit task (16/06/19)
* Edit of an existing task should open in full edit mode (23/06/19)
* Canceling a new task should clear values and return it to 'minimal' state (23/06/19)
* Use can select a date when editing a task
* Target date should be limited to today and after
* Editing a task should create a temp version, or changeset, so that updates don't immediately impact (e.g. changing date moves the task to another day before save) (25/06/19)
* Changing date should move the task into another list (25/06/19)
* Import calendar control (https://fullcalendar.io/docs/getting-started)
* Investigate how to add calendar items from the UI
* Move calendar items by dragging
* Change the snap duration for a task to 10 mins


BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:132456-34365
SUMMARY:Weekly meeting
DTSTART:20120101T120000
DURATION:PT1H
RRULE:FREQ=WEEKLY
END:VEVENT
END:VCALENDAR


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

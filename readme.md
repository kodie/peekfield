# vanishing-fields

[![npm package version](https://img.shields.io/npm/v/vanishing-fields.svg?style=flat-square)](https://www.npmjs.com/package/vanishing-fields)
[![Travis build status](https://img.shields.io/travis/com/kodie/vanishing-fields.svg?style=flat-square)](https://travis-ci.com/kodie/vanishing-fields)
[![npm package downloads](https://img.shields.io/npm/dt/vanishing-fields.svg?style=flat-square)](https://www.npmjs.com/package/vanishing-fields)
[![code style](https://img.shields.io/badge/code_style-standard-yellow.svg?style=flat-square)](https://github.com/standard/standard)
[![license](https://img.shields.io/github/license/kodie/vanishing-fields.svg?style=flat-square)](license.md)

A dependency-free, easy to use, JavaScript plugin for hiding and showing fields.


## Demo

Visit https://kodie.github.io/vanishing-fields


## Installation


### Manual Download

Download [dist/vanishing-fields.min.js](dist/vanishing-fields.min.js) and place the following HTML in your page's head element:

```html
<script type="text/javascript" src="dist/vanishing-fields.min.js"></script>
```


### CDN (Courtesy of [jsDelivr](https://jsdelivr.com))

Place the following HTML in your page's head element (check to make sure the version in the URL is the version you want):

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/kodie/vanishing-fields@0.0.3/dist/vanishing-fields.min.js"></script>
```


### [NPM](https://npmjs.com)

```
npm install vanishing-fields --save
```

```js
// ES6
import vanishingFields from 'vanishing-fields'

// CommonJS
const vanishingFields = require('vanishing-fields')
```


### [GPM](https://github.com/itsahappymedium/gpm)

```
gpm install kodie/vanishing-fields --save
```


### [Bower](https://bower.io)

```
bower install kodie/vanishing-fields --save
```


## Usage


### Basic HTML Structure

```html
<div data-vanishing-field-for="name" data-vanishing-field-placeholder="Please enter your name."></div>
<div data-vanishing-field="name">
  <label for="first_name">First Name</label>
  <input type="text" name="first_name" />
  <label for="last_name">Last Name</label>
  <input type="text" name="last_name" />
</div>
```


### The `vanishingFields([options], [fields])` Function

Initiates vanishing-fields.


#### Parameters

  * `options` (`Object`) (*Optional*) - An object of options you can set to change how the fields function.

  * `fields` (`String`, `NodeList`, or `HTMLElement`) (*Optional*) - The elements to turn into vanishing-fields. If set to a string, that string will be passed to `document.querySelectorAll()`. (Defaults to `[data-vanishing-field]:not(data-vanishing-field-ignore)`)


#### Examples

```js
window.addEventListener('load', function () {
  // Run with default options and element selector
  vanishingFields()

  // Run with default options but on a specific element
  vanishingFields({}, document.getElementsByClassName('my-field'))

  // Run with custom options set (options displayed here are what the defaults are)
  vanishingFields({
    applyStyles: true,
    closeOnFocusOut: true,
    display: null,
    onClose: null,
    onOpen: null,
    options: {},
    placeholder: null,
    startingTabIndex: 0
  })

  // Run with custom options set only to a specific field
  vanishingFields({
    options: {
      name: {
        placeholder: 'Please enter your name.'
      }
    }
  })
})
```

Your best bet would be to check out the source for [index.html](index.html) to get an idea of all the ways vanishing-fields can be used.


#### Options

These are the options you can set with the `options` parameter:

  * `applyStyles` (Default: `true`) - Set to `false` to not have the `display:none` and `visibility:hidden` styles added/removed on the field and label elements when they are opened/closed.

  * `closeOnFocusOut` (Default: `true`) - Set to `false` to not have the fields close when they lose focus.

  * `display` (Default: `null`) - The content to display on the label element when a field has had something entered into one of it's child input elements. Functions exactly the same as the label element's `data-vanishing-field-display` attribute with the exception that a function can be used here for more control over what is displayed. If a function is used here, it will be passed field object as the first parameter. This option is used as a fallback when the label element does not have a `data-vanishing-field-display` attribute.

  * `onClose` (Default: `null`) - A function to run when a field is closed. Receives the event as the first parameter and the field object as the second.

  * `onOpen` (Default: `null`) - A function to run when a field is opened. Receives the event as the first parameter and the field object as the second.

  * `opened` (Default: `false`) - Set to `true` to have the field be opened when first initiated.

  * `options` (Default: `{}`) - An object with keys set to field element identifiers (the `data-vanishing-field` attribute) and their values set to an object containing keys and values that you would normally pass to the `options` parameter. This allows for setting options to specific fields.

  * `placeholder` (Default: `null`) - The content to display on the label element when a field has NOT had something entered into one of it's child input elements. Functions exactly the same as the label element's `data-vanishing-field-placeholder` attribute with the exception that a function can be used here for more control over what is displayed. If a function is used here, it will be passed the field object as the first parameter. This option is used as a fallback when the label element does not have a `data-vanishing-field-placeholder` attribute.

  * `startingTabIndex` (Default: `0`) - A `tabindex` attribute needs to be set on field and label elements in order for the `closeOnFocusOut` functionality to work correctly. If a field or label element does not have it's `tabindex` attribute set, one will be set for each vanishing-field initiated starting at the index this option is set to unless this option is set to `false`.


#### Methods

These methods are attached to the field element when vanishing fields is initiated and can be used to make the field do different things:

* `field.open(triggerEvents)` - Opens the field. Pass `false` as the first parameter to not have the `open` event fired.

* `field.close(triggerEvents)` - Closes the field. Pass `false` as the first parameter to not have the `close` event fired.

* `field.toggle(open, triggerEvents)` - Opens the field if it is currently closed and closes it if it's currently open. Pass `true` as the first parameter to open it regardless of it's current state and `false` to close it. Pass `false` as the second parameter to not have the `open` or `close` event fired.

* `field.getInputValues()` - Returns an object containing the values of any inputs inside of the field element.


#### Properties

These properties are attached to the field element when vanishing fields is initiated and changed when different things happen and can be used to see what state a field is in:

* `field.changed` - Is `true` if `field.values` doesn't match `field.originalValues`, and `false` if they match.

* `field.empty` - Is `true` when the field is considered empty (all child inputs are empty) and `false` otherwise.

* `field.opened` - Is `true` when the field is currently open and `false` if it is not.

* `field.originalValues` - An object containing the values of any input elements inside of the field element as they were when vanishing fields was first initiated.

* `field.values` - An object containing the values of any input elements inside of the field element the last time they were fetched (does not change when `field.getInputValues()` is ran manually).

* `field.inputs` - An array of all child input elements.


#### Events

These events are fired on the field element when different things happen:

* `open` - Fires when the field is opened.

* `close` - Fires when the field is closed.


### Data Attributes

Attributes can be set on fields to set different options.


#### The "field" element

This is the element that contains the inputs and any other content you would like to be able to open and close. It is visible when a field is considered open.

* `data-vanishing-field` (**Required**) - This is the identifier for the field and needs to be set.

* `data-vanishing-field-apply-styles` - Set to `false` to not have the `display:none` and `visibility:hidden` styles added/removed on the field and label elements when they are opened/closed. (Overrides the `applyStyles` option)

* `data-vanishing-field-close-on-focus-out` - Set this to `false` to not close the field when it loses focus. (Overrides the `closeOnFocusOut` option)

* `data-vanishing-field-ignore` - Add this to a field element to have it not be initiated by the default `fields` parameter passed to the `vanishingFields` function. This is useful if you would like to initiate this field separate from the rest.


#### The "label" element

This is the element that contains the content that is visible when a field is considered closed. By default, this element should be left empty as it will have it's content filled out for you depending on options and input values set. This element however is not required.

* `data-vanishing-field-for` (**Required**) - If using the label element, this attribute is required and should be set to the field's identifier.

* `data-vanishing-field-display` - The content to display when the field element is considered to be NOT empty. An input's value can be displayed by entering it's name between two curly braces (ie. `Your name is: {field_name}`). You can also define default text to display if that specific field is empty after a pipe character (ie. `Your name is: {field_name|Bob}`). Furthermore, if the input value is an array (like with checkboxes or multi-select fields), you can define a string or character to separate them with (ie. `Your favorite colors are: {colors|None| and }`), otherwise a comma will be used. (Overrides the `display` option)

* `data-vanishing-field-placeholder` - The content to display when the field element is considered to be empty. (Overrides the `placeholder` option)


#### Trigger elements

These attributes can be set on any elements (inside or outside of a field/label element) to have them perform different actions.

* `data-vanishing-field-open` - Set this to a field's identifier to have that field be opened when this element is clicked.

* `data-vanishing-field-close` - Set this to a field's identifier to have that field be closed when this element is clicked.

* `data-vanishing-field-toggle` - Set this to a field's identifier to have that field's open status be toggled when this element is clicked.


#### Input elements

* `data-vanishing-field-ignore` - This attribute can be set on any input elements inside of a field element to be ignored completely (such as hidden fields).


### Classes

vanishing-fields does not apply any styling and leaves that up to you (except for the `display:none` and `visibility:hidden` styles if the `applyStyles` option isn't set to `false`), however these classes are applied to both the field and input elements when different things happen.

* `open` - Added when a field is considered open, otherwise removed. You can also add this class to the field element to have the field be opened when first initiated.

* `empty` - Added when a field is considered empty, otherwise removed.

* `changed` - Added when a field's child input values have changed since vanishing-fields has been initiated, otherwise removed.


## Related

 - [minitaur](https://github.com/kodie/minitaur) - The ultimate, dependency-free, easy to use, JavaScript plugin for creating and managing modals.

 - [filebokz](https://github.com/kodie/filebokz) - A tiny, dependency-free, highly customizable and configurable, easy to use file input with some pretty sweet features.

 - [hashjump](https://github.com/kodie/hashjump) - A tiny, dependency-free JavaScript module for handling anchor links and scrolling elements into view.

 - [colorfield](https://github.com/kodie/colorfield) - A tiny, dependency-free, color input field helper that utilizes the native color picker.


## License

MIT. See the [license file](license.md) for more info.

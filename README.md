# styledForms

Based off [original code by Ryan Fait](http://ryanfait.com/resources/custom-checkboxes-and-radio-buttons/),
this is a basic jQuery wrapper around that functionality, because I much prefer to write

```javascript
$('.options_block input').styledForms();
```
than put classnames on each styled form element and define the replacement images globally. Plugin setup with all options (and defaults):
```javascript
$('.options_block input').styledForms({
	checkboxHeight: 25,
	radioHeight: 25,
	selectWidth: 190,
	radioClass: 'radio',
	checkboxClass: 'checkbox',
	selectClass: 'select'
});
```

At the moment it doesn't actually leverage any jQuery functionality apart from the most basic plugin wrapping, this is subject to change in future to bring down codesize and strengthen compatability. I encourage you to fork this if you can contribute.
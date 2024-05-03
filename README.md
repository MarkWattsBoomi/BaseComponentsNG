This module provides a cascading combo box implementation for both default and legacy players. 

# Class Name

CascadingCombos

The component file to import is in the root of the project

!!! Always call "npm install --s fcmlib@latest" to make sure the reference is the latest !!!

## Functionality

Takes a LIST of options with each combo's values in a property and turns it into an array of combo's (one per list item property).

Choosing a value from one combo changes the options in the subsequent combo.


## Datasource

Set the datasource to a list of objects with one property per combo like this: -

Animal, Mamal, Mouse
Animal, Mamal, Horse
Animal, Reptile, Lizard
Animal, Reptile, Crocodile
Vegetable, Fruit, Banana
Vegetable, Fruit, Apple


## State

Create a State object of the type of the model data items.



## Settings

### Columns

Sets the display columns which will become combo boxes.

### Label

The Label of the component is used as the title bar

## Component Attributes

### Width & Height

If specified then these are applied to the outer component.

Can be any valid css dimension e.g. 10px, 100%, 75vw, 3rem, 10em etc.

### Direction

The layout direction.
"column" (default) or "row"

### classes

Like all components, adding a "classes" attribute will cause that string to be added to the base component's class value

### sortColumn
optional.

The developerName of a column to use to sort the items in the combo boxes - display order column name

## Styling

All elements of the tree can be styled by adding the specific style names to your player.


## Page Conditions

The component respects the show / hide rules applied by the containing page.



# use-sheet [![demo](https://img.shields.io/badge/demo-blue.svg)](https://codesandbox.io/s/thirsty-euclid-hnum6)

React Hook to use Google Drive Spreadsheets as a simple database. Perfect for collaboration with multiple people editing the same spreadsheet. A wrapper for [`drive-db`](https://github.com/franciscop/drive-db):

| id | firstname | lastname | age | city          |
|----|-----------|----------|-----|---------------|
| 1  | John      | Smith    | 34  | San Francisco |
| 2  | Merry     | Johnson  | 19  | Tokyo         |
| 3  | Peter     | Williams | 45  | London        |

```js
// App.js
import useSpreadsheet from 'use-spreadsheet';
const sheet = '1fvz34wY6phWDJsuIneqvOoZRPfo6CfJyPg1BYgHt59k'; // Or from .env

export default () => {
  const users = useSpreadsheet(sheet);
  if (!users) return 'Loading...';
  if (!users.length) return 'No user yet...';
  return <ul>{users.map(user => <li>{user.firstname}</li>)}</ul>;
};
```

Becomes an array of objects with the corresponding keys:

```json
[
  {
    "id": "1",
    "firstname": "John",
    "lastname": "Smith",
    "age": "34",
    "city": "San Francisco"
  },
  {
    "id": "2",
    "firstname": "Merry",
    "lastname": "Johnson",
    "age": "19",
    "city": "Tokyo"
  },
  ...
]
```



## Getting Started

Create the Google Drive spreadsheet and **publish it**:

- Create [a Google Spreadsheet](https://www.google.com/sheets/about/)
- File > Publish to the Web > Publish
- Copy the id between `/spreadsheets/` and `/edit` in the url:

    > [https://docs.google.com/spreadsheets/d/<strong>1fvz34wY6phWDJsuIneqvOoZRPfo6CfJyPg1BYgHt59k</strong>/edit](https://docs.google.com/spreadsheets/d/1fvz34wY6phWDJsuIneqvOoZRPfo6CfJyPg1BYgHt59k/edit)

Install `use-spreadsheet` in your project (with e.g. Create-React-App):

```bash
npm install use-spreadsheet
```

Load the spreadsheet into your project:

```js
// App.js
import useSpreadsheet from 'use-spreadsheet';
const sheet = '1fvz34wY6phWDJsuIneqvOoZRPfo6CfJyPg1BYgHt59k'; // Or from .env

// Component that loads the spreadsheet dynamically
export default () => {
  const users = useSpreadsheet(sheet);
  if (!users) return 'Loading...';
  if (!users.length) return 'No user yet...';
  return <ul>{users.map(user => <li>{user.firstname}</li>)}</ul>;
};
```

The table has to have a structure similar to this, where the first row are the alphanumeric field names:

| id | firstname | lastname | age | city          |
|----|-----------|----------|-----|---------------|
| 1  | John      | Smith    | 34  | San Francisco |
| 2  | Merry     | Johnson  | 19  | Tokyo         |
| 3  | Peter     | Williams | 45  | London        |

See [this document](https://docs.google.com/spreadsheets/d/1fvz34wY6phWDJsuIneqvOoZRPfo6CfJyPg1BYgHt59k/edit#gid=0) as an example. **Please do not request access to edit it**.



## API

You import a single default export depending on your configuration:

```js
// With async/await:
const data = useSpreadsheet(SHEET_ID);
const data = useSpreadsheet(options);
// data will start `null`, then an `array` with the spreadsheet data
```

**SHEET_ID**: alias of `options = { sheet: SHEET_ID }`:

```js
const data = useSpreadsheet("1fvz34wY6phWDJsuIneqvOoZRPfo6CfJyPg1BYgHt59k");

const data = useSpreadsheet({
  sheet: "1fvz34wY6phWDJsuIneqvOoZRPfo6CfJyPg1BYgHt59k",
  tab: "default",
  cache: 3600,
  onload: data => data
});
```

- `sheet` (required): when editing a google spreadsheet, it's the part between `/spreadsheets/` and `/edit` in the url. Please make sure to also publish the spreadsheet before copying it (File > Publish to the Web > Publish)
- `tab` (`'default'`): the tab to use in the spreadsheet, which defaults to the first tab. It's difficult to find the technical name from the interface, but [this StackOverflow thread](https://stackoverflow.com/q/24531351/938236) might help you.
- `cache` (`3600`): set the maximum time (in **seconds**) that the current cache is valid. After this, the data will be loaded again when the function is called. This is really useful when combined with development env constant. Set to 0 to refresh in each request.
- `onload`: a function that sets a transformation between the data of the spreadsheet and the local db. It accepts the whole array and must return the whole modified array and it's useful to avoid doing the operations on each request. You can return a promise here and it will be waited. It will be run ON EACH CALL, even if the underlying data was cached.

It returns a plain Javascript array. With ES6+, operations on arrays are great, but feel free to use Lodash or similar if you want some more advanced queries.

# use-sheet

A React Hook that loads data from a Google Spreadsheet. A wrapper for [`drive-db`](https://github.com/franciscop/drive-db):

```js
export default () => {
  const users = useSheet('1fvz34wY6phWDJsuIneqvOoZRPfo6CfJyPg1BYgHt59k');
  if (!users) return 'Loading...';
  if (!users.length) return 'No user yet...';
  return <ul>{users.map(user => <li>{user.firstname}</li>)}</ul>;
};
```

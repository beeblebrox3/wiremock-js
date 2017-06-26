# WiremockJS

This project provide another way to create stubs for [Wiremock](http://wiremock.org/). It ships with a `docker-compose.yaml` to run Wiremock and parse the JavaScript files with the routes definition.

## Usage
### Writing stubs
Wiremock supports stubs in JSON file format. You can use the [official documentation](http://wiremock.org/docs/stubbing/) to get the syntax and features available. By default, you can put your json files on the `resources/mappings` directory.

This project also provide a slightly different approach for this. You can use JavaScript. On the `routes.js` file you can export the routes definitions like this:

```javascript
// routes.js
module.exports = [{
    name: "users",
    request: {
        path: "/users"
    },
    response: {
        jsonBody: [{name: "Jerry"}, {name: "George"}]
    }
}, {
  name: "loginOk",
  request: {
    path: "/login",
    method: "post",
    jsonBody: {user: "user", password: "123456"}
  },
  response: {
    jsonBody: {"user": {name: "user"}}
  }
}, {
  name: "loginNotOk",
  request: {
    path: "/login",
    method: "post",
    jsonBody: {"user": "user", password: "123"}
  },
  response: {
    jsonBody: {"error": "bad password"}
  }
}]);
```

For each route, you can use the following properties:

| Property            | Required | Default Value | Description                                                                                                                                                                  |
| ------------------- | -------- | ------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                | true     |               | the name of the route will be used to name the json file that will be created on `resources/mappings`                                                                        |
| request.path        | true     |               | URL of the route, like `/users`                                                                                                                                              |
| request.method      | true     | GET           | HTTP method                                                                                                                                                                  |
| request.jsonBody    | false    |               | An object with the data that must be send as request body to match.                                                                                                          |
| request.body        | false    |               | Like `request.json`, but with just a string                                                                                                                                  |
| request.headers     |          |               | An object with the headers to match. It supports the following formats: `headers: {foo: "bar"}`; `headers: {foo: {matches: "^regex$"}}` or `headers: {foo: {equalTo: "bar"}}`|
| request.cookies     |          |               | Works the same way as `request.headers`                                                                                                                                      |
| request.queryString |          |               | Works the same way as `request.headers`                                                                                                                                      |
| request.auth        |          |               | Basic auth login and password to check to do the match. You can pass an array (`request.auth: ["bob", "123456"]`) or object (`request.auth: {user: "bob", pass: "123456"}`)  |
| response.status     | true     | 200           | HTTP response code                                                                                                                                                           |
| response.jsonBody   |          |               | You can provide an object to be used as response body                                                                                                                        |
| response.body       |          |               | Similar to `response.jsonBody`, but can be a string, number etc                                                                                                              |
| response.headers    |          |               | An object with the headers to respond, like `headers: {"Content-Type": "text/plain"}`                                                                                        |
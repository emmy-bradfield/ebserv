# `ebserve`

ebserve is a simple javascript package designed to assist with automating the setup of a simple MongoDB/Express/NodeJS server/backend, most useful for full-stack web projects.

ebserve takes in 4 parameters and 1 optional parameter to build a Mongoose Schema, create Express Routes, and serve the NodeJS backend with a static html frontend webpage. 

ebserve achieves this with only a few lines of code, which can easily be included in a front-end javascript file rather than setting up a complete backend for your fullstack project.

---
## $Setup$

### Requirements
* NodeJS
* MongoDB Cloud Database

### Installation
Install with npm
```
npm i ebserve
```
Instanciate the ebserve class in your javascript file with
```
const ebserve = require("ebserve");
const server = new ebserve({<schema>, <mongo_url>, <static_dir>, <static_file>, <port>})
```

---

## $Usage$
### Creating an Instance
Instaniate an instance of ebserve using `const <name> = new ebserve({})` and specifying the following parameters:
* **schema** - An array of strings, with each string define an attribute name and type as a key-value pair seperated by a colon. E.g., `["_id: Number", "User: String", "Name: String", "Age: Number"]`
* **mongo_url** - A string containing the url to a MongoDB/Atlas cloud Database
* **static_dir and static_file** - The static (html) file to display and the path to it. If the .html file is in the root, use '/'
* **port** - Port can optionally be set. If left blank, ebserve will check for a .env file with a variable PORT, and if none is found it will defaut to port 4000

An example of this is shown below

```
const ebserve = require("ebserve")

const mySchema = ["_id: Number", "User: String", "Name: String", "Age: Number"]

const server = new ebserve({
    schema: mySchema,
    mongo_url: "mongodb+srv://<username>.<password>@<db-cluster>.mongodb.net/?retryWrites=true&w=majority",
    static_dir: '/',
    static_file: 'index.html',
    port: 5500
});
```

### Creating a Schema
The ebserve class contains the `ebserve.model()` function which generates a Mongoose Schema given the schema array provided and saves it to documentModel.js in root. This function takes no parameters, instead using this.schema as provided when creating an instance of ebserve.
The model is names Document by default, and is exported as Document from documentModel.js. However, all code for the `.model()` function can be found in model.js and can easily be amended to better suit your needs if preferred.

### Create routes
There are two key ways of creating routes:
`ebserve.quickRoute()` - automatically creates the following routes:
1. post route at /create
2. get all route at /read
3. get one (by ID) route at /read/:_id
4. put (by ID) route at /update/:_id
5. delete (by ID) route at /delete/:_id

`ebserve.addRoute(type, route_url, param = null)` - creates a custome route given the following:
* TYPE : can be 'post', 'get', 'put', or 'delete'
* ROUTE_URL : the url to direct the request to
* PARAM : paramter to be used - required for getOne, findOne, and deleteOne requests but can be left as null for create and readAll

All route functions stem from router.js and use ExpressJS for setup.

### Serve the website
The `ebserve.serve(port=null)` function is then used to serve the database and the static webpage. If no port was provided when the ebserve instance was created, ebserve will check `process.env.PORT` for a PORT variable and, if none is found, defaut to port 4000.
By default, the webpage is served at `http://localhost:<port>/` although this can be amended in server.js. 
`ebserve.serve()` will take the static_dir and static_file given when the ebserve instance was created.

### Quickstart
Finally, `ebserve.quickstart()` can be used to simply get the connection up and running. `.quickstart()` calls `.model()`, `.quickRoute()`, and `.serve()` in order and will `console.log()` completion of each step. The server will then be available on your local host at the port defined (or 4000 if not otherwise defined).

### Frontend
ebserve is designed simply to automate the process of setting up a M/E/N server for running a full-stack website, and so can be implemented either as the backend seperate from the client, or can be called directly in the main javascript file in front-end (usually index.js).

---

## $Appendix$
### Contributors
* [Emily Bradfield](https://www.github.com/emmy-bradfield) - _initial work_

### License
This project is lisenced under the MIT Licence - see [LICENSE.md](C:\Users\emily\OneDrive\Software\npm\ebserv\LICENSE) for further information
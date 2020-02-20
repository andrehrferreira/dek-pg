# @dekproject/PostgreSQL

PostgreSQL interface plugin for DEK

What does this plugin do?

* Control configuration for connection to PostgreSQL in production development mode in a simplified way with **dotenv**
* Performs connection implementation along the lines ES6 being pre requirement to start the project

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ yarn add @dekproject/pg --save
$ nano .env
```

In the .env file add the following settings

```
PG_USER=root
PG_PASSWORD=
PG_HOST=localhost
PG_PORT=27017
PG_DB=dek
```

## Usage

Using direct

```bash
$ yarn @dekproject/scope --save
```

Using in the standard DEK skeleton

```js
import { $, app, pg } from "@dekproject/scope";

app.get("user", (req, res) => {
    pg.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
        if(err) res.status(500).send(err).end();
        else res.send(res).end();
    })
});

$.wait("pg").then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
```

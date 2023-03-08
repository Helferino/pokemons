# Node & BigQuery assignment

__! For BigQuery task there is `bigquery.sql` file in root !__

There is space for many improvements and better approaches but its just matter of time and expectations from assignment task. I wrote some notes accross app but we can discuss this later on call.

## Setup

__Environemnt__
<br>
Create dev envirovnemnt by duplicating `.env.example` file and change name to `.env`.

__BigQuery__
<br>
Create `google.json` file in project root. This file should contain service account credentials (idk how its called correctly xd) for using BigQuery. Also you will need to create dataset `pokemon` and table `pokemons` in your BigQuery project.

Structure of `pokemons` table:

```
original_id    INTEGER        REQUIRED
name           STRING(100)    REQUIRED
weight         INTEGER        NULLABLE
```

_I know this could be auto-created with some init script when app is started_


__Start__
<br>
Install dependencies and run development server with following commands:

```bash
npm i
npm run dev
```

## Features

There are two endpoints for external API data:
  - List all pokemons `/pokemons`
  - Detail of pokemon `/pokemons/{id}`

If you want to add pokemon to your BigQuery database using following endpoint: `/pokemons/{id}/add`. Currently there is no duplicate check but it would be nice feature. Other endpoints for like `list/get/remove` can be implemented.

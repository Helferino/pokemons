/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return 'Jakub Urban - Kontentino assignment using Pokemon API 😼'
})

// Pokemon API
Route.get('/pokemons', 'PokemonsController.index')
Route.get('/pokemons/:id', 'PokemonsController.show')

// Insert into BigQuery db based on provided ID
Route.get('/pokemons/:id/add', 'PokemonsController.store')

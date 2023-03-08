import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PokemonService from 'App/Services/PokemonService'
import IndexValidator from 'App/Validators/Pokemons/IndexValidator'

export default class PokemonsController {
  public async index({ request }: HttpContextContract) {
    const payload = await request.validate(IndexValidator)

    return await PokemonService.list(payload)
  }

  public async show({ params }: HttpContextContract) {
    return await PokemonService.detail(params.id)
  }

  public async store({ params, response }: HttpContextContract) {
    try {
      await PokemonService.create(params.id)
    } catch (e) {
      return response.status(500).send('Problem adding new pokemon')
    }

    response.json({ type: 'success' })
  }
}

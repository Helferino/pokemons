import { BigQuery } from '@google-cloud/bigquery'
import { ResponseDetail } from './PokemonService'

class BigQueryService {
  private client: BigQuery
  private dataset: string
  private table: string

  constructor(options: any) {
    this.client = new BigQuery({
      keyFilename: options.filename || 'google.json',
    })

    this.dataset = options.dataset || 'pokemon'
    this.table = options.table || 'pokemons'
  }

  public async insert(pokemon: ResponseDetail) {
    const data = {
      original_id: pokemon.id,
      name: pokemon.name,
      weight: pokemon.weight,
    }

    return await this.client.dataset(this.dataset).table(this.table).insert(data)
  }
}

export default new BigQueryService({})

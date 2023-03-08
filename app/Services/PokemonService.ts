import { APIException } from 'App/Exceptions/APIException'
import { IndexValidatorProps } from 'App/Validators/Pokemons/IndexValidator'
import axios, { AxiosInstance } from 'axios'
import BigQueryService from './BigQueryService'

// Maybe this interfaces can be moved to separate file for interfaces

interface StringUrl {
  name: string
  url: string
}

export interface ResponseList {
  count: number
  next: string
  previous: string | null
  results: StringUrl[]
}

export interface ResponseDetail {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: { is_hiddne: boolean; slot: number; ability: StringUrl }[]
  forms: StringUrl[]
  game_indices: { game_index: number; version: StringUrl }[]
  held_items: {
    item: StringUrl
    version_details: { rarity: number; version: StringUrl }[]
    location_area_encounters: string
  }[]
  moves: {
    move: StringUrl
    version_group_detail: {
      level_learned_at: number
      version_group: StringUrl
      move_learn_method: StringUrl
    }
  }[]
  species: StringUrl
  sprites: {
    back_default: null | string
    back_female: null | string
    back_shiny: null | string
    back_shiny_female: null | string
    front_default: null | string
    front_female: null | string
    front_shiny: null | string
    front_shiny_female: null | string
    other: any
  }
  stats: { base_stat: number; effort: number; stat: StringUrl }[]
  types: { slot: number; type: StringUrl }[]
  past_types: {
    generation: StringUrl
    types: { slot: number; type: StringUrl }[]
  }[]
}

class PokemonService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://pokeapi.co/api/v2/', // This could be configurable from .env file
    })

    this.client.interceptors.response.use(
      (response) => response,
      (err) => Promise.reject(new APIException(err)) // Better error handling
    )
  }

  public async list(_options: IndexValidatorProps) {
    const { data } = await this.client.get<ResponseList>('pokemon')

    return data
  }

  public async detail(idOrName: string | number) {
    const { data } = await this.client.get<ResponseDetail>(`pokemon/${idOrName}`)

    return data
  }

  public async create(id: number) {
    const pokemon = await this.detail(id)

    return await BigQueryService.insert(pokemon)
  }
}

export default new PokemonService()

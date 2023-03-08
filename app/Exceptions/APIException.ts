import { Exception } from '@poppinss/utils'
import { AxiosError } from 'axios'

export class APIException extends Exception {
  public data?: any

  constructor(err: AxiosError) {
    super(err.message || 'An error occurred.', 500, 'E_API_ERROR')
    this.data = { code: err.code, status: err.response?.status }
  }
}

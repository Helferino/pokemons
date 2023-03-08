import { schema } from '@ioc:Adonis/Core/Validator'

// Here params like "page,sort,fields,limit" can be implemented
// But I didn't find any query arguments in API so it's empty

export default class IndexValidator {
  public schema = schema.create({})
}

// Extract props so it can be easly used somwhere else
let validator: IndexValidator
type IndexValidatorProps = typeof validator.schema.props

export { IndexValidatorProps }

import * as ajv from "ajv";
import {
  BadServiceRequestError,
} from '../errors'

export const validate = (schema: object, data: object): void => {
  const validator = new ajv({ allErrors: true });
  const valid = validator.validate(schema, data);
  if (!valid) {
    throw new BadServiceRequestError(validator.errorsText());
  }
};
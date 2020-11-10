/**
 * Error that is thrown if the caller has not the right to do the operation
 * @class NotFoundError
 * @constructor constructor
 * @param  {String}    message the error message
 * @param {Error} [cause] the causing error
 */
export class AccessRightError extends Error {}

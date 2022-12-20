import { body } from 'express-validator';

export const registryValidator = [
  body('firstName', 'Not valid first name (min 3 symbols)')
    .isLength({min: 3}),

  body('lastName','Not valid last name (min 3 symbols)')
    .isLength({min: 3}),

  body('email','Not valid email format').isEmail(),

  body('passwordWithHash')
    .isLength({min: 1}),

  body('age')
    .optional().isNumeric(),

  body('address')
    .optional().isString(),

  body('avatarURL','Not valid URL address')
    .optional().isURL(),
]

export const authValidator = [
  body('email','Not valid email format')
    .isEmail(),

  body('passwordWithHash')
    .isLength({min: 1}),
]
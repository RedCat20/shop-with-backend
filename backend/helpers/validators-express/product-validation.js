import { body } from 'express-validator';

export const productValidator = [
  body('name', 'Not valid product name (min 3 symbols)')
    .isLength({min: 3}),

  body('userId','Not valid user id')
    .isString(),

  body('price')
    .optional().isNumeric(),

  // body('discount')
  //   .optional().isNumeric(),

  body('isAvailable')
    .optional().isBoolean(),

  // body('color')
  //   .optional().isString(),
  //
  // body('size')
  //   .optional().isString(),
  //
  // body('producer')
  //   .optional().isString(),

  body('imgURL','Not valid img URL address')
    .optional(),
    // .optional().isURL(),
]
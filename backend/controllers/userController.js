import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserSchema from "../models/User.js";
import jwt from "jsonwebtoken";

export const registration = async (req, res) => {
  try {
    // const err = validationResult(req);
    // if (err?.array?.()?.length) {
    //   return res.status(400).json(err.array());
    // }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const doc = new UserSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordWithHash: hash,
      age: req.body.age,
      address: req.body.address,
      avatarURL: req.body.avatarURL,
    });

    const user = await doc.save();

    const token = jwt.sign({
      _id: user._id
    }, 'secret-shop', {
      expiresIn: '30d',
    })

    // res.status(200).json({
    //   success: true,
    //   user,
    //   token,
    // });

    // res.status(200).json({
    //   ...user._doc,
    //   token,
    // });

    const { passwordWithHash, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
      token,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can not register',
      error: err
    });
  }
}

export const authorization = async (req, res) => {

  try {
    const user = await UserSchema.findOne( {email: req.body.email} );
    console.log(user)


    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordWithHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'User with this login or password not found'
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, 'secret-shop', {
      expiresIn: '24h',
    })

    const { passwordWithHash, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
      token,
    });

  }
  catch(err) {
    console.log('Authorization request error', err);
    res.status(500).json(
      {
        success: false,
        message: 'Auth server error'
      }
    )
  }
}

export const getUserInfo = async (req, res) => {
  try {

    const user = await UserSchema.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        userData: {},
        message: 'No user with this id'
      });
    }

    const {passwordWithHash, ...userData} = user._doc;

    res.status(200).json({
      ...userData,
    });
  }

    // try {
    //   res.status(200).json({
    //     // ...userData,
    //     userData: {}
    //   });
    // }
  catch (err) {
    console.log('Bad request for user getting', err);
    res.status(500).json(
      {
        success: false,
        message: 'Get user error, no access'
      }
    )
  }
}
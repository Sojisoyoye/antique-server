import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const createToken = payload => jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });

export const validatePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);


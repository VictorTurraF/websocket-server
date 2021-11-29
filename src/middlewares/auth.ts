import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

function ensureAuthentication (req: Request, res: Response, next: NextFunction) {
  const foundAuthHeader = req?.headers?.authorization

  if (!foundAuthHeader) {
    return res.status(400).send({ message: "Autenticação necessária"})
  }

  const [, token] = foundAuthHeader.split(' ')

  if (!token) {
    return res.status(400).send({ message: "Autenticação necessária"})
  }

  const isValidJWT = jwt.verify(token, 'mysecret')

  if (!isValidJWT) {
    return res.status(400).send({ message: "Token inválido"})
  }

  // @ts-ignore
  req.user_id = isValidJWT.sub

  return next()
}

export { ensureAuthentication }
import { NextFunction, Request, Response } from "express";

const requireAdmin = (_req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  if (!user.isAdmin) {
    return res.sendStatus(401);
  }

  return next();
};

export default requireAdmin;

import { Request, Response, NextFunction } from "express";
import GuestService from "../../application/services/guest.service";

export default class GuestController {
  constructor(private guestService: GuestService) {}

  async insert(req: Request, res: Response) {
    try {
      const response = await this.guestService.createGuest(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : `Undefined error: ${error}`,
      });
    }
  }
}

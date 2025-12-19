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

  async update(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      if (!id || id === "") {
        res.status(400).json({
          error: "Guest ID not provided.",
        });
      }

      //TODO: validate body
      const response = await this.guestService.updateGuest(id, req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : `Undefined error: ${error}`,
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      if (!id || id === "") {
        res.status(400).json({
          error: "Guest ID not provided.",
        });
      }

      const response = await this.guestService.deleteGuest(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : `Undefined error: ${error}`,
      });
    }
  }

  async items(_req: Request, res: Response) {
    try {
      const response = await this.guestService.getGuestList();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : `Undefined error: ${error}`,
      });
    }
  }

  async itemById(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      if (!id || id === "") {
        res.status(400).json({
          error: "Guest ID not provided.",
        });
      }
      const response = await this.guestService.getGuestById(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : `Undefined error: ${error}`,
      });
    }
  }

  async itemByName(req: Request, res: Response) {
    try {
      const name = req.params["name"];
      if (!name || name === "") {
        res.status(400).json({
          error: "Guest name not provided.",
        });
      }
      const response = await this.guestService.getGuestByName(name);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : `Undefined error: ${error}`,
      });
    }
  }
}

import { Request, Response, NextFunction } from "express";
import ReservationService from "../../application/services/reservation.service";

export default class ReservationController {
  constructor(private reservationService: ReservationService) {}

  async insert(req: Request, res: Response) {
    try {
      const reservation = await this.reservationService.createReservation(
        req.body
      );

      res.status(201).json(reservation);
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
      const response = await this.reservationService.updateReservation(
        id,
        req.body
      );
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

      const response = await this.reservationService.deleteReservation(id);
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
      const response = await this.reservationService.getReservationList();
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
          error: "Reservation ID not provided.",
        });
      }
      const response = await this.reservationService.getReservationById(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : `Undefined error: ${error}`,
      });
    }
  }

  async itemByGuestName(req: Request, res: Response) {
    try {
      const name = req.params["name"];
      if (!name || name === "") {
        res.status(400).json({
          error: "Guest name not provided.",
        });
      }
      const response = await this.reservationService.getReservationByGuestName(
        name
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : `Undefined error: ${error}`,
      });
    }
  }
}

import { Router } from "express";
import { Container } from "../../infrastructure/container/container";
import ReservationService from "../../application/services/reservation.service";
import ReservationController from "../controllers/reservation.controller";

export function createReservationRoutes(container: Container): Router {
  const router = Router();

  const reservationService =
    container.get<ReservationService>("ReservationService");
  const reservationController = new ReservationController(reservationService);

  router.post("/", reservationController.insert.bind(reservationController));
  router.put("/:id", reservationController.update.bind(reservationController));
  router.delete(
    "/:id",
    reservationController.remove.bind(reservationController),
  );
  router.get("/", reservationController.items.bind(reservationController));
  router.get(
    "/:id",
    reservationController.itemById.bind(reservationController),
  );
  router.get(
    "/search/:name",
    reservationController.itemByGuestName.bind(reservationController),
  );

  return router;
}

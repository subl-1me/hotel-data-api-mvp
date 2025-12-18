import { Router } from "express";
import GuestController from "../controllers/guest.controller";
import { Container } from "../../infrastructure/container/container";
import GuestService from "../../application/services/guest.service";

export function createGuestRoutes(container: Container): Router {
  const router = Router();

  const guestService = container.get<GuestService>("GuestService");
  const guestController = new GuestController(guestService);

  router.post("/", guestController.insert.bind(guestController));

  return router;
}

import { Router } from "express";
import GuestController from "../controllers/guest.controller";
import { Container } from "../../infrastructure/container/container";
import GuestService from "../../application/services/guest.service";

export function createGuestRoutes(container: Container): Router {
  const router = Router();

  const guestService = container.get<GuestService>("GuestService");
  const guestController = new GuestController(guestService);

  router.post("/", guestController.insert.bind(guestController));
  router.put("/:id", guestController.update.bind(guestController));
  router.delete("/:id", guestController.remove.bind(guestController));
  router.get("/", guestController.items.bind(guestController));
  router.get("/:id", guestController.itemById.bind(guestController));
  router.get("/search/:name", guestController.itemByName.bind(guestController));

  return router;
}

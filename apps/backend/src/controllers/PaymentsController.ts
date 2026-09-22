import { Request, Response, NextFunction, Application } from "express";
import { PaymentsService } from "../services";
import { authCheck } from "../interceptors/auth-check";
import { decodeJwt } from "../utils/decode-jwt";
import type { JwtPayload } from "jsonwebtoken";
import { type UkassaPayment } from "../types/Payments";

type GetPaymentStatusQuery = {
  paymentId: string;
};

type CreatePaymentBody = {
  cost: number;
};

type UkassaNotificationBody = {
  type: "notification";
  event:
  | "payment.canceled"
  | "payment.succeeded"
  | "payment.waiting_for_capture";
  object: UkassaPayment;
};

export class PaymentsController {
  constructor(
    private paymentsService: PaymentsService,
    private logger: Console = console,
  ) { }

  async getPaymentStatusById(req: Request, res: Response, next: NextFunction) {
    try {
      const { paymentId } = req.query as GetPaymentStatusQuery;

      if (!paymentId) {
        throw new Error("Payment ID did not provided");
      }

      const paymentStatus =
        await this.paymentsService.getPaymentStatusById(paymentId);

      res.status(200).send({
        status: paymentStatus,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { cost } = req.body as CreatePaymentBody;

      const cookies = req.cookies;
      const jwtToken = cookies["jwt-token"];

      if (!jwtToken) {
        throw new Error("Access denied");
      }

      const decodedToken = decodeJwt(jwtToken) as JwtPayload;

      if (!cost || cost <= 0) {
        throw new Error("Incorrect cost");
      }

      if (!decodedToken.id) {
        throw new Error("Access denied");
      }

      const paymentData = await this.paymentsService.createPayment(
        cost,
        decodedToken.id,
      );

      if (!paymentData.paymentId || !paymentData.widgetId) {
        throw new Error("Can not create payment");
      }

      res.status(200).send({
        widgetId: paymentData.widgetId,
        paymentId: paymentData.paymentId,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async notificationHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, event, object } = req.body as UkassaNotificationBody;

      console.log('---------------')
      console.log('Уведомление о смене статуса платежа')
      console.log('ID платежа:', object.id)
      console.log('Статус', event)
      console.log('---------------')

      const [_, status] = event.split(".");

      // Асинхронно обрабатывать ответ
      // Логировать смены статусов
      this.paymentsService.updatePaymentStatus({
        paymentStatus: status as UkassaPayment["status"],
        payment: object,
      });

      res.status(200).send();
    } catch (error: any) {
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  setupRoutes(app: Application) {
    app.get("/payments/status", (req, res, next) =>
      this.getPaymentStatusById(req, res, next),
    );
    app.post("/payments/", authCheck, (req, res, next) =>
      this.createPayment(req, res, next),
    );
    app.post("/payments/notification", (req, res, next) =>
      this.notificationHandler(req, res, next),
    );
  }
}

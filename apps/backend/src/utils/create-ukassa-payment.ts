import { getEnvConfig } from "@/config/get-env-config";
import type { UkassaPayment } from "../types/Payments";

export const createUkassaPayment = async (
  cost: number,
  paymentId: string,
  shopId: string,
  apiKey: string,
  description?: string
) => {
  try {
    const env = getEnvConfig()
    const auth = btoa(`${shopId}:${apiKey}`);

    const response = await fetch(`${env.UKASSA_API}/v3/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
        "Idempotence-Key": paymentId,
      },
      body: JSON.stringify({
        amount: {
          value: `${cost}.00`,
          currency: "RUB",
        },
        confirmation: {
          type: "embedded",
        },
        receipt: {
          customer: {
            email: "nadym-chess@mail.ru",
            full_name: "Поречный Антон Владимирович",
            inn: "890303626220"
          },
          items: [
            {
              description: "Оплата занятий",
              amount: {
                value: `${cost}.00`,
                currency: "RUB",
              },
              vat_code: 1,
              quantity: 1,
            }
          ]
        },
        capture: true,
        description: description || null,
      }),
    });

    const payment: UkassaPayment = await response.json() as UkassaPayment;

    return payment;
  } catch (err) {
    console.log(err);
    console.error("UKASSA ERROR: Can not create payment");

    return null;
  }
};

import { Suspense } from "react";
import NameYourOrderForm from "./name-your-order-form";

export default function NameYourOrder() {
  return (
    <Suspense>
      <NameYourOrderForm />
    </Suspense>
  );
}

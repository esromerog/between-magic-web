import { Suspense } from "react";
import TemperatureSizeForm from "./temperature-size-form";

export default function TemperatureSize() {
  return (
    <Suspense>
      <TemperatureSizeForm />
    </Suspense>
  );
}

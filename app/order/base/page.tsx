import { Suspense } from "react";
import BaseForm from "./base-form";

export default function Base() {
  return (
    <Suspense>
      <BaseForm />
    </Suspense>
  );
}

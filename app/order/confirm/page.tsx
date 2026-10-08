import { Suspense } from "react";
import ConfirmForm from "./confirm-form";

export default function Confirm() {
  return (
    <Suspense>
      <ConfirmForm />
    </Suspense>
  );
}

import { Suspense } from "react";
import FlavorForm from "./flavor-form";

export default function Flavor() {
  return (
    <Suspense>
      <FlavorForm />
    </Suspense>
  );
}

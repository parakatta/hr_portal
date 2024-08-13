import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from 'react-dom'

export default function SubmitButton({
  label,
  variant,
}: {
  label: string;
  variant: any;
}) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant={variant}>
      {label}
    </Button>
  );
}

// src/components/ui/money-input.tsx
"use client";

import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "@/components/ui/input"; // Importe o Input do Shadcn

export function MoneyInput({ error, label, ...props }: NumericFormatProps & { error?: string } & { label?: string }) {
  return (
    <NumericFormat
      {...props}
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      label={ label ?? '' }
      className={error ? "border-red-500 focus-visible:ring-red-500" : ""} 
    />
  );
}
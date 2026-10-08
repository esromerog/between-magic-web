'use client';

import { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import dynamic from 'next/dynamic';

const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then((m) => m.Scanner),
  { ssr: false },
);

export function OverlayScanner({
  onScan,
}: {
  onScan: (value: string) => void;
}) {
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const first = detectedCodes[0];
    if (first) onScan(first.rawValue);
  };

  return (
    <Scanner
      onScan={handleScan}
      onError={(error) => console.error(error)}
      constraints={{ facingMode: { ideal: "environment" } }}
      components={{ finder: false }}
    />
  );
}

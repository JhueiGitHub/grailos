import dynamic from "next/dynamic";
import { Suspense } from "react";

interface AppRendererProps {
  appName: string;
}

export default function AppRenderer({ appName }: AppRendererProps) {
  const DynamicApp = dynamic(
    () => import(`../apps/${appName.toLowerCase()}/page`),
    {
      loading: () => <p>.</p>,
      ssr: false,
    }
  );

  return (
    <Suspense fallback={<p></p>}>
      <DynamicApp />
    </Suspense>
  );
}

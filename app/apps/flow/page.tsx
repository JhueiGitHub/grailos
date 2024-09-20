"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("./components/flow-dashboard"), {
  ssr: false,
});

export default function Flow() {
  return <App />;
}

"use client";

import ProtectedPage from "@/src/lib/protected.page";
import ConverterContainer from "@/src/components/converter/ConverterContainer";
import { data, functions } from "@/src/functions/caser";

function Page() {
  return <ConverterContainer data={data} functions={functions} />;
}

export default ProtectedPage(Page);

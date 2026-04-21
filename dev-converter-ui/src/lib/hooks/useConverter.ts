/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

function useConverter(funcs: any, converters: any) {
  const initialConverter = converters[0];
  const [converter, setConverter] = useState(initialConverter);

  return [
    converter,
    setConverter,
    funcs[converter.functionName],
    converters,
    funcs,
  ];
}

export default useConverter;

import Converter from "./Converter";
import useConverter from "@/src/lib/hooks/useConverter";

function ConverterContainer({ data, functions }: any) {
  const [currConverter, setCC, converterFunction, converters] = useConverter(
    functions,
    data,
  );

  const goProps = {
    currConverter,
    setCC,
    converterFunction,
    converters,
  };

  return <Converter {...goProps} />;
}

export default ConverterContainer;

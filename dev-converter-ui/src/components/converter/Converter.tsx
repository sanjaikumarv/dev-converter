import ConverterOptions from "./ConverterOptions";
import MainConvertion from "./MainConvertion";

function Converter({
  currConverter,
  setCC,
  converterFunction,
  converters,
}: any) {
  return (
    <div className='m-2 sm:m-8 mt-10 sm:mt-10'>
      <ConverterOptions
        converters={converters}
        setCC={setCC}
        currConverter={currConverter}
      />

      <MainConvertion
        converterFunction={converterFunction}
        currConverter={currConverter}
      />
    </div>
  );
}

export default Converter;

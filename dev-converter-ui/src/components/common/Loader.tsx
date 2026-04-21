import PropagateLoader from "react-spinners/BarLoader";

export default function Loader(props: any) {
  return (
    <div className='flex justify-center mt-16'>
      <PropagateLoader {...props} width={300} />
    </div>
  );
}

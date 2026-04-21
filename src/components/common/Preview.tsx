import copyToClipboard from "@/src/utils/copyToClipboard";
import Button from "./Button";
import downloadMethods from "@/src/utils/downloadMethods";

function Preview(props: any) {
  const content =
    typeof props.content === "string" || typeof props.content === "number"
      ? props.content
      : JSON.stringify(props.content, null, 2);
  return (
    <div className='max-w-xl'>
      <h1 className='text-gray-200 text-xl py-2'>Preview</h1>
      <pre
        className='max-h-80 relative border border-gray-400 rounded-md bg-gray-800 text-white 
         hover:focus:outline-none focus:ring focus:ring-brand-100 focus-within p-4 overflow-hidden'>
        {props.currConverter.download ? (
          <Button
            buttonType='download'
            className='absolute -right-2 top-2 mr-4'
            disabled={content === " "}
            onClick={() => {
              (downloadMethods as any)[props.currConverter.download](
                content,
                ...props.currConverter.downloadParams,
              );
            }}
          />
        ) : (
          <Button
            className='absolute -right-2 top-2 mr-4'
            onClick={() => copyToClipboard(content)}
            buttonType='copy'
          />
        )}

        {content}
      </pre>
    </div>
  );
}
export default Preview;

function Button({
  buttonType,
  copied,
  downloaded,
  disabled,
  className,
  ...props
}: any) {
  const commonClasses =
    "bg-gray-800 px-2.5 py-2 border border-gray-400 rounded-md flex space-x-1 hover:bg-white text-white text-xs hover:text-black";

  if (buttonType === "copy") {
    return (
      <div className={className} {...props}>
        <button disabled={disabled} className={commonClasses}>
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='currentColor'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 stroke-current text-gray-400 animate-pulse'>
            <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
            <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
          </svg>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    );
  } else {
    return (
      <div className={className} {...props}>
        <button disabled={disabled} className={commonClasses}>
          <svg
            width='18'
            height='18'
            fill='currentColor'
            stroke='currentColor'
            className='mr-2 stroke-current text-gray-400 animate-pulse'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'></path>
          </svg>
          {downloaded ? "Downloaded" : "Download"}
        </button>
      </div>
    );
  }
}

export default Button;

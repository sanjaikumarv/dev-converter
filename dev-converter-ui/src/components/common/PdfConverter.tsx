import * as React from "react";
import Image from "next/image";
import { jsPDF } from "jspdf";

interface FileWithPreview {
  file: File;
  preview: string;
}

function PdfConverter() {
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const [converting, setConverting] = React.useState(false);

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const clearAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setConverting(true);

    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        
        // Add new page if not the first page
        if (i > 0) pdf.addPage();

        const imgData = await getBase64(item.file);
        
        // Get image dimensions to handle orientation
        const img = new (window as any).Image();
        img.src = item.preview;
        await new Promise((resolve) => (img.onload = resolve));

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
        const imgWidth = img.width * ratio;
        const imgHeight = img.height * ratio;
        
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);
      }

      pdf.save("dev-converter-images.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className='text-center max-w-6xl mx-auto px-4'>
      <div className='border rounded-2xl border-gray-400 mt-7 p-6 bg-gray-900/50 backdrop-blur-sm'>
        <h1 className='text-2xl font-bold text-white mb-6'>Image to PDF Converter</h1>

        <div className='mt-5 focus:border-brand-700 w-full max-w-md mx-auto'>
          <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-xl hover:border-brand-500 transition-colors group cursor-pointer relative'>
            <input
              id='file-upload'
              name='file-upload'
              type='file'
              multiple
              accept="image/*"
              onChange={onSelectFiles}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            />
            <div className='space-y-1 text-center'>
              <svg 
                className="mx-auto h-12 w-12 text-gray-400 group-hover:text-brand-400" 
                stroke="currentColor" 
                fill="none" 
                viewBox="0 0 48 48" 
                aria-hidden="true"
              >
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className='text-sm text-gray-400'>
                <span className='font-medium text-brand-400 group-hover:text-brand-300'>Upload files</span>
                <p className='pl-1'>or drag and drop</p>
              </div>
              <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-semibold">Selected Images ({files.length})</h2>
              <button 
                onClick={clearAll}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
                  <img 
                    src={file.preview} 
                    alt={`preview ${index}`} 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                    <button 
                      onClick={() => removeFile(index)}
                      className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                    <p className="text-[10px] text-white truncate">{file.file.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center pb-6">
              <button 
                onClick={handleConvert}
                disabled={converting}
                className={`
                  flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95
                  ${converting 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20'}
                `}
              >
                {converting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Convert & Download PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfConverter;

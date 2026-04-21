function Home() {
  return (
    <div className=' max-w-700  bg-dark-900 border rounded-2xl border-dark-900 '>
      <div className=' mt-7 text-3xl text-dark-100 text-center'>
        <h1>Converter collections</h1>
      </div>
      <div className='flex items-center'>
        <div className='ml-56 mt-9 mb-12'>
          <div
            className=' flex mb-10 hover:bg-gray-700 border rounded-xl  border-gray-600 
               '>
            <h1 className=' px-4 py-3 text-white bg rounded-xl  text-2xl bg-yellow-500 '>
              ST
            </h1>
            <h1 className=' p-2 mt-2 text-gray-50 '>String method</h1>
          </div>

          <div className='mt-5 flex border rounded-xl hover:bg-gray-700 border-gray-600   '>
            <h1 className='p-3 bg-blue-600 bg rounded-xl text-white  text-2xl '>
              OB
            </h1>
            <h1 className='text-gray-50 mt-2 p-2'> Object method</h1>
          </div>
        </div>
        <div className='ml-9 mb-4 mt-1 '>
          <div
            className='  flex mb-10 hover:bg-gray-700 border rounded-xl  border-gray-600 
               '>
            <h1 className='px-4 py-3 text-gray-100 bg rounded-xl  text-2xl bg-red-500 '>
              ND
            </h1>
            <h1 className='mt-2 p-2 text-gray-50 '>Node method</h1>
          </div>

          <div className=' flex  border rounded-xl hover:bg-gray-700 border-gray-600   '>
            <h1 className='px-4 py-3 bg-pink-600 bg rounded-xl text-white  text-2xl '>
              MT
            </h1>
            <h1 className=' text-gray-50 mt-2 p-2'> Math method</h1>
          </div>
        </div>
        <div className='ml-9 mb-3'>
          <div
            className=' flex mb-10 hover:bg-gray-700 border rounded-xl  border-gray-600 
               '>
            <h1 className='px-4 py-3 text-gray-100 bg rounded-xl  text-2xl bg-purple-700 '>
              FN
            </h1>
            <h1 className='mt-2 p-2 text-gray-50 '>Function method</h1>
          </div>

          <div className='mt-3 flex  border rounded-xl hover:bg-gray-700 border-gray-600   '>
            <h1 className='p-3 bg-green-700 bg rounded-xl text-white  text-2xl '>
              DM
            </h1>
            <h1 className='mt-2 px-5 text-gray-50 p-2'> Dom method</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;

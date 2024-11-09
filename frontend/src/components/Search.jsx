import React from 'react';

const Search = (props) => {
  const { handleChange, handleSearch, error, input, isLoading, loading, setLoading } = props;

  const handleKeydown = (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="">
      <div className='flex justify-start items-center gap-2'>
        <input
          isInvalid={error}
          placeholder="Search or paste YouTube link here"
          onChange={handleChange}
          value={input}
          onKeyDown={handleKeydown}
          className='p-2 bg-slate-300 rounded-lg w-[100%] md:w-[500px]'
        />
        <button
          onClick={handleSearch}
          isLoading={isLoading}
          loadingText="Converting..."
          className='py-2 px-5 bg-black rounded-lg text-white'
        >
          {
            loading ? 
            "Loading..." : 
            "Download"
          }
        </button>
      </div>
    </div>
  );
};

export default React.memo(Search);

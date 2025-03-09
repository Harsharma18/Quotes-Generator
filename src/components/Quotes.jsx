import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const store = localStorage.getItem("quote");
function Quotes() {

  const [quote, setQuote] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState(JSON.parse(store)|| []);
useEffect(()=>{
 
    localStorage.setItem("quote",JSON.stringify(favorites));
  
},[favorites]);
  const fetchNewQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  const handleAddFavorite = () => {
    if (!favorites.some((item) => item.content === quote.content)) {
      setFavorites([...favorites, quote]);
      toast.success("Quote added to favorites!");
    }else{
      toast.error("Quote is already in favorites!");
    }
  };

  const handleDelete = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
    toast.success("Quote removed from favorites!");
  };

  return (
    <div className="bg-indigo-300 min-h-screen flex flex-col justify-center items-center p-4">
      {/* Quote Card */}
      <Toaster />

      <div className="relative w-full max-w-md p-6 bg-gray-900 shadow-lg rounded-xl flex flex-col space-y-6 border border-gray-800">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-green-500 pb-3">
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">
            QUOTE
          </h1>
          <i
  onClick={() => setShowFavorites(!showFavorites)}
  className="bx bxs-heart text-green-400 relative text-3xl cursor-pointer transition-transform hover:scale-125 hover:text-green-500"
>
  {/* Favorite Count */}
  {favorites.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-sm  text-white px-2  py-0.5 rounded-full">
      {favorites.length}
    </span>
  )}
</i>

        </div>

      
        {showFavorites && (
          <div className="absolute z-10 right-0 top-0 md:w-64 w-full h-full bg-white shadow-lg transition-transform duration-500 ease-in-out p-4 overflow-y-auto">
            <div className="flex justify-between items-center bg-red-200 p-3 border-b border-red-400">
              <p className="text-lg font-semibold">Favorites</p>
              <button onClick={() => setShowFavorites(false)}>
                <i className="bx bx-x-circle text-3xl text-red-600"></i>
              </button>
            </div>
            <div className="flex flex-col gap-3 p-3">
              {favorites.length === 0 ? (
                <p className="text-gray-500 italic text-center">No favorite quotes added yet.</p>
              ) : (
                favorites.map((item, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded shadow flex flex-col relative">
                    <button
                      onClick={() => handleDelete(index)}
                      className="absolute top-1 right-1 text-red-600 hover:text-red-800"
                    >
                      <i className="bx bxs-trash"></i>
                    </button>
                    <p className="text-sm font-semibold">{item.content}</p>
                    <p className="text-sm text-gray-500 italic">- {item.author}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

       
        <div className="text-gray-200 space-y-4 text-center leading-relaxed">
          <i className="bx bxs-quote-alt-left text-4xl text-green-400 animate-pulse"></i>
          <p className="text-xl font-semibold">{quote.content || "Loading..."}</p>
          <i className="bx bxs-quote-alt-right text-4xl text-green-400 animate-pulse"></i>
          <p className="text-sm text-gray-400 italic">- {quote.author || "Unknown"}</p>
        </div>

     
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={fetchNewQuote}
            className="rounded-lg px-4 py-2 bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition transform hover:scale-105"
          >
            New Quote
          </button>
          <button
            onClick={handleAddFavorite}
            className="rounded-lg px-4 py-2 bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quotes;

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export default function SearchHistory() {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/search/history");
        setSearchHistory(res.data?.history);
      } catch (error) {
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDeleteSearchHistory = async (item) => {
    try {
      await axios.delete(`/api/search/history/${item.id}`);
      setSearchHistory(searchHistory.filter((i) => i.id !== item.id));
      toast.success("Search item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="h-screen bg-black text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Search History</h2>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory?.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="bg-gray-800 p-4 rounded flex items-start">
                <img
                  src={SMALL_IMG_BASE_URL + item.image}
                  alt="history image"
                  className="size-16 rounded-full object-cover mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-white text-lg">{item.title}</span>
                  <span className="text-gray-400 text-sm">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <span
                  className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                    item.searchType === "movie"
                      ? "bg-red-600"
                      : item.searchType === "tv"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
                >
                  {item.searchType[0].toUpperCase() + item.searchType.slice(1)}
                </span>
                <Trash
                  className="size-5 cursor-pointer hover:fill-red-600 hover:text-red-600 ml-4"
                  onClick={() => handleDeleteSearchHistory(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

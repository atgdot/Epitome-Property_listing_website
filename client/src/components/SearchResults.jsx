import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import HighRiseCard from "../components/HighRiseCard";
import PropertyCard from "../components/PropertyCard";
import { searchProperties } from "../utils/Store/slice/propertySlice";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    console.log("Search query changed:", query); // Debug log
    if (query && query.trim()) {
      console.log("Dispatching search from results page"); // Debug log
      dispatch(searchProperties(query));
    }
  }, [query, dispatch]);

  // Add more detailed loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl animate-pulse">Searching for "{query}"...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl text-red-500 mb-4">
          Error searching properties
        </div>
        <div className="text-gray-600 mb-4">{error.message}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Search Results for "{query}"
        </h1>

        {searchResults?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((property) =>
              property.category === "Residential" ? (
                <HighRiseCard key={property._id} property={property} />
              ) : (
                <PropertyCard key={property._id} property={property} />
              )
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {query
              ? "No properties found matching your search"
              : "Enter a search term to find properties"}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

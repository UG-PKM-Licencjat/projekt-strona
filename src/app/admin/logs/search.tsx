import React, { useState } from "react";
import { MongoClient, Db, Collection } from "mongodb";

interface Error {
  id: string;
  message: string;
  type: string;
  timestamp: Date;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleSearch = async () => {
    try {
      const client = new MongoClient("<mongoDB connection string>");
      await client.connect();
      const db: Db = client.db("<database name>");
      const collection: Collection<Error> = db.collection("errors");

      const query: any = {};
      if (searchTerm) {
        query.message = { $regex: searchTerm, $options: "i" };
      }
      if (filterType) {
        query.type = filterType;
      }

      const result = await collection.find(query).toArray();
      console.log(result);
    } catch (error) {
      console.error("Error searching for errors:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;

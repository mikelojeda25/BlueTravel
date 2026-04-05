import React from "react";
import Travel_InfoList from "./components/Travel_InfoList";

const App = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Travel Packages</h1>
      <Travel_InfoList />
    </div>
  );
};

export default App;

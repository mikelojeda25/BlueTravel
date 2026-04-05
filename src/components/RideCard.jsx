// RideCard.jsx
import React from "react";

const RideCard = ({ ride, openModal }) => {
  return (
    <div
      key={ride.id}
      className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg"
    >
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        {ride.title}
      </h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => openModal(ride)} // Trigger openModal with the ride data
      >
        View Details
      </button>
    </div>
  );
};

export default RideCard;

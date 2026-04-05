import React, { useState } from "react";
import rides from "../Rides_DB.json";
import Modal from "./Modal";
import RideCard from "./RideCard";

const Travel_InfoList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Bagong state para sa Search
  const [selectedModes, setSelectedModes] = useState([]);
  const [durationRange, setDurationRange] = useState(240); // Ginawa kong max default para makita lahat sa simula
  const [selectedRide, setSelectedRide] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modeOptions = [...new Set(rides.map((ride) => ride.mode))];

  const handleModeChange = (mode) => {
    setSelectedModes((prevModes) =>
      prevModes.includes(mode)
        ? prevModes.filter((m) => m !== mode)
        : [...prevModes, mode],
    );
  };

  const openModal = (ride) => {
    setSelectedRide(ride);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRide(null);
    setIsModalOpen(false);
  };

  // Filter logic (Search + Mode + Duration)
  const filteredRides = rides.filter((ride) => {
    const matchesSearch = ride.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMode =
      selectedModes.length === 0 || selectedModes.includes(ride.mode);
    const matchesDuration = ride.duration <= durationRange;

    return matchesSearch && matchesMode && matchesDuration;
  });

  return (
    <div className="p-4">
      {/* Search Bar Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Search Destination</h3>
        <input
          type="text"
          placeholder="Where do you want to go?..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Mode</h3>
            <div className="flex flex-col gap-2">
              {modeOptions.map((mode) => (
                <label
                  key={mode}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="rounded text-blue-600"
                    value={mode}
                    checked={selectedModes.includes(mode)}
                    onChange={() => handleModeChange(mode)}
                  />
                  <span className="text-sm">{mode}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Max Duration</h3>
            <input
              type="range"
              min="10"
              max="240"
              step="10"
              value={durationRange}
              onChange={(e) => setDurationRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm mt-2 text-gray-600">
              Up to {durationRange} minutes
            </div>
          </div>
        </div>

        {/* Rides List Section */}
        <div className="w-full md:w-3/4">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filteredRides.length > 0 ? (
              filteredRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} openModal={openModal} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                Walang nahanap na biyahe. Try mong baguhin ang filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Setup */}
      {isModalOpen && selectedRide && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-2">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">
              {selectedRide.title}
            </h2>
            <div className="space-y-3">
              <p>
                <strong>🚀 Mode:</strong> {selectedRide.mode}
              </p>
              <p>
                <strong>⏱ Duration:</strong> {selectedRide.duration} mins
              </p>
              <hr />
              <p className="leading-relaxed text-gray-700">
                {selectedRide.description}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Travel_InfoList;

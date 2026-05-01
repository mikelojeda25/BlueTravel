import { useState } from "react";
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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Bar Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-cyan-300">Search Destination</h3>
        <input
          type="text"
          placeholder="Where do you want to go?..."
          className="w-full p-4 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-slate-400 backdrop-blur-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Travel Mode</h3>
            <div className="flex flex-col gap-3">
              {modeOptions.map((mode) => (
                <label
                  key={mode}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-slate-700/30 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    className="rounded text-cyan-400 focus:ring-cyan-400"
                    value={mode}
                    checked={selectedModes.includes(mode)}
                    onChange={() => handleModeChange(mode)}
                  />
                  <span className="text-sm text-slate-200">{mode}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Max Duration</h3>
            <input
              type="range"
              min="10"
              max="240"
              step="10"
              value={durationRange}
              onChange={(e) => setDurationRange(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm mt-3 text-slate-300">
              Up to {durationRange} minutes
            </div>
          </div>
        </div>

        {/* Rides List Section */}
        <div className="w-full lg:w-3/4">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filteredRides.length > 0 ? (
              filteredRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} openModal={openModal} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-slate-400">
                No journeys found. Adjust your filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Setup */}
      {isModalOpen && selectedRide && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {selectedRide.title}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-cyan-400">🚀</span>
                <p className="text-slate-200">
                  <strong className="text-cyan-300">Mode:</strong> {selectedRide.mode}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">⏱</span>
                <p className="text-slate-200">
                  <strong className="text-purple-300">Duration:</strong> {selectedRide.duration} mins
                </p>
              </div>
              <hr className="border-slate-600" />
              <p className="leading-relaxed text-slate-300 text-lg">
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

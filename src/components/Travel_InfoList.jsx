import React, { useState } from "react";
import rides from "../Rides_DB.json";
import Modal from "./Modal";
import RideCard from "./RideCard";

const Travel_InfoList = () => {
  const [selectedModes, setSelectedModes] = useState([]);  // Track selected modes
  const [durationRange, setDurationRange] = useState(10);  // Track selected duration range (default to minimum value)
  const [selectedRide, setSelectedRide] = useState(null);  // Track the selected ride for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state

  // Unique mode options from the rides data
  const modeOptions = [...new Set(rides.map((ride) => ride.mode))];

  // Handle mode checkbox changes
  const handleModeChange = (mode) => {
    setSelectedModes((prevModes) =>
      prevModes.includes(mode)
        ? prevModes.filter((m) => m !== mode)  // Remove mode if unchecked
        : [...prevModes, mode]  // Add mode if checked
    );
  };

  // Handle opening the modal with selected ride details
  const openModal = (ride) => {
    setSelectedRide(ride);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setSelectedRide(null);
    setIsModalOpen(false);
  };

  // Filter rides based on selected filters (mode and duration)
  const filteredRides = rides.filter((ride) => {
    const matchesMode = selectedModes.length === 0 || selectedModes.includes(ride.mode);  // Filter by mode
    const matchesDuration = ride.duration <= durationRange;  // Filter by duration in minutes
    return matchesMode && matchesDuration;
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-6">
        <h3 className="font-semibold">Mode</h3>
        <div className="flex flex-wrap gap-2">
          {modeOptions.map((mode) => (
            <label key={mode} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={mode}
                checked={selectedModes.includes(mode)}
                onChange={() => handleModeChange(mode)}
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Duration (in minutes)</h3>
        <input
          type="range"
          min="10"  // Minimum duration
          max="240" // Maximum duration
          step="10"
          value={durationRange}  // Bind slider value to state
          onChange={(e) => setDurationRange(Number(e.target.value))}  // Update state with selected value
          className="w-full"
        />
        <div className="text-sm mt-2">Up to {durationRange} minutes</div>
      </div>

      {/* Rides List */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredRides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            openModal={openModal}  // Pass function to open the modal with selected ride details
          />
        ))}
      </div>

      {/* Modal for selected ride */}
      {isModalOpen && selectedRide && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedRide.title}</h2>
            <p className="mb-2">
              <strong>Mode:</strong> {selectedRide.mode}
            </p>
            <p className="mb-2">
              <strong>Duration:</strong> {selectedRide.duration} minutes
            </p>
            <p>{selectedRide.description}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Travel_InfoList;

import PropTypes from "prop-types";

const RideCard = ({ ride, openModal }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold text-cyan-300 mb-4">
        {ride.title}
      </h2>
      <div className="mb-4 text-slate-300">
        <p className="flex items-center space-x-2 mb-2">
          <span className="text-purple-400">🚀</span>
          <span>{ride.mode}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="text-green-400">⏱</span>
          <span>{ride.duration} mins</span>
        </p>
      </div>
      <button
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
        onClick={() => openModal(ride)}
      >
        View Details
      </button>
    </div>
  );
};

RideCard.propTypes = {
  ride: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default RideCard;

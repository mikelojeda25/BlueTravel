import PropTypes from "prop-types";

const RideCard = ({ ride, openModal }) => {
  return (

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

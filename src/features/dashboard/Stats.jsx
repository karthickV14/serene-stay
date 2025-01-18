import PropTypes from "prop-types";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  // 1
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

// Prop validation for Stats
Stats.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      totalPrice: PropTypes.number.isRequired, // Ensure bookings have a totalPrice property
    })
  ).isRequired, // 'bookings' must be an array of objects and is required
  confirmedStays: PropTypes.arrayOf(
    PropTypes.shape({
      numNights: PropTypes.number.isRequired, // Ensure confirmedStays have a numNights property
    })
  ).isRequired, // 'confirmedStays' must be an array of objects and is required
  numDays: PropTypes.number.isRequired, // 'numDays' must be a number and is required
  cabinCount: PropTypes.number.isRequired, // 'cabinCount' must be a number and is required
};

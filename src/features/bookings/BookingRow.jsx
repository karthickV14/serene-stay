import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

// import { formatCurrency } from "../../utils/helpers";
// import { formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {/*  formatDistanceFromNow(startDate)} */}
          {isToday(new Date(startDate)) ? "Today" : startDate}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>
        {
          // formatCurrency()
          totalPrice
        }
      </Amount>
    </Table.Row>
  );
}

export default BookingRow;

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired, // The ID of the booking
    created_at: PropTypes.string.isRequired, // The creation timestamp
    startDate: PropTypes.string.isRequired, // Start date in string format
    endDate: PropTypes.string.isRequired, // End date in string format
    numNights: PropTypes.number.isRequired, // Number of nights
    numGuests: PropTypes.number.isRequired, // Number of guests
    totalPrice: PropTypes.number.isRequired, // Total price of the booking
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"])
      .isRequired, // Allowed status values
    guests: PropTypes.shape({
      fullName: PropTypes.string.isRequired, // Full name of the guest
      email: PropTypes.string.isRequired, // Email of the guest
    }).isRequired, // Guests object must be provided
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired, // Cabin name
    }).isRequired, // Cabins object must be provided
  }).isRequired, // Booking object is required
};

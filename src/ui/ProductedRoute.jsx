import PropTypes from "prop-types";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var() (--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProductedRoute({ children }) {
  const navigate = useNavigate();

  // 1 Load the Authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2 If there is No authenticated user redirect to the /Login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3 While loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4 If there is a user, render the app

  if (isAuthenticated) return children;
}

ProductedRoute.propTypes = {
  // Validate that children is a valid React node
  children: PropTypes.node.isRequired,
};

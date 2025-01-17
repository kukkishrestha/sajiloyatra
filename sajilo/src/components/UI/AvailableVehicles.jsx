import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/car-item.css";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

function AvailableVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);

  const location = useLocation();
  const { startDateTime, endDateTime } = location.state || {};

  // Fetch logged-in user data from localStorage
  const loggedInUser = {
    name: localStorage.getItem("loggedInUserName"),
    email: localStorage.getItem("loggedInUserEmail"),
    phone: localStorage.getItem("loggedInUserPhone"),
  };

  // Fetch all vehicles and bookings
  useEffect(() => {
    axios
      .get("http://localhost:8080/getVehicles")
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((err) => {
        console.error("Error fetching vehicles:", err);
      });

    axios
      .get("http://localhost:8080/api/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, []);

  // Function to check if a vehicle is booked for the selected date range
  const isBooked = (vehicleId) => {
    return bookings.some((booking) => {
      const isSameVehicle = booking.carName === vehicleId;
      const isTimeConflict =
        (new Date(startDateTime) < new Date(booking.endDateTime) &&
          new Date(endDateTime) > new Date(booking.startDateTime)) ||
        (new Date(startDateTime) >= new Date(booking.startDateTime) &&
          new Date(startDateTime) < new Date(booking.endDateTime));
      return isSameVehicle && isTimeConflict;
    });
  };

  return (
    <div>
      <Row className="car-list">
        {vehicles
          .filter((vehicle) => vehicle.status === "available" && !isBooked(vehicle._id))
          .map((vehicle) => (
            <Col lg="4" md="6" sm="12" className="mb-5" key={vehicle._id}>
              <div className="car__item">
                <div className="car__img">
                  {vehicle.imageUrl && (
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      className="w-100"
                    />
                  )}
                </div>

                <div className="car__item-content mt-4">
                  <h4 className="section__title text-center">{vehicle.name}</h4>
                  <h6 className="rent__price text-center mt-">
                    Rs {vehicle.rent}.00 <span>/ Day</span>
                  </h6>

                  <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                    <span className="d-flex align-items-center gap-1">
                      <i className="ri-car-line"></i> {vehicle.status}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <i className="ri-settings-2-line"></i> {vehicle.capacity}
                    </span>
                  </div>

                  <button className="w-50 car__item-btn car__btn-rent">
                    <Link
                      to="/booking"
                      state={{ user: loggedInUser, vehicle }}
                    >
                      Rent
                    </Link>
                  </button>

                  <button className="w-50 car__item-btn car__btn-details">
                    <Link to={`/car-details/${vehicle._id}`}>Details</Link>
                  </button>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default AvailableVehicles;

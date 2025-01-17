import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const journeyDate = event.target.journeyDate.value;
    const startTime = event.target.startTime.value;
    const endTime = event.target.endTime.value;

    const startDateTime = `${journeyDate}T${startTime}`;
    const endDateTime = `${journeyDate}T${endTime}`;

    try {
      // Fetch available vehicles from the backend
      const response = await axios.post("http://localhost:8080/api/available-vehicles", {
        startDateTime,
        endDateTime,
      });

      // Navigate to the AvailableVehicles page with the filtered data
      navigate("/AvailableVehicles", {
        state: {
          availableVehicles: response.data,
          startDateTime,
          endDateTime,
        },
      });
    } catch (err) {
      console.error("Error fetching available vehicles:", err);
      setError("Error fetching available vehicles. Please try again.");
    }
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="date" name="journeyDate" required />
        </FormGroup>
        <FormGroup className="form__group">
          <input className="journey__time" type="time" name="startTime" required />
        </FormGroup>
        <FormGroup className="form__group">
          <input className="journey__time" type="time" name="endTime" required />
        </FormGroup>
        <FormGroup className="form__group">
          <button className="btn find__car-btn" type="submit">
            Find Vehicle
          </button>
        </FormGroup>
      </div>
      {error && <p className="error">{error}</p>}
    </Form>
  );
};

export default FindCarForm;

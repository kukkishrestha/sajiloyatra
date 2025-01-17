import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/car-details.css";

function CarDetails() {
  const { id } = useParams(); // Get the car ID from the URL
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getVehicle/${id}`) // Fetch car details using the ID
      .then((response) => {
        setCarDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });
  }, [id]);

  if (!carDetails) {
    return <p>Loading car details...</p>;
  }

  return (
    <div className="car-details">
      <div className="car-details__img">
        {carDetails.imageUrl && (
          <img src={carDetails.imageUrl} alt={carDetails.name} />
        )}
      </div>
      <h2>{carDetails.name}</h2>
      <p>Status: {carDetails.status}</p>
      <p>Model: {carDetails.car}</p>
      <p>Capacity: {carDetails.capacity}</p>
      <p>Rent: Rs {carDetails.rent}/Day</p>
      <p>Description: "Experience the perfect blend of style, comfort,
         and performance with the <b>{carDetails.name}</b>. 
         Designed to turn heads wherever you go, this sleek vehicle offers a smooth, 
         exhilarating ride, thanks to its powerful engine and advanced features. 
         Whether you're driving through the city or taking a weekend road trip, 
         the {carDetails.name} ensures a comfortable journey with its spacious interior, 
         top-of-the-line infotainment system, and luxurious seating. With exceptional fuel 
         efficiency and cutting-edge safety features, it’s the ideal choice for both daily commuting and long-distance adventures.
          Get ready to enjoy the road like never before!"</p>
    </div>
  );
}

export default CarDetails;

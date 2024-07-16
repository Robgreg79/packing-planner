import { Link } from "react-router-dom";
import Trip from "./models/trip";
import "./TripCard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface TripCardProps {
  trip: Trip;
  OnDelete: (id: string) => void;
  OnEdit: (trip: Trip, id: string) => void;
}

export function TripCard({ trip, OnDelete, OnEdit }: TripCardProps) {
  const notify1 = () =>
    toast.success("Trip Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notify2 = () =>
    toast.success("Trip Restored!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <div className="trip_card">
      <h4>{trip.name}</h4>
      <p>{trip.to}</p>
      <p>Duration: {trip.duration} days</p>
      {Array.isArray(trip.weather) ? (
        <div>
          <div>
            Date(s): <p>{trip.weather[0]?.Date?.substring(0, 10)}</p>
            {trip.duration > 1 && (
              <p>
                {" "}
                - {trip.weather[trip.duration - 1]?.Date?.substring(0, 10)}
              </p>
            )}
          </div>
          <p>
            Max Temp During Trip:{" "}
            {Math.max(...trip.weather.map((o) => o.Temperature?.Maximum.Value))}
            °{trip.weather[0].Temperature?.Maximum.Unit}
          </p>
          <p>
            Minimum Temp During Trip:{" "}
            {Math.min(...trip.weather.map((o) => o.Temperature?.Minimum.Value))}
            °{trip.weather[0].Temperature?.Minimum.Unit}
          </p>
        </div>
      ) : (
        <div>
          Date(s): <p>{trip.weather?.Date?.substring(0, 10)}</p>
          <p>
            Max Temp During Trip: {trip.weather!.Temperature?.Maximum.Value}°
            {trip.weather!.Temperature?.Maximum.Unit}
          </p>
          <p>
            Min Temp During Trip: {trip.weather!.Temperature?.Minimum.Value}°
            {trip.weather!.Temperature?.Minimum.Unit}
          </p>
        </div>
      )}

      {trip.open === false && (
        <Link className="trip_card_button" to={`packing/${trip._id}`}>
          Start Packing
        </Link>
      )}
      {trip.open === true && (
        <Link className="trip_card_button" to={`viewpacklist/${trip?._id}`}>
          View Packing List
        </Link>
      )}
      {trip.complete ? (
        <button
          className="trip_card_button"
          onClick={() => {
            OnEdit(
              {
                ...trip,
                complete: false,
              },
              trip._id?.toString()!
            );
            notify2();
          }}
        >
          Restore
        </button>
      ) : (
        <button
          className="trip_card_button"
          onClick={() => {
            OnDelete(trip._id?.toString()!);
            notify1();
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
}

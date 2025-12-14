import React from "react";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Loading from "./Loading";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ServiceCenter = () => {
  const axiosInstance = useAxios();
  const position = [23.8103, 90.4125];
  const { data: service = [], isLoading } = useQuery({
    queryKey: ["serviceCenter"],
    queryFn: async () => {
      const res = await axiosInstance.get("/service-center");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-500 text-center my-12">
        Available Delivery Locations
      </h2>
      <div className="border rounded-2xl w-full h-[600px] my-5">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-full rounded-2xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {service?.map((item) => (
            <Marker key={item._id} position={[item?.latitude, item?.longitude]}>
              <Popup>
                <div className="p-2 max-w-xs">
                  <h3 className="text-lg font-semibold text-blue-600">
                    BookCourier Delivery
                  </h3>
                  <p className="text-gray-700 mt-1">
                    <span className="font-medium">City:</span> {item.city}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 italic">
                    Fast & reliable book delivery by BookCourier!
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ServiceCenter;

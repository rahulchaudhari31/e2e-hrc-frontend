import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});


const locations = [
    {
        city: "Mumbai",
        country: "India",
        address: "Andheri East, Mumbai, Maharashtra",
        description: "Our Mumbai office location.",
        latitude: 19.1136,
        longitude: 72.8697,
    },
    {
        city: "Pune",
        country: "India",
        address: "Baner, Pune, Maharashtra",
        description: "Our Pune office location.",
        latitude: 18.559,
        longitude: 73.7868,
    },
    {
        city: "Delhi",
        country: "India",
        address: "Connaught Place, New Delhi",
        description: "Our Delhi office location.",
        latitude: 28.6315,
        longitude: 77.2167,
    },
];

function LocationMap() {
    return (
        <div className="relative mt-12 overflow-hidden rounded-3xl shadow-lg" style={{ zIndex: 1 }}>
            <MapContainer
                center={[22.9734, 78.6569]}
                zoom={5}
                scrollWheelZoom={false}
                className="h-[500px] w-full"
                style={{ zIndex: 1 }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={[location.latitude, location.longitude]}
                    >
                        <Popup>
                            <div className="w-64">
                                <h3 className="text-lg font-bold text-[#004CA5]">
                                    {location.city}
                                </h3>

                                <p className="text-sm font-semibold text-orange-500">
                                    {location.country}
                                </p>

                                <p className="mt-2 text-sm text-gray-700">
                                    {location.address}
                                </p>

                                <p className="mt-2 text-sm text-gray-600">
                                    {location.description}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default LocationMap;
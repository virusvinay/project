import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'; // hook to manipulate map
import L from 'leaflet';

// Emergency button component
function EmergencyButton({ onEmergencyClick }) {
    return (
        <button onClick={onEmergencyClick}>Emergency</button>
    );
}

// Map component
function HospitalMap() {
    const [userLocation, setUserLocation] = useState(null);
    const [hospitalData, setHospitalData] = useState(null);
    const [path, setPath] = useState([]);
    
    const map = useMap();

    // Get user's location when the component mounts
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.log("Error getting location", error);
                }
            );
        }
    }, []);

    // Handle Emergency button click
    const handleEmergencyClick = async () => {
        if (userLocation) {
            const response = await fetch('/api/findhospital', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    latitude: userLocation.lat,
                    longitude: userLocation.lng,
                    specialty: 'cardiology',  // example specialty
                    equipment: 'ECG'          // example equipment
                })
            });
            const data = await response.json();
            if (data.hospitals && data.hospitals.length > 0) {
                const nearestHospital = data.hospitals[0]; // select the first hospital
                setHospitalData(nearestHospital);
                setPath(nearestHospital.path);  // Assuming the path comes from the backend
                // Center the map on the hospital location
                map.setView([nearestHospital.latitude, nearestHospital.longitude], 13);
            }
        }
    };

    return (
        <div>
            <EmergencyButton onEmergencyClick={handleEmergencyClick} />
            <MapContainer center={userLocation || [51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {userLocation && (
                    <Marker position={userLocation}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}
                {hospitalData && (
                    <Marker position={[hospitalData.latitude, hospitalData.longitude]}>
                        <Popup>{hospitalData.name}</Popup>
                    </Marker>
                )}
                {path.length > 0 && (
                    <Polyline positions={path} color="blue" />
                )}
            </MapContainer>
        </div>
    );
}

export default HospitalMap;

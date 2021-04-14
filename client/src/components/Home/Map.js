import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map({sightings}){
    return (
        <MapContainer 
            center={[0, 0]} 
            zoom={1} 
            scrollWheelZoom={true}
            style={{height: "360px"}}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sightings.map(s => (
            <Marker key={s._id} position={[s.location.latitude, s.location.longitude]}>
                <Popup>
                User: {s.user.username} <br /> 
                Date: {s.date} <br /> 
                Animal: {s.animal.type} <br /> 
                Location: {s.location.latitude}, {s.location.longitude} <br /> 
                {s.comment} <br /> 
                Created At:{s.createdAt}.
                </Popup>
            </Marker>
            ))}
        </MapContainer>
    )
}

export default Map;
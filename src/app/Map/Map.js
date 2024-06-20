'use client'

import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';
import geojsonData from '../egy1.json'; // Adjust the path if necessary
import { useEffect } from 'react';
import L from 'leaflet';

import "../../app/globals.css";

// CSS for the permanent labels
const labelStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  padding: '2px 5px',
  borderRadius: '3px',
  boxShadow: '0 0 2px rgba(0,0,0,0.3)',
  pointerEvents: 'none', // Makes sure the labels do not interfere with map interactions
};

const EgyptMap = (props) => {
  const center = [26.5698, 29.78366];
  const router = useRouter();

  // Function to convert GeoJSON coordinates to LatLng arrays
  const convertCoordinates = (coordinates) => {
    // Assumes coordinates is an array of arrays
    return coordinates.map(coordSet => coordSet.map(coord => [coord[1], coord[0]]));
  };

  const bounds = [
    [22, 25],  // Southwest coordinates (lat, lng)
    [32, 35]   // Northeast coordinates (lat, lng)
  ];

  const getMapStyle = () => ({
    width: props.isOpen ? '80%' : '100%',
    height: '90vh',
    transition: 'width 0.2s' // Optional: Add transition for smooth resizing
  });

  const handleClick = (name) => {
    router.push(`/dashboard?name=${encodeURIComponent(name)}`);
  };

  const Labels = ({ features }) => {
    const map = useMap();

    useEffect(() => {
      features.forEach((feature, index) => {
        const latLngs = feature.geometry.type === "Polygon"
          ? convertCoordinates(feature.geometry.coordinates)
          : feature.geometry.coordinates.map(polygon => convertCoordinates(polygon));

        // Calculate centroid for the label
        const centroid = L.polygon(latLngs).getBounds().getCenter();

        // Create a div element for the label
        const label = L.divIcon({
          className: 'map-label',
          html: `<div style="${Object.entries(labelStyle).map(([k, v]) => `${k}:${v}`).join(';')}">${feature.properties.NAME_1}</div>`
        });

        // Add the label to the map
        L.marker(centroid, { icon: label }).addTo(map);
      });
    }, [map, features]);

    return null;
  };

  return (
    <div style={getMapStyle()}>
      <MapContainer
        center={center}
        zoom={6}
        minZoom={6}
        maxZoom={12}
        bounds={bounds}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url='https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=PrqDqtmyrLavEWLDnFNT'
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {geojsonData.features.map((feature, index) => {
          const coordinates = feature.geometry.coordinates;
          const positions = feature.geometry.type === "Polygon"
            ? convertCoordinates(coordinates)
            : coordinates.map(polygon => convertCoordinates(polygon));

          return (
            <Polygon
              key={index}
              positions={positions}
              color="#000000"
              fillColor="#3498DB"
              weight={1}
              fillOpacity={0} // make the opacity 0.5 on hover
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.7,
                    color: '#000000',
                    weight: 1,
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0,
                    color: '#000000',
                    weight: 1,
                  });
                },
                click: (e) => {
                  const properties = feature.properties; // Get properties of the clicked feature
                  console.log(properties);
                  props.setName(properties.NAME_1);
                  handleClick(properties.NAME_1);
                }
              }}
            />
          );
        })}
        <Labels features={geojsonData.features} />
      </MapContainer>
    </div>
  );
};

export default EgyptMap;

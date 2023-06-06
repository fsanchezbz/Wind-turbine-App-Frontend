import { useEffect, useRef, useState } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import './Map.css';
import Users from '../users/Users';
import Post from '../post/Post';

const Map = () => {
  const mapRef = useRef(null);
  const [response, setResponse] = useState('');
  const [directionsDuration, setDirectionsDuration] = useState('');
  const [directionsDistance, setDirectionsDistance] = useState('');
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [infoWindowContent, setInfoWindowContent] = useState('');
  const [mapMarkers, setMapMarkers] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_URL}`;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 8,
        center: { lat: 52.5123936, lng: 13.4131204 },
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: window.google.maps.ControlPosition.LEFT,
        },
        scrollwheel: true,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });
      const trafficLayer = new google.maps.TrafficLayer();

      trafficLayer.setMap(map);
      const infoWindow = new window.google.maps.InfoWindow();
      const geocoder = new window.google.maps.Geocoder();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({ map });
      const marker = new window.google.maps.Marker();

      const inputText = document.createElement('input');
      inputText.type = 'text';
      inputText.placeholder = 'Enter a location';
      inputText.className = 'input-text';
      inputText.style.fontSize = '12px';

      const submitButton = document.createElement('input');
      submitButton.type = 'button';
      submitButton.value = 'Geocode';
      submitButton.className = 'button-primary';
      submitButton.style.fontSize = '12px';

      const clearButton = document.createElement('input');
      clearButton.type = 'button';
      clearButton.value = 'Clear';
      clearButton.className = 'button-secondary';
      clearButton.style.fontSize = '12px';

      const locationButton = document.createElement('button');
      locationButton.id = 'sVuEFc';
      locationButton.style.fontSize = '12px';

      const locationButtonIcon = document.createElement('div');
      locationButtonIcon.className = 'mNcDk bpLs1b';
      locationButton.appendChild(locationButtonIcon);

      const directionsButton = document.createElement('button');
      directionsButton.className = 'hArJGc id-content';
      directionsButton.setAttribute(
        'jsan',
        't-InRiWW_5oj8,7.hArJGc,0.aria-label,0.id,22.jsaction'
      );
      directionsButton.setAttribute('fdprocessedid', 't05238');
      directionsButton.style.fontSize = '12px';
      const divElement = document.createElement('div');
      divElement.className = 'eYqqWd vF7Cdb';
      directionsButton.appendChild(divElement);

      const instructionsElement = document.createElement('p');
      instructionsElement.id = 'instructions';
      instructionsElement.innerHTML =
        '<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.';

      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputText);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(directionsButton);
      map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(submitButton);
      map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(clearButton);
      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

      map.addListener('click', (e) => {
        geocode({ location: e.latLng });
      });

      submitButton.addEventListener('click', () => {
        geocode({ address: inputText.value });
      });

      clearButton.addEventListener('click', clear);

      locationButton.addEventListener('click', getUserLocation);

      directionsButton.addEventListener('click', getDirections);

      function clear() {
        // Clear markers
        marker.setMap(null);
        // Clear directions
        directionsRenderer.setDirections({ routes: [] });
        setDirectionsRenderer(null); // Reset the directions renderer
        setDirectionsDuration('');
        setDirectionsDistance('');
        // Clear info window
        setInfoWindowVisible(false);
        setInfoWindowContent('');
        infoWindow.close();
        // Clear all markers from the map
        mapMarkers.forEach((marker) => marker.setMap(null));
        setMapMarkers([]);
      }

      function geocode(request) {
        clear();
        geocoder
          .geocode(request)
          .then((result) => {
            const { results } = result;

            if (results && results.length > 0) {
              const position = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              };
              marker.setPosition(position);
              marker.setMap(map);
              setResponse(JSON.stringify(result, null, 2));

              const infoWindowContent = `<div>${results[0].formatted_address}</div>`;
              setInfoWindowContent(infoWindowContent);
              setMapMarkers((prevMarkers) => [...prevMarkers, marker]);
              // Check if directions response exists and update the info window content
              if (directionsResponse) {
                const route = directionsResponse.routes[0];
                const leg = route.legs[0];
                const directionsContent = `<div><strong>Duration:</strong> ${leg.duration.text}</div>
                                           <div><strong>Distance:</strong> ${leg.distance.text}</div>`;
                setInfoWindowContent(infoWindowContent + directionsContent);
              }

              setInfoWindowVisible(true);
              infoWindow.setContent(infoWindowContent);
              infoWindow.open(map, marker);
            } else {
              alert('No results found.');
            }
          })
          .catch((e) => {
            alert('Geocode was not successful for the following reason: ' + e);
          });
      }

      function getUserLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const latlng = {
                lat: latitude,
                lng: longitude,
              };

              // Update the map to center on the user's current location
              map.setCenter(latlng);
              marker.setPosition(latlng);
              marker.setMap(map);

              // Perform reverse geocoding to get the address of the user's location
              geocoder
                .geocode({ location: latlng })
                .then((result) => {
                  const { results } = result;
                  if (results && results.length > 0) {
                    setResponse(JSON.stringify(result, null, 2));
                  }
                })
                .catch((e) => {
                  alert('Geocode was not successful for the following reason: ' + e);
                });
            },
            (error) => {
              alert('Unable to retrieve your location. Error: ' + error.message);
            }
          );
        } else {
          alert('Geolocation is not supported by your browser.');
        }
      }

      function getDirections() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const start = new window.google.maps.LatLng(latitude, longitude);
              const end = marker.getPosition();
              const request = {
                origin: start,
                destination: end,
                travelMode: window.google.maps.TravelMode.DRIVING, // Default travel mode
                unitSystem: window.google.maps.UnitSystem.METRIC,
                provideRouteAlternatives: false, // Request multiple routes
              };

              // Show travel mode options to the user
              const selectedMode = window.prompt(
                'Select travel mode:\n1. Driving\n2. Walking\n3. Bicycling\n4. Transit',
                '1'
              );

              // Update the request with the selected travel mode
              switch (selectedMode) {
                case '1':
                  request.travelMode = window.google.maps.TravelMode.DRIVING;
                  break;
                case '2':
                  request.travelMode = window.google.maps.TravelMode.WALKING;
                  break;
                case '3':
                  request.travelMode = window.google.maps.TravelMode.BICYCLING;
                  break;
                case '4':
                  request.travelMode = window.google.maps.TravelMode.TRANSIT;
                  break;
                default:
                  alert('Invalid travel mode selected');
                  return;
              }

              const directionsService = new window.google.maps.DirectionsService();
              directionsService.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  setDirectionsResponse(result); // Store the directions response
                  directionsRenderer.setDirections(result);
                  const route = result.routes[0];
                  const leg = route.legs[0];
                  setDirectionsDuration(leg.duration.text);
                  const distance = leg.distance.text;
                  setDirectionsDistance(distance);

                  const infoWindowContent = `<div><strong>Distance:</strong> ${distance}</div>
                                             <div><strong>Duration:</strong> ${leg.duration.text}</div>`;
                  setInfoWindowContent(infoWindowContent);
                  infoWindow.setContent(infoWindowContent);
                  infoWindow.open(map, marker);
                } else {
                  alert('Unable to retrieve directions. Error: ' + status);
                }
              });
            },
            (error) => {
              alert('Unable to retrieve your location. Error: ' + error.message);
            }
          );
        } else {
          alert('Geolocation is not supported by your browser.');
        }
      }
    };

    return () => {
      document.body.removeChild(script);
      mapMarkers.forEach((marker) => marker.setMap(null));
    };
  }, []);

  return (
    <Flex className="page-wrapper" direction="column" minHeight="100vh">
      {/* Map Component */}
      <Flex className="mapContainer leftColumn googlemap" marginLeft={'2rem'} marginTop="4rem" flex={1}>
        <Flex className="googlemap" direction="column" alignItems="flex-start" marginRight="2rem">
          <Box ref={mapRef} className="map" marginBottom="2rem" />
          <Post />
        </Flex>
        <Flex direction="column"  style={{marginRight: '80px'}}>
          <Users />
        </Flex>
      </Flex>

      {infoWindowVisible && <div className="info-window">{infoWindowContent}</div>}
    </Flex>
  );
};

export default Map;

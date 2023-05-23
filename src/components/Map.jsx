import { useEffect, useRef, useState } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import '../styles/Map.css';

const Map = () => {
  const mapRef = useRef(null);
  const [response, setResponse] = useState('');
  const [directionsDuration, setDirectionsDuration] = useState('');
  const [directionsDistance, setDirectionsDistance] = useState('');
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [trafficLayer, setTrafficLayer] = useState(null);
  const [showTraffic, setShowTraffic] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBEvd7_wH6EBGHYts6-vi0OQDeGBfgBsq4&libraries=places&callback=initMap`;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 8,
        center: { lat: 52.5123936, lng: 13.4131204 },
        mapTypeControl: true,
        scrollwheel: true,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });
      const geocoder = new window.google.maps.Geocoder();
      const marker = new window.google.maps.Marker({
        map,
      });

      const inputText = document.createElement('input');
      inputText.type = 'text';
      inputText.placeholder = 'Enter a location';
      inputText.className = 'input-text';

      const submitButton = document.createElement('input');
      submitButton.type = 'button';
      submitButton.value = 'Geocode';
      submitButton.className = 'button-primary';

      const clearButton = document.createElement('input');
      clearButton.type = 'button';
      clearButton.value = 'Clear';
      clearButton.className = 'button-secondary';

      const locationButton = document.createElement('input');
      locationButton.type = 'button';
      locationButton.value = 'My Location';
      locationButton.className = 'button-primary';

      const directionsButton = document.createElement('input');
      directionsButton.type = 'button';
      directionsButton.value = 'Directions';
      directionsButton.className = 'button-primary';

      const trafficButton = document.createElement('input');
      trafficButton.type = 'button';
      trafficButton.value = showTraffic ? 'Hide Traffic' : 'Show Traffic';
      trafficButton.className = 'button-primary';

      const instructionsElement = document.createElement('p');
      instructionsElement.id = 'instructions';
      instructionsElement.innerHTML =
        '<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.';

      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputText);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(submitButton);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(clearButton);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(locationButton);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(directionsButton);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(trafficButton);

      map.addListener('click', (e) => {
        geocode({ location: e.latLng });
      });

      submitButton.addEventListener('click', () => {
        geocode({ address: inputText.value });
      });

      clearButton.addEventListener('click', clear);

      locationButton.addEventListener('click', getUserLocation);

      directionsButton.addEventListener('click', getDirections);

      trafficButton.addEventListener('click', toggleTraffic);

      function clear() {
        marker.setMap(null);
        if (directionsRenderer) {
          directionsRenderer.setMap(null);
        }
        setResponse('');
        setDirectionsDuration('');
        setDirectionsDistance('');
      }

      function geocode(request) {
        clear();
        geocoder
          .geocode(request)
          .then((result) => {
            const { results } = result;

            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
            marker.setMap(map);
            setResponse(JSON.stringify(result, null, 2));
            return results;
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
              const directionsService = new window.google.maps.DirectionsService();
              const directionsRenderer = new window.google.maps.DirectionsRenderer();

              directionsRenderer.setMap(map);
              setDirectionsRenderer(directionsRenderer);

              const start = new window.google.maps.LatLng(latitude, longitude);
              const end = marker.getPosition();

              const request = {
                origin: start,
                destination: end,
                travelMode: window.google.maps.TravelMode.DRIVING, // Default travel mode
                unitSystem: window.google.maps.UnitSystem.METRIC,
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

              directionsService.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  directionsRenderer.setDirections(result);
                  const route = result.routes[0];
                  const leg = route.legs[0];
                  setDirectionsDuration(leg.duration.text);

                  // Calculate and set the distance
                  const distance = leg.distance.text;
                  setDirectionsDistance(distance);

                  // Create a distance marker and display it on the map
                  const distanceMarker = new window.google.maps.Marker({
                    position: end,
                    map: map,
                    label: distance,
                  });

                  // Add click event listener to the distance marker
                  distanceMarker.addListener('click', () => {
                    // Show an info window with the distance information
                    const infoWindow = new window.google.maps.InfoWindow({
                      content: `<div><strong>Distance:</strong> ${distance}</div>`,
                    });
                    infoWindow.open(map, distanceMarker);
                  });
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

      function toggleTraffic() {
        if (trafficLayer) {
          trafficLayer.setMap(showTraffic ? null : map);
        } else {
          const newTrafficLayer = new window.google.maps.TrafficLayer();
          newTrafficLayer.setMap(showTraffic ? map : null);
          setTrafficLayer(newTrafficLayer);
        }
        setShowTraffic(!showTraffic);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box marginTop="4rem">
      <Box ref={mapRef} height="500px" width="1000px" marginBottom="2rem" />
      <Flex justifyContent="center">
        <Box
          backgroundColor="white"
          padding="5rem"
          borderRadius="md"
          boxShadow="md"
          height="300px"
          maxWidth="400px"
          overflowY="auto"
          color="black"
          marginRight="2rem"
        >
          <Text fontWeight="bold" marginBottom="1rem">
            Response:
          </Text>
          <Text fontSize="15px" as="pre" whiteSpace="pre-wrap">
            {response}
          </Text>
        </Box>
        <Box
          backgroundColor="white"
          padding="5rem"
          borderRadius="md"
          boxShadow="md"
          height="300px"
          maxWidth="400px"
          overflowY="auto"
          color="black"
        >
          <Text fontWeight="bold" marginBottom="1rem">
            Directions:
          </Text>
          <Text>Duration: {directionsDuration}</Text>
          <Text>Distance: {directionsDistance}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Map;



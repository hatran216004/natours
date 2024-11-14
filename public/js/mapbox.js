/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaGF0cmFuMjMxMDA0IiwiYSI6ImNtMHo0NDVkdjAyMTIybHM0Y3dqaWJyb3gifQ.CkMPJKCsWk14wQzBUDlFFw';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/hatran231004/cm0z4be9001a901pmbdfr8by8',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const ele = document.createElement('div');
    ele.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: ele,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add pop-up
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include curr location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

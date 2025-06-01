const axios = require("axios");

async function getRoutesFromOSRM(source, destination) {
  const url = `http://router.project-osrm.org/route/v1/driving/${source.lon},${source.lat};${destination.lon},${destination.lat}?overview=full&geometries=geojson`;

  try {
    const response = await axios.get(url);
    return response.data.routes[0];
  } catch (error) {
    console.error("Error fetching route from OSRM:", error.message);
    throw new Error("Failed to fetch route");
  }
}

async function getChargersNearby(lat, lon) {
  try {
    const response = await axios.get(
      `https://api.openchargemap.io/v3/poi/`, {
        params: {
          output: "json",
          latitude: lat,
          longitude: lon,
          maxresults: 10,
          distance: 10,
          distanceunit: "KM",
          compact: true,
          verbose: false,
          key: process.env.CHARGEMAP_API_KEY || ""  // optional
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching charging stations:", error.message);
    throw new Error("Failed to fetch chargers nearby");
  }
}

module.exports = {
  getRoutesFromOSRM,
  getChargersNearby,
};

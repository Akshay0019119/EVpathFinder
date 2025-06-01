const { getChargersNearby } = require("../utils/apiHelpers");


const getRouteWithChargers = async (req, res) => {
  try {
    const {
      "source[lat]": sourceLat,
      "source[lon]": sourceLon,
      "destination[lat]": destLat,
      "destination[lon]": destLon,
    } = req.query;

    if (!sourceLat || !sourceLon || !destLat || !destLon) {
      return res.status(400).json({ message: "Missing coordinates" });
    }

    const chargersNearSource = await getChargersNearby(sourceLat, sourceLon);
    const chargersNearDest = await getChargersNearby(destLat, destLon);

    // Function to simplify each charger station
    const simplifyStation = (station) => ({
      id: station.ID,
      name: station.AddressInfo?.Title || "Unknown",
      address: station.AddressInfo?.AddressLine1 || "",
      town: station.AddressInfo?.Town || "",
      state: station.AddressInfo?.StateOrProvince || "",
      lat: station.AddressInfo?.Latitude,
      lon: station.AddressInfo?.Longitude,
      usageCost: station.UsageCost || "N/A",
      powerKW: station.Connections?.[0]?.PowerKW || "N/A",
      status: station.StatusTypeID,
    });

    const simplifiedChargers = [
      ...chargersNearSource.map(simplifyStation),
      ...chargersNearDest.map(simplifyStation),
    ];

    res.json({
      source: { lat: sourceLat, lon: sourceLon },
      destination: { lat: destLat, lon: destLon },
      chargerStations: simplifiedChargers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getRouteWithChargers };


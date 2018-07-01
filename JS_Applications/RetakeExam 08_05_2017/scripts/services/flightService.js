let flights = (() => {
  function getAllFlights() {
    const endpoint = 'flights?query={"isPublished": true}';

    return remote.get('appdata', endpoint, 'kinvey');
  }

  function createFlight (
    destination, origin, departureDate, departureTime, seats, cost, image, isPublished) {
    let data = {
      destination,
      origin,
      departureDate,
      departureTime,
      seats,
      cost,
      image,
      isPublished,
    };

    return remote.post('appdata', 'flights', 'kinvey', data);
  }

  function editFlight (
    flight_id, destination, origin, departureDate, departureTime, seats, cost, image,
    isPublished) {
    const endpoint = `flights/${flight_id}`;
    let data = {
      destination,
      origin,
      departureDate,
      departureTime,
      seats,
      cost,
      image,
      isPublished,
    };

    return remote.update('appdata', endpoint, 'kinvey', data);
  }

  function deleteFlight (flight_id) {
    const endpoint = `flights/${flight_id}`;

    return remote.remove('appdata', endpoint, 'kinvey');
  }

  function getMyFlights (user_id) {
    const endpoint = `flights?query={"_acl.creator":"${user_id}"}`;

    return remote.get('appdata', endpoint, 'kinvey');
  }

  function flightDetails (flight_id) {
    const endpoint = `flights/${flight_id}`;

    return remote.get('appdata', endpoint, 'kinvey');
  }

  return {
    getAllFlights,
    createFlight,
    editFlight,
    deleteFlight,
    getMyFlights,
    flightDetails
  };
})();
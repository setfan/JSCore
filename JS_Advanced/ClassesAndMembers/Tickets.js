function tickets (ticketsArray, sortOrder) {
  class Ticket{
    constructor (destination, price, status){
      this.destination = destination;
      this.price = Number(price);
      this.status = status;
    }
  }

  let result = [];

  for (let obj of ticketsArray) {
    let tokens = obj.split('|')

    let current = new Ticket(tokens[0].trim(), tokens[1].trim(), tokens[2].trim());

    result.push(current)
  }

  let sorter =  {
    destination: (a, b) => {
      return a.destination.localeCompare(b.destination);
    },
    price: (a, b) => {
      return a.price - b.price;
    },

    status: (a, b) => {
      return a.status.localeCompare(b.status);
    },
  }

  return result.sort((a, b) => sorter[sortOrder](a, b));
}

console.log(tickets(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
  'status'
));
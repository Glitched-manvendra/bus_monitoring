// Mock data for buses, routes, and tracking information

export const mockBuses = [
  {
    id: 'BUS001',
    number: 'KA-01-AB-1234',
    route: 'Bangalore to Mysore',
    operator: 'KSRTC',
    type: 'AC Sleeper',
    capacity: 45,
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'Near Majestic Bus Stand, Bangalore'
    },
    status: 'on-time',
    eta: '15 mins',
    nextStop: 'Electronic City',
    lastUpdated: new Date().toISOString(),
    speed: 45,
    direction: 'south'
  },
  {
    id: 'BUS002',
    number: 'KA-02-CD-5678',
    route: 'Bangalore to Chennai',
    operator: 'KSRTC',
    type: 'AC Semi-Sleeper',
    capacity: 40,
    currentLocation: {
      lat: 12.9141,
      lng: 77.5962,
      address: 'Near Silk Board, Bangalore'
    },
    status: 'delayed',
    eta: '25 mins',
    nextStop: 'Hosur',
    lastUpdated: new Date().toISOString(),
    speed: 35,
    direction: 'east'
  },
  {
    id: 'BUS003',
    number: 'KA-03-EF-9012',
    route: 'Bangalore to Hyderabad',
    operator: 'APSRTC',
    type: 'Non-AC',
    capacity: 50,
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'Near Kempegowda Bus Station'
    },
    status: 'early',
    eta: '5 mins',
    nextStop: 'Tumkur',
    lastUpdated: new Date().toISOString(),
    speed: 55,
    direction: 'north'
  },
  {
    id: 'BUS004',
    number: 'KA-04-GH-3456',
    route: 'Bangalore to Pune',
    operator: 'MSRTC',
    type: 'AC Sleeper',
    capacity: 42,
    currentLocation: {
      lat: 12.9141,
      lng: 77.5962,
      address: 'Near Hebbal Flyover'
    },
    status: 'on-time',
    eta: '18 mins',
    nextStop: 'Chitradurga',
    lastUpdated: new Date().toISOString(),
    speed: 48,
    direction: 'north-west'
  },
  {
    id: 'BUS005',
    number: 'KA-05-IJ-7890',
    route: 'Bangalore to Goa',
    operator: 'KSRTC',
    type: 'AC Multi-Axle',
    capacity: 50,
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'Near Yeshwantpur Railway Station'
    },
    status: 'cancelled',
    eta: 'N/A',
    nextStop: 'Hubli',
    lastUpdated: new Date().toISOString(),
    speed: 0,
    direction: 'west'
  }
]

export const mockRoutes = [
  {
    id: 'ROUTE001',
    name: 'Bangalore to Mysore',
    from: 'Bangalore',
    to: 'Mysore',
    distance: '150 km',
    duration: '3 hours',
    stops: [
      { name: 'Electronic City', time: '30 mins', lat: 12.8456, lng: 77.6603 },
      { name: 'Bidadi', time: '1 hour', lat: 12.8000, lng: 77.4000 },
      { name: 'Ramanagara', time: '1.5 hours', lat: 12.7167, lng: 77.2833 },
      { name: 'Channapatna', time: '2 hours', lat: 12.6500, lng: 77.2167 },
      { name: 'Mysore', time: '3 hours', lat: 12.2958, lng: 76.6394 }
    ],
    buses: ['BUS001']
  },
  {
    id: 'ROUTE002',
    name: 'Bangalore to Chennai',
    from: 'Bangalore',
    to: 'Chennai',
    distance: '350 km',
    duration: '6 hours',
    stops: [
      { name: 'Hosur', time: '1 hour', lat: 12.7400, lng: 77.8300 },
      { name: 'Krishnagiri', time: '2 hours', lat: 12.5200, lng: 78.2200 },
      { name: 'Vellore', time: '4 hours', lat: 12.9200, lng: 79.1500 },
      { name: 'Chennai', time: '6 hours', lat: 13.0827, lng: 80.2707 }
    ],
    buses: ['BUS002']
  },
  {
    id: 'ROUTE003',
    name: 'Bangalore to Hyderabad',
    from: 'Bangalore',
    to: 'Hyderabad',
    distance: '570 km',
    duration: '8 hours',
    stops: [
      { name: 'Tumkur', time: '1 hour', lat: 13.3400, lng: 77.1000 },
      { name: 'Chitradurga', time: '2.5 hours', lat: 14.2300, lng: 76.4000 },
      { name: 'Hospet', time: '4 hours', lat: 15.2700, lng: 76.4000 },
      { name: 'Hyderabad', time: '8 hours', lat: 17.3850, lng: 78.4867 }
    ],
    buses: ['BUS003', 'BUS004']
  }
]

export const mockOperators = [
  {
    id: 'OP001',
    name: 'KSRTC',
    fullName: 'Karnataka State Road Transport Corporation',
    routes: ['ROUTE001', 'ROUTE002', 'ROUTE005'],
    buses: ['BUS001', 'BUS002', 'BUS005'],
    contact: '+91-80-2235-8888',
    email: 'info@ksrtc.in'
  },
  {
    id: 'OP002',
    name: 'APSRTC',
    fullName: 'Andhra Pradesh State Road Transport Corporation',
    routes: ['ROUTE003'],
    buses: ['BUS003'],
    contact: '+91-40-2465-4321',
    email: 'info@apsrtc.in'
  },
  {
    id: 'OP003',
    name: 'MSRTC',
    fullName: 'Maharashtra State Road Transport Corporation',
    routes: ['ROUTE004'],
    buses: ['BUS004'],
    contact: '+91-20-2612-3456',
    email: 'info@msrtc.in'
  }
]

// Helper functions
export const getBusById = (id) => mockBuses.find(bus => bus.id === id)
export const getRouteById = (id) => mockRoutes.find(route => route.id === id)
export const getOperatorById = (id) => mockOperators.find(op => op.id === id)

export const getBusesByRoute = (routeId) => {
  const route = getRouteById(routeId)
  return route ? mockBuses.filter(bus => route.buses.includes(bus.id)) : []
}

export const getBusesByOperator = (operatorId) => {
  const operator = getOperatorById(operatorId)
  return operator ? mockBuses.filter(bus => operator.buses.includes(bus.id)) : []
}

export const searchBuses = (from, to) => {
  return mockRoutes.filter(route => 
    route.from.toLowerCase().includes(from.toLowerCase()) && 
    route.to.toLowerCase().includes(to.toLowerCase())
  )
}

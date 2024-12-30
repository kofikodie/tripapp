# Trip Search and Storage API

A Node.js API that allows searching for trips between airports and storing selected trips. Built with Express, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn
- Docker and Docker Compose

## Installation

1. Create a `.env` file in the root directory with the following content:

```bash
cp .env.dist .env
```

## Docker Setup

1. Build the containers:

```bash
docker compose build
```

2. Install dependencies:

```bash
docker compose run --rm app npm install
```

## Docker Environment

The application runs in two containers:

- `app`: Node.js application
- `mongo`: MongoDB database

## Development

The application uses Docker volumes for development, enabling hot reload when you change the source code.

## Manual Testing with Postman

A Postman collection is provided for manual testing of the API endpoints:

1. Import the collection from `postman/Bizaway.postman_collection.json`

The collection includes requests for:

- Health check
- Search trips (with different sort strategies)
- Save trip
- List saved trips
- Delete trip

### Development Commands

1. Start development environment:

```bash
docker compose up
```

2. Run linter:

```bash
docker compose exec app npm run lint
```

3. Format code:

```bash
docker compose exec app npm run format
```

4. Run tests:

```bash
docker compose exec app npm test
```

## API Endpoints

### Search Trips

```http
GET /trips?origin={IATA}&destination={IATA}&sort_by={strategy}
```

- `origin`: IATA 3-letter code of origin airport
- `destination`: IATA 3-letter code of destination airport
- `sort_by`: Either 'fastest' or 'cheapest'

### Save Trip

```http
POST /save/trip
```

Request body:

```json
{
    "trip_id": "string",
    "origin": "IATA",
    "destination": "IATA",
    "cost": number,
    "duration": number,
    "type": "flight|train|car",
    "display_name": "string"
}
```

### List Saved Trips

```http
GET /save/trips
```

### Delete Trip

```http
DELETE /trip/:trip_id
```

## Supported IATA Codes

The API supports the following airports:

```
ATL, PEK, LAX, DXB, HND, ORD, LHR, PVG, CDG, DFW,
AMS, FRA, IST, CAN, JFK, SIN, DEN, ICN, BKK, SFO,
LAS, CLT, MIA, KUL, SEA, MUC, EWR, MAD, HKG, MCO,
PHX, IAH, SYD, MEL, GRU, YYZ, LGW, BCN, MAN, BOM,
DEL, ZRH, SVO, DME, JNB, ARN, OSL, CPH, HEL, VIE
```

## Project Structure

```
src/
├── app.ts               # Express application setup
├── domain/              # Business logic
│   ├── constants/       # Application constants
│   ├── validator/       # Validation logic
│   └── configurator/    # Business logic configuration
├── driven/              # External services adapters
│   ├── adapters/        # Implementation of external services
│   └── ports/           # Interfaces for adapters
├── driving/             # API interfaces
│   └── ports/           # API interfaces definitions
└── utils/               # Utility functions and services
```

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Successful GET request
- 201: Successful POST request
- 400: Invalid request parameters
- 500: Server error

## License

This project is licensed under the ISC License.

## Future Improvements

### Caching Layer

- Implement Redis caching for trip searches to reduce API calls
- Cache frequently requested routes
- Set appropriate TTL (Time To Live) for cached results
- Implement cache invalidation strategy

### Testing

- Add integration tests with real MongoDB instance

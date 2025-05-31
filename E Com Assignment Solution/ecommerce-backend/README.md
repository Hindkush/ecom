# E-commerce Backend API

## Tech Stack
- Node.js
- Sequelize ORM
- PostgreSQL (Docker)

## Setup
- `docker-compose up`
- `npx sequelize-cli db:migrate`
- `npx sequelize-cli db:seed:all`
- `npm start`

## API Endpoints

### Products
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`
- GET `/api/products`
- GET `/api/products/:id`

### Orders
- POST `/api/orders`

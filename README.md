
| <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/4e36921e759278e83f2e6775e0fb78ba76131eec/icons/nodedotjs.svg" alt="Node.js" width="150" height="150"> | <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/4e36921e759278e83f2e6775e0fb78ba76131eec/icons/mongodb.svg" alt="MongoDB" width="150" height="150"> | <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/4e36921e759278e83f2e6775e0fb78ba76131eec/icons/docker.svg" alt="Docker" width="150" height="150"> | <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/4e36921e759278e83f2e6775e0fb78ba76131eec/icons/jest.svg" alt="Jest" width="150" height="150"> | <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/4e36921e759278e83f2e6775e0fb78ba76131eec/icons/jsonwebtokens.svg" alt="JWT" width="150" height="150"> |
| --- | --- | --- | --- | --- |

# revel
This API provides endpoints for managing users and products.

## Prerequisites

- Docker: Install Docker from the official website [https://www.docker.com](https://www.docker.com)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/falbarp/revel/
   ```
2. Navigate to the project directory:

   ```bash
   cd revel
   ```
3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables in the `.env` file:

   ```makefile
    PORT=3000
    DB_URL=your_mongo_db
    JWT_SECRET=secretkey
    NODE_ENV=development
   ```
    Note: Make sure to replace the values with your desired configuration.

4. Start the API using Docker Compose:
```bash
docker-compose up -d
```
This command will build the Docker containers and start the API. The API will be available at `http://localhost:3000.
   
## API Endpoints

### Users
- **POST /api/signup**: Create a new user.
- **POST /api/login**: Login. User obtains a token
  
- **GET /api/users/**: Get a list of user.
- **GET /api/users/:id**: Get a specific user.
- **PUT /api/users/:id**: Update a specific user.
- **POST /api/users/roles/:id**: Update user role
- **DELETE /api/users/:id**: Delete a specific user.
  
### Products
- **POST /api/products**: Create a new product.
- **GET /api/products**: Get a list of products.
- **GET /api/products/:id**: Get a specific product.
- **GET /api/products/search?params**:Search products for name, description...
- **PUT /api/products/:id**: Update a specific product.
- **DELETE /api/products/:id**: Delete a specific product.

### Dev
- **POST /api/seed**: Full fill database

## Search Products

### Request
Method: `GET`
Endpoint: /api/products/search
Query Parameters:
  `name` (optional): The search query for the product name.
  `description` (optional): The search query for the product description.
  `category` (optional): The category of the products.
  `price` (optional): The maximum price of the products.

### Response
Status Code: `200 OK`
Content: JSON object with an array of matching products.
products: An array containing the matching products.

### Example
**Request:**
```sql
GET /api/products/search?name=apple&category=Electronics&price=100
```
**Response:**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Apple iPhone X",
      "description": "The latest iPhone model with advanced features.",
      "category": "Electronics",
      "price": 89.99
    },
    {
      "id": "2",
      "name": "Apple MacBook Air",
      "description": "A lightweight and powerful laptop from Apple.",
      "category": "Electronics",
      "price": 99.99
    }
  ]
}
```
This example demonstrates a search for products with the word "apple" in their name, belonging to the "Electronics" category, and with a price less than or equal to $100. The response contains an array of two products that match the search criteria.

You can customize the query parameters as needed to search for products based on different criteria.


Search for products based on specific criteria.

##Authentication

API endpoints require authentication using JSON Web Tokens (JWT). To access these endpoints, include the JWT token given in login payload in the Authorization header of your requests:
```makefile
Authorization: Bearer <jwt_token>
```
Make sure to replace <jwt_token> with a valid token obtained through the authentication process.

## HTTPS/SHL
If you need to generate and a self-signed certificate pen your terminal or git bash and run the following command:
```bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

## Error Handling
If an error occurs, the API will return an appropriate HTTP status code and a JSON response with an `error property containing an error message.

## TODO
- Better testing coverage
- Results pagination
- Improve search (Ex. prince range)
  ...

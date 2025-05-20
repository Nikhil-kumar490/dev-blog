# DevBlog — Docker Setup

## Run full stack

`ash
docker-compose up --build
`

- Frontend: http://localhost:5174
- API: http://localhost:4000

## Register a user

`ash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"nikhil","email":"1259nikhil@gmail.com","password":"secret123"}'
`

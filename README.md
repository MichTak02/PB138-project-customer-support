# Pb138 Project

### Backend

Start by installing dependencies:
```bash
cd backend
npm install
```

Then run database:
```bash
./database.sh
```

Other useful commands:
```
# Prisma migration
npx prisma migrate dev --name 'NAME_OF_MY_MIGRATION'

# Prisma studio - look into the running database
npx prisma studio

# Docker commands (when using podman, just change docker -> podman)
docker stop pb138-iteration-03-database # stopping the db
```

### Frontend

Start again by installing the dependencies:

```bash
cd ../frontend
npm install
```
And then run frontend by,

```bash
npm run dev
```


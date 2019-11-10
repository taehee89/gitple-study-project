# Gitple study - Server App

## Technology Stack
 - based
   - Typescript
 - server
   - Node.js
   - Express
   - mongooose
   - Redis
   - node-restful
   - passport-jwt
   - lodash

## Project Structure
```bash
───server/
   ├── src/
   │   ├── js/
   │   │   ├── auth.ts
   │   │   ├── authToken.ts
   │   │   ├── db.ts
   │   │   └── passport.ts
   │   ├── routes/
   │   │   ├── contents.ts
   │   │   ├── keyword.ts
   │   │   └── signup.ts
   │   └── app.ts
   ├── .env
   ├── package.json
   ├── README.md
   └── tsconfig.json
```

## Install
```bash
# package install
yarn
```

## Run
```bash
# server dev run
yarn dev

# run server after build
yarn start
```

## Build
```bash
# build
yarn build
```
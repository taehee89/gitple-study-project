# Gitple study - Client App

## Technology Stack
 - based
   - Typescript
 - client
   - Angular 4
   - Bootstrap 4
   - jQuery

## Project Structure
```bash
───client/
   ├── e2e/
   │   ├── app.e2e-spec.ts
   │   ├── app.po.ts
   │   └── tsconfig.e2e.json
   ├── src/
   │   ├── app/
   │   │   ├── content-list/
   │   │   │   ├── content-list.component.html
   │   │   │   ├── content-list.component.scss
   │   │   │   └── content-list.component.ts
   │   │   ├── content-write/
   │   │   │   ├── content-write.component.html
   │   │   │   ├── content-write.component.scss
   │   │   │   └── content-write.component.ts
   │   │   ├── sign-in/
   │   │   │   ├── sign-in.component.html
   │   │   │   ├── sign-in.component.scss
   │   │   │   └── sign-in.component.ts
   │   │   ├── sign-up/
   │   │   │   ├── sign-up.component.html
   │   │   │   ├── sign-up.component.scss
   │   │   │   └── sign-up.component.ts
   │   │   ├── app.component.html
   │   │   ├── app.component.scss
   │   │   ├── app.component.spec.ts
   │   │   ├── app.component.ts
   │   │   └── app.module.ts
   │   ├── assets/
   │   │   └── .gitkeep
   │   ├── environments/
   │   │   ├── environment.prod.ts
   │   │   └── environment.ts
   │   ├── favicon.ico
   │   ├── index.html
   │   ├── main.ts
   │   ├── polyfills.ts
   │   ├── styles.scss
   │   ├── test.ts
   │   ├── tsconfig.app.json
   │   ├── tsconfig.spec.json
   │   └── typings.d.ts
   ├── .angular-cli.json
   ├── .editorconfig
   ├── karma.conf.js
   ├── package.json
   ├── protractor.conf.js
   ├── README.md
   ├── tsconfig.json
   └── tslint.json
```

## Page Flow
- sign in -> content list
- sign up -> sign in
- content list -> content write

## Install
```bash
# package install
yarn
```

## Run
```bash
# client dev run
yarn start
```

## Build
```bash
# build
yarn build
```
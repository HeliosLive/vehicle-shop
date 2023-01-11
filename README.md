# Vehicle Shop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Demo

[Demo](https://vehicle-shop.netlify.app) is running on netlify right now.

> ![preview](https://res.cloudinary.com/dlth9ls92/image/upload/v1673441068/demo-vehicle-shop.gif)

## Api

I've used mock vehicles data inside `assets/data` folder via `vehicle.data.json` file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build:prod` to build the project. The build artifacts will be stored in the `dist/vehicle-shop` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io).

> I've used [spectator](https://ngneat.github.io/spectator) tool to help me get rid of all the boilerplate grunt work, leaving you with readable, sleek and streamlined unit tests.

## Coverage unit tests

- Create a folder called coverage/sonarqube-report inside the directory (src,node_modules and coverage folders should be in the same directory)
- Run `npm run test:coverage` to execute the unit tests and collect the coverage from it.
  > It is 100% right now :)
  > ![Demo](https://res.cloudinary.com/dlth9ls92/image/upload/v1673434944/unit-test-coverage.png)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## App features

- Displaying available vehicle types, brands and colors to checkout.
- Filter out the vehicle by selecting any property on dropdown.
- Delightful animation to force you to buy one of them at least :P
- Dark mode is supported :) Just switch your device theme and see the result.

## Prerequisites

- Install [Node.js®](https://nodejs.org/en/download) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```bash
node -v
```

```bash
npm -v
```

- Install Angular cli

```bash
npm install -g @angular/cli
```

- Clone the repository into your environment

- Go to that directory via terminal ( cd /go/to/app/vehicle-shop )

- Install node packages

```bash
npm install
```

## Deploy on Netlify

- Go to [Netlify](https://app.netlify.com) and after signed in create a new personal app.

- If you have a repository already which we do have right now, just choose the **connect via** option while creating.

- Generate a file under the repository called `netlify.toml` includes:

```toml
[build]
  publish = "dist/vehicle-shop"
  command = "npm run build:prod"
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

# End User Guide

- After you open the website you will be welcomed with the home page directly and see a form includes dropdowns and buttons.
- It is a filter for you to choose your desired vehicle easily instead of listing all of the items **individually**.
- Once you fill all the **filters** in the form, you can submit and redirect to the **summary page** to see your final choice.
- Just to be sure, if you type a wrong path, do not worry we redirect you to the error page
  and you will find a button to route you to the home page.
- In addition, without submitting the form, only thing you can see in the summary page is a redirect button to **home**.

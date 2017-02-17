# Sample app for listing Sepulsa Vouchers

## How to Run

### Clone this repo
```
git clone https://github.com/azulkipli/drupal-headless-react.git
```

### Install json-server
For REST API Mockup this app use https://www.npmjs.com/package/json-server
So install it globally.
```
npm install -g json-server
```

### Run json-server
```
# CWD path_to/drupal-headless-react
json-server --watch mockup.json   
```

### Create .env files contains these variables
```
# CWD path_to/drupal-headless-react
PORT=5000
ENV=development
HTTPS=false
```

### Run the app in development mode
```
yarn start
```

## References
1. https://github.com/facebookincubator/create-react-app
2. https://ant.design/docs/react/use-with-create-react-app

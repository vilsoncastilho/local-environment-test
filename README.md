# mavarick-test-vilson

## 🚀 Getting started

Clone this repository in your computer;<br />
Create a '.env' archive following the '.env.example' and configure it;<br />
Run the following command in your terminal inside the project folder to download all the dependecies of the project; <br />

`npm install` or `yarn`;

And then run the following command to start the server in the development environment;<br />

`npm run dev:server` or `yarn dev:server`;

To access the project you will send your requests to `http://localhost:CONFIGURATED_PORT`.

(OBS1: If the PORT was not configated it will be set '3333' as default)
(OBS2: Fill the Database data in the '.env' following the PDF test data)

## ⚡️ Routes

To starting use the api you need a API client tool such as Insomnia or Postman;<br />
Create a Request and copy/paste the route that you want.

If you prefer, you can use your own browser, if you do, I recomment install the JSON Viewer extension.

### Route 1

As requested in Task 1 of the test, it is a GET request that return the 'utilization' data of the machine;

Route: `http://localhost:CONFIGURATED_PORT/api/aggregate?machine=moulding_geiss2&`

(OBS: I add the option of return the utilization acording with date range filter)

Query Parameters:
* `start_time` = get the data from (2023-04-04),
* `end_time` = get the data until (2023-04-05).

### Route 2

And the other one is requested in Task 2 of the test, it is a GET request that return all the data from the Database and add some filters;

Route: `http://localhost:CONFIGURATED_PORT/api/state_change?`

Optional query parameters:
* `machine` = machine name,
* `status` = machine status (operational | non_operational),
* `start_time` = get the data from (2023-04-04),
* `end_time` = get the data until (2023-04-05),
* `order` = ordenation (asc | desc),
* `page_size` = number of register per page,
* `page` = page number.

(OBS: I already seted default values to `order`, `page_size` and `page`, but you can change if you want)

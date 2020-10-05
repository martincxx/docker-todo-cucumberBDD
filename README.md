### Testing a React todo app with Webdriverio-v6 and Cucumber

Built upon Amiya Pattnaik's [webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD) amazing boilerplate.

Which is usually the standard way of learning a new frontend framework? Building a **Todo App**. So this repository contains the implementation of automated test for a simple todo App built with [React](https://reactjs.org/). WebdriverIO-v6 (Selenium - Node.js/JavaScript) allows us to demonstrate how to use the tool and develop an automation suite using the Cucumber (v6.x) BDD framework. It uses the `chromedriver` NPM package that wraps the ChromeDriver for you. This service does not require a Selenium server, but uses ChromeDriver to communicate with the browser directly.

It support ES5 to ES8 (via babel-register) and uses Grunt to manage tasks, provides utilities to read data from MS-Excel, executes SQL statements to any database for end to end testing. It generate Spec, JUNIT, Allure, JSON reporters as well.

### Installation

This project is tested on **Node v12.0.0** and above. While earlier versions of node may be compatible, but they have not been verified.

`Node.JS:` Install from the site - https://nodejs.org/en/ take the LTS version based on your Operating system. Please make sure you install NodeJS globally. To take full advantage of the command line and use grunt tasks you will need to make sure that you have added `node_modules/.bin` to your `$PATH`. Otherwise you will need to install `npm install -g grunt-cli` globally.

`JDK 1.8:` It is optional, install JDK 1.8+ and make sure class path is set properly. JAVA is require to start `Selenium Server` on your local environment nothing else.

### Selenium, Appium

To run your test you must have selenium / Appium server up and running to execute any webdriverIO tests, or it will fail fast with an error. To start selenium automatically it has been added as part of `services: ['selenium-standalone']` and `services: ['appium']` in the \*.conf.js. That's all there is to it.!.

### Run Some Sample Tests

To execute the entire test suite in local development, you can use any one of the options mentioned below

Option 1: `npm run test-local`. You can also run in SauceLabs and BrowserStack using `npm run test-sauce`, `npm run test-browserstack`.

Option 2: `grunt webdriver:test-local`. This executes all features in the [`./test/features/*.feature`] directory.
The default option for Grunt run is `webdriver:test-local`. But you can use `webdriver:test-sauce` or `test-browserstack` based on your requirements.

During development you may want to execute only just one feature. If that is the case, it can be achieved by using tag expressions. For example, if you want to execute only the _useFilters_ feature you should run `npm run test-local -- --cucumberOpts.tagExpression="@Filters"` . For further details see https://cucumber.io/docs/cucumber/api/#running-a-subset-of-scenarios

To execute tests on `mobile device` use : `npm run test-mobile`.

Note: Before running mobile tests, perform the requisite Appium setup. For hassle free Appium setup on OSX refer [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX), for Android please check [here](https://atasteofdottech.wordpress.com/2019/11/12/the-appium-boilerplate/) OR refer [Appium Docs](http://appium.io/docs/en/about-appium/getting-started/?lang=en)

### Config Files

WebdriverIO uses configuration files to setup and execute tests in specific ways. The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite. Config files can be found in the `/test/config/` directory and all end with `*.conf.js`. These can be called via the the cli.

### SauceLabs/BrowserStack Integration

`SauceLabs` and `BrowserStack` specific code has been added in the `wdio.sauce.conf.js` and `wdio.browserstack.conf.js` under the /test/config folder. You just need to provide your SauceLabs/BrowserStack credentials in the config file. To run test on SauceLabs, execute command `npm run test-sauce` and on BrowserStack `npm run test-browserstack`.

### Logs

Complete set of execution `logs` will be generated during the run time and can be found in the parent folder location /logs.

### Reporters

WebdriverIO uses several different types of test reporters to communicate pass/failure.

##### Dot

To use the dot reporter just add 'dot' to the reporters array in the config file. The dot reporter prints for each test spec a dot. If colors are enabled on your machine you will see three different colors for dots. Yellow dots mean that at least one browser has executed that spec. A green dot means all browser passed that spec and a red to means that at least one browser failed that spec. All config files have this turned on by default.

##### Spec

Test reporter, that prints detailed results to console.

##### Allure

The Allure Reporter creates [Allure](http://allure.qatools.ru/) test reports which is an HTML generated website with all necessary information to debug your test results and take a look on error screenshots. Add allure to the reporters array in config file and define the output directory of the allure reports.

To generate and view an allure report locally, run `npm run allure-report`. A typical Allure report will look like this

![ScreenShot](https://github.com/allure-framework/allure2/blob/master/.github/readme-img.png)

Allure has several other reporting tools optimized for the CI server of your choice. You can [view the documentation here](http://wiki.qatools.ru/display/AL/Reporting).

##### junit/xunit

The JUnit reporter helps you to create xml reports for your CI server. Add it to the reports array in the config file and define the directory where the xml files should get stored. webdriverIO will create an xml file for each instance under test and the filename will contain the browser and OS.

To generate and view an junit/xunit report locally, run `npm run junit-report`. A typical junit/xunit report will look like this

![ScreenShot](https://github.com/amiya-pattnaik/snapshots/blob/master/junit-result.png)

##### JSON

The JSON reporter is especially versatile. Since it produces a literal in a key : value pair, help to read, translate execution results to any custom reporter / it can be used to transport reporter events to another process and format them there, or to store the execution results back to any standard RDBMS or to NoSQL like mongodb with very minimal effort.

### Develop automation scripts (for both desktop browser and mobile browser / app)

You can write test by using Cucumber BDD framework. You can choose javascript based design pattern or ES6 based. This project is ES6 friendly (via babel-register)

Refer complete [WebdriverIO v6 API](https://webdriver.io/docs/api.html) methods to write your automation tests.

##### Using Cucumber JavaScript framework

Tests are written in the Cucumber framework using the Gherkin Syntax. More about Gherkin & Cucumber can be found at https://cucumber.io/docs/reference

Tests are place in `*.feature` files in the `/test/features/` directory. A typical test will look similar to this:

```
Feature: Performing a Yahoo Search

    As a user on the Yahoo search page
    I want to search for Selenium-Webdriver
    Because I want to learn more about it

    Background:

        Given I am on the search page

    Scenario: Performing a search operation
        When I enter "Selenium Webdriver" into the search box
        And  I click the search button
        Then I should see a list of search results

    Scenario Outline: Performing a search operation with passing test data as data table
        When I enter <searchItem> into the search box
        And  I click the search button
        Then I should see a list of search results

        Examples:
        |searchItem|
        |"Selenium Webdriver"|

```

### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath' etc.) up to date with the latest version of your code. The next challenge is to keep the code you write nice and DRY (Don't Repeat Yourself). The page object pattern helps us accomplish this in one solution. Instead of including our selectors in our step definitions in cucumber, we instead place them in a `<pagename>.js` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code. When a test fails, it fails on a individual step. That step may call a selector that is no longer valid, but that selector may be used by many other steps. By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern. This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.

It is preferable to separate page objects into individual files that end with `.page.js`. These will require the basic `page.js` prototype construct / abstract class and create new objects for each individual page.

For more information on the implementation of `Page Object Design Pattern`, refer to the `/test/pageobjects` directory. A typical page class using ES6 syntax will look similar to this:

💡 If you want to use ES5 syntax, refer to the sample.page.js under util-examples.

```
class LoginPage extends Page {

    /**
    * define elements
    */

    get usernameInput()   { return $('//*[@name="username"]'); }
    get passwordInput()   { return $('//*[@name="password"]'); }
    get loginButton()     { return $('//button[contains(., "Login")]'); }
    get headerImage()     { return $('//img[@alt=\"Login\"]'); }

    /**
     * define or overwrite page methods
     */
    open () {
        super.open('login')       //this will append `login` to the baseUrl to form complete URL
        //browser.pause(3000);
    }
    /**
     * your page specific methods
     */

    login (username, password) {
      this.usernameInput.setValue(username);
      this.passwordInput.setValue(password);
      this.loginButton.click();
    }
}

export default new LoginPage()

```

### Working with DataBase

A relational database is, simply, a database that stores related information across multiple tables and allows you to query information in more than one table at the same time. Your application under test displays data from these database. So when you are actually performing automation testing it is very likely that you need to verify the data between actual (which you got it from browser) Vs expected (which you will get it from the database by executing SQL statements on database). This can be done by below statements in your code.

```
//example of connection to Oracle DataBase

var  db   = require('node-any-jdbc');

cogfig = {
  libpath: './config/drivers/oracle/ojdbc7.jar',
  drivername: 'oracle.jdbc.driver.OracleDriver',
  url:  'jdbc:oracle:thin:QA/password123@//abc-test.corp.int:1527/stage1',
  // uri: 'jdbc:oracle:thin://abc-test.corp.int:1527/stage1',
  // user: 'QA',
  // password: 'password123',
};

//example of sample select query to fetch the result set

var sql = 'SELECT * FROM emp_info where emp_id = "1001"';
db.execute(cogfig, sql, function(results){
  //console.log(results);
  //then do what ever validation you want to do with results
});

```

For trouble shooting and more information, please visit `node-any-jdbc` module which can be found [here](https://www.npmjs.com/package/node-any-jdbc)

Note: `node-any-jdbc` is NOT packaged under this project. If you need, you can install it as a separate npm module `npm install node-any-jdbc --save` and start using it right away.
You can also find sample examples under /util-examples/database-example.js

### Working with Excel File

You can use `MS-Excel / OpenOffice` Excel files and store your test data, expected data in an excel sheet. you can keep any number of excel sheets you want and use below common methods to pull data from your sheet to be use as part of testing. Please note it only support `.xlsx` file format. For more information refer to the `common-utilities.js` and `util-examples`

```
//example of pulling data from MS-Excel

var  utl  = require('../utilities/common-utilities.js');
utl.excel_getTableRow(__dirname+'/sample.xlsx', 'info', 'emp_id', '101', function(results){
  // returns only one row based on the condition
  //console.log(results);
  //console.log(results.emp_id);
});

utl.excel_getTableRows(__dirname+'/sample.xlsx', 'address', function(results){
  // returns all rows of the specified sheet
  //console.log(results[1]);
  //then do what ever validation you to do withe results
});

utl.excel_getAllSheetData(__dirname+'/sample.xlsx', function(results){
  // returns all sheets data of a excel file
  //console.log(results);
  //then do what ever validation you to do withe results
});

```

### Common utilities

Refer to the common Javascript functions that provides clean, performant methods for manipulating objects, collections, MS-Excel utilities, DataBase utilities etc. Few sample code can be found in /util-examples/

Use [Underscore.js](http://underscorejs.org/) already bundled inside the framework which provides over 100 functions that support both your favorite workaday functional helpers: map, filter, invoke — as well as more specialized goodies: function binding, javascript templating, creating quick indexes, deep equality testing, and so on.

### Contribution

Create a fork of the project into your own repository. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it.

### History

Industry is moving towards Node.js / JavaScript, Angularjs, Full-Stack world. WebdriverIO, a JavaScript binding wrapper for Selenium Webdriver, was originated by Camilo Tapia's initial Selenium project called WebdriverJS, which was the first Webdriver project on NPM. In 2014, the project was renamed WebdriverIO later on. This repository is a pre-configured version of webdriverIO meant to jump-start the process of writing new test automation or adding test automation to existing node.js applications.

### Licensing

MIT

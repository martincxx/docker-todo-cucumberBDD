const { config } = require('./wdio.shared.conf')

exports.config = {
    ...config,
    ...{
      services: [],
      capabilities: [
          {
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
              // For more information about headless Chrome see https://developers.google.com/web/updates/2017/04/headless-chrome
              args: ['--headless', '--disable-gpu', '--no-sandbox'],
            }
        },
        {
          maxInstances: 1,
          browserName: 'firefox',
          "moz:firefoxOptions": {
            // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
            args: ['-headless']
          }
        },

        // {
        //   maxInstances: 5,
        //   browserName: 'safari',
        // },

      ]
    }
}

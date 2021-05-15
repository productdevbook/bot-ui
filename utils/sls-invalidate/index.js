/**
 * Workaround for serverless-offline hot-reload. This fix leads
 * to a memory leak which should be negligible during development.
 *
 * References:
 *  - https://github.com/dherault/serverless-offline/issues/931
 *  - https://github.com/dherault/serverless-offline/pull/978
 *  - https://gist.github.com/cchamplin/c55778d4a70854a5d72bab2a8c4450fe
 */
const HandlerRunner = require('serverless-offline/dist/lambda/handler-runner').default;

class OfflineInvalidate {
  constructor(serverless) {
    this.serverless = serverless;
    this.hooks = {
      'before:offline:start:init': () => this.inject()
    };
    this.lastRunner = {};
  }

  cacheInvalidation(filePath) {
    if (require.cache[require.resolve(filePath)]) {
      delete require.cache[require.resolve(filePath)];
    }
  }

  findPrivateProperty(obj, propName) {
    const props = Object.getOwnPropertyNames(obj);
    for (const prop of props) {
      if (prop.indexOf(`_${propName}`) > 0) {
        return prop;
      }
    }
    return null;
  }

  inject() {
    const that = this;
    const oldRun = HandlerRunner.prototype.run;

    HandlerRunner.prototype.run = async function (event, context) {
      const runnerPropName = that.findPrivateProperty(this, 'runner');
      const funOptionsPropName = that.findPrivateProperty(this, 'funOptions');
      if (!runnerPropName || !funOptionsPropName) {
        return oldRun(event, context);
      }

      const funOptions = this[funOptionsPropName];
      const internalRef = funOptions.handlerPath || funOptions.handler;

      if (that.lastRunner[internalRef]) {
        await that.lastRunner[internalRef].cleanup();
      }

      that.cacheInvalidation(internalRef);

      const runnerInstance = (this[runnerPropName] = await this._loadRunner());

      that.lastRunner[internalRef] = runnerInstance;

      return runnerInstance.run(event, context);
    };
  }
}

module.exports = OfflineInvalidate;

// Generated by CoffeeScript 1.6.3
var Response,
  __slice = [].slice;

var Response = function Response(robot, message, match) {
  this.robot = robot;
  this.message = message;
  this.match = match;
  this.envelope = {
    user: this.message.user,
    message: this.message
  };
}

Response.prototype.send = function() {
  var strings;
  strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return this.runWithMiddleware.apply(this, ["send", {
    plaintext: true
  }].concat(__slice.call(strings)));
};

Response.prototype.emote = function() {
  var strings;
  strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return this.runWithMiddleware.apply(this, ["emote", {
    plaintext: true
  }].concat(__slice.call(strings)));
};

Response.prototype.reply = function() {
  var strings;
  strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return this.runWithMiddleware.apply(this, ["reply", {
    plaintext: true
  }].concat(__slice.call(strings)));
};

Response.prototype.topic = function() {
  var strings;
  strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return this.runWithMiddleware.apply(this, ["topic", {
    plaintext: true
  }].concat(__slice.call(strings)));
};

Response.prototype.play = function() {
  var strings;
  strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return this.runWithMiddleware.apply(this, ["play"].concat(__slice.call(strings)));
};

Response.prototype.locked = function() {
  var strings;
  strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return this.runWithMiddleware.apply(this, ["locked", {
    plaintext: true
  }].concat(__slice.call(strings)));
};

Response.prototype.runWithMiddleware = function() {
  var callback, context, copy, methodName, opts, responseMiddlewareDone, runAdapterSend, strings,
    _this = this;
  methodName = arguments[0], opts = arguments[1], strings = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
  callback = void 0;
  copy = strings.slice(0);
  if (typeof copy[copy.length - 1] === 'function') {
    callback = copy.pop();
  }
  context = {
    response: this,
    strings: copy,
    method: methodName
  };
  if (opts.plaintext != null) {
    context.plaintext = true;
  }
  responseMiddlewareDone = function() {};
  runAdapterSend = function(_, done) {
    var result, _ref;
    result = context.strings;
    if (callback != null) {
      result.push(callback);
    }
    (_ref = _this.robot.adapter)[methodName].apply(_ref, [_this.envelope].concat(__slice.call(result)));
    return done();
  };
  return this.robot.middleware.response.execute(context, runAdapterSend, responseMiddlewareDone);
};

Response.prototype.random = function(items) {
  return items[Math.floor(Math.random() * items.length)];
};

Response.prototype.finish = function() {
  return this.message.finish();
};

Response.prototype.http = function(url, options) {
  return this.robot.http(url, options);
};

module.exports = Response;

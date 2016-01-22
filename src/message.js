var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

var Message = function(user, done) {
  this.user = user;
  this.room = this.user.room;
  this.done = done != null ? done : false;
};

Message.prototype.finish = function() {
  this.done = true;
};

var TextMessage = (function(_super) {
  __extends(TextMessage, _super);

  function TextMessage(user, text, id) {
    this.user = user;
    this.text = text;
    this.id = id;
    TextMessage.__super__.constructor.call(this, this.user);
  }

  TextMessage.prototype.match = function(regex) {
    return this.text.match(regex);
  };

  TextMessage.prototype.toString = function() {
    return this.text;
  };

  return TextMessage;

})(Message);

var CatchAllMessage = (function(_super) {
  __extends(CatchAllMessage, _super);

  function CatchAllMessage(message) {
    this.message = message;
    CatchAllMessage.__super__.constructor.call(this, this.message.user);
  }

  return CatchAllMessage;

})(Message);

module.exports = {
  Message: Message,
  TextMessage: TextMessage,
  CatchAllMessage: CatchAllMessage
};


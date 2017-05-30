// Generated by CoffeeScript 1.10.0
(function() {
  var YAML, _JSON, async, call, errors, isArray, isObject, path, read, ref, ref1, subcommand;

  ref = require("fairmont"), async = ref.async, call = ref.call, read = ref.read, isObject = ref.isObject, isArray = ref.isArray;

  YAML = require("./yaml");

  errors = require("./errors");

  ref1 = process.argv.slice(2), subcommand = ref1[0], path = ref1[1];

  _JSON = {
    read: async(function*(_path) {
      var data, error, error1, error2, json;
      path = _path === "-" ? process.stdin : _path;
      try {
        json = (yield read(path));
      } catch (error1) {
        error = error1;
        errors.readingPath(error, path);
      }
      try {
        data = JSON.parse(json);
      } catch (error2) {
        error = error2;
        errors.parsingJSON(error);
      }
      return data;
    }),
    write: function(data) {
      var error, result;
      result = (function() {
        var error1;
        if (data != null) {
          if ((isObject(data)) || (isArray(data))) {
            try {
              return JSON.stringify(data, null, 2);
            } catch (error1) {
              error = error1;
              return errors.formatJSON(error);
            }
          } else {
            return data.toString();
          }
        } else {
          return "";
        }
      })();
      return console.log(result);
    }
  };

  if ((subcommand != null) && (subcommand === "read" || subcommand === "write") && (path != null)) {
    call(function*() {
      if (subcommand === "write") {
        return _JSON.write((yield YAML.read(path)));
      } else {
        return YAML.write((yield _JSON.read(path)));
      }
    });
  } else {
    console.error("yaml json: invalid arguments");
    console.error("yaml json [read|write] <path>");
    process.exit(-1);
  }

}).call(this);
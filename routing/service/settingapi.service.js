var _ = require('lodash');
var setting = require('../../database/services/setting.service');
var SettingService = function() {};


SettingService.prototype.list = function(req, res) {
  if (_.isEmpty(req.query)) {
    setting.getById(req.params.id, res, settingResponse, errorResponse);
  } else {
    setting.search(req, res, settingResponse, errorResponse);
  }

};

function settingResponse(res, settings) {
  for (var i = settings.length - 1; i >= 0; i--) {
    settings[i]._id = undefined;
    settings[i].__v = undefined;
    settings[i].feedbackId = undefined;
  }
  var response = {
    status: '0',
    settings: parse(settings)
  };

  res.json(response);
}

function parse(rawSetting) {
  var result = {
    Agent: {},
    AgentGroup: {},
    Application: {},
    Default: {}
  };

  for (var i = rawSetting.length - 1; i >= 0; i--) {
    var tmp = rawSetting[i];
    if (tmp.level) {

      //Default from Dashbaord
      if (_.isEmpty(tmp.group)) {
        result[tmp.level][tmp.name] = tmp.value;
      } else {
        result[tmp.level][tmp.group] = {};
        result[tmp.level][tmp.group][tmp.name] = tmp.value;
      }
    }

  }
  if(_.isEmpty(result.Agent)){
    result.Agent = undefined;
  }
  if(_.isEmpty(result.AgentGroup)){
    result.AgentGroup = undefined;
  }
  if(_.isEmpty(result.Default)){
    result.Default = undefined;
  }
  if(_.isEmpty(result.Application)){
    result.Application = undefined;
  }

  return result;
}

function errorResponse(res, error) {
  if (!error) {
    error = 'no data returned from the database';
  }
  var response = {
    status: '1',
    message: error
  };
  res.json(response);
}
module.exports = new SettingService();

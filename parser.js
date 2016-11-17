var fs = require('fs');
var output = module.exports = {};

output.init = function(feedbackfile) {
  var tmp = fs.readFileSync(feedbackfile, 'utf8').split('\n');
  var data = [];
  for (var i = 0; i < tmp.length; i++) {
    if (tmp[i].length != 0) {
      data[i] = parse(tmp[i]);
      delete data[i].metadata;
    }
  }
  return data;
}



function parse(rawdata) {
  var data = {
    id: '',
    userId: '',
    userName: '',
    contactCenterId: '',
    contactCenterName:'',
    timestamp: '',
    topic: '',
    text: '',
    nodePath: '',
    metadata: '',
    application: '',
    version: '',
    date: '',
    time: '',
    dom: '',
    features: '',
    settings: '',
    traces: '',
    browser: ''
  };
  var traces = {};
  var setting = {};
  var features = {};
  var browser = {};
  parseFeedback(rawdata);
  /*
    id=9b1fcad4-dea4-4bba-aacf-86f0163ceb12,
    userId=4422032f014d41968b7e52ffe891de72,
    userName=cm_admin@test.com,
    contactCenterId=834051c8-fbad-40d6-b2f7-19c87079496e,
    nodePath=/135.39.45.232,
    contactCenterName=OnPremise_Contact_Center,
    timestamp=1441307833251,
    text=VCC Dashboard Feedback,
    topic=,
    metadata={...},
    application=WWE
     */
  function parseFeedback(feedBackContent) {
    var regex = /(.*\/api\/v2\/feedbacks\s+)(.*)(\s+metadata.*)/;
    var content = feedBackContent.replace(regex, "$2");
    data.id = getFeedbackField(content, 'id');
    data.userId = getFeedbackField(content, 'userId');
    data.userName = getFeedbackField(content, 'userName');
    data.contactCenterName = getFeedbackField(content, 'contactCenterName');
    data.contactCenterId = getFeedbackField(content, 'contactCenterId');
    data.timestamp = getFeedbackField(content, 'timestamp');
    data.text = getFeedbackField(content, 'text');
    data.nodePath = getFeedbackField(content, 'nodePath');
    data.topic = getFeedbackField(content, 'topic');
    data.application = getFeedbackField(feedBackContent, 'application');
    data.metadata = JSON.parse(feedBackContent.substring(feedBackContent.indexOf('metadata=') + 'metadata='.length, feedBackContent.lastIndexOf('}, ') + 1));
    data.date = feedBackContent.substr(0, feedBackContent.indexOf(' '));
    data.time = feedBackContent.substr(data.date.length + 1, 12);
    // if (data.application == 'WWE') {
      setting = data.metadata.options;
    // } else {
    //   parseFeedbackSetting(data.metadata);
    // }

    traces = data.metadata.traces;
    features = data.metadata.features;
    browser = data.metadata.browser;
    data.version = data.metadata.version;
    data.dom = data.metadata.DOM;
    data.features = features;
    data.traces = traces;
    data.settings = setting;
  }

  function parseFeedbackSetting(metadata) {
    if (metadata.options.user != undefined) {
      parseUserSetting(metadata.options.user.settings);
    }
    if (metadata.options.contactCenter != undefined) {
      parseContactCenter(metadata.options.contactCenter.settings);
    }
    if (metadata.options.businessUnits != undefined) {
      parseBusinessUnits(metadata.options.businessUnits);
    }

  }


  function parseUserSetting(userSetting) {
    var tmp = {};

    for (var i = 0; i < userSetting.length; i++) {
      if (setting[userSetting[i].name] === undefined) {
        tmp = createNewGroup(userSetting[i]);
        tmp.levels.user = userSetting[i].settings;
        setting[userSetting[i].name] = tmp;
      } else {
        setting[userSetting[i].name].levels.user = userSetting[i].settings;
      }
    }
  }

  function parseContactCenter(contactCenter) {
    var tmp = {};

    for (var i = 0; i < contactCenter.length; i++) {
      if (setting[contactCenter[i].name] === undefined) {
        tmp = createNewGroup(contactCenter[i]);
        tmp.levels.contactCenter = contactCenter[i].settings;
        setting[contactCenter[i].name] = tmp;
      } else {
        setting[contactCenter[i].name].levels.contactCenter = contactCenter[i].settings;
      }
    }
  }

  function parseBusinessUnits(businessUnits) {
    var tmp = {};

    for (var i = 0; i < businessUnits.length; i++) {
      if (setting[businessUnits[i].name] === undefined) {
        tmp = createNewGroup(businessUnits[i]);
        tmp.levels.businessUnits = businessUnits[i].settings;
        setting[businessUnits[i].name] = tmp;
      } else {
        setting[businessUnits[i].name].levels.businessUnits = businessUnits[i].settings;
      }
    }
  }

  function createNewGroup(settingsgroup) {
    var settingsgroup = {
      name: settingsgroup.name,
      displayName: settingsgroup.displayName,
      key: settingsgroup.key,
      uri: settingsgroup.uri,
      path: settingsgroup.path,
      levels: {
        user: {},
        businessUnits: {},
        contactCenter: {}
      }
    };
    return settingsgroup;
  }

  function getFeedbackField(feedback, field) {
    var start = feedback.indexOf(field + '=') + (field + '=').length;
    var end = feedback.indexOf(',', start);
    return feedback.substring(start, end);
  }

  return data;
}

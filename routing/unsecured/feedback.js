module.exports = function(app) {
  const feedbackService = require('../service/feedbackapi.service');
  const settingService = require('../service/settingapi.service');
  const featureService = require('../service/featureapi.service');
  const traceService = require('../service/traceapi.service');

  /**
   * @api {get} /feedback
   * @apiName feedback list
   *
   * @apiSuccess {json} feedbackID list in the database
   * @apiSuccessExample {json} Success-Response:
   * {status: "0",feedbacks: ["0c5c2d58-c36d-4b5d-86ef-0d95b63d785b",
   * "9c620ca1-4891-4aba-90b2-18731c5171fd"]}
   * @apiQuery: field = "*" returns all the fields in the feedback
   *
   */
  app.get('/api/feedbacks?/', feedbackService.list);



  /**
   * @api {get} /A feedback id
   * @apiName feedback id
   *
   * @apiSuccess {json} get A required feedback id
   * @apiSuccessExample {json} Success-Response:
   * {
      status: "0",
      feedbacks: {
          feedbackId: "9c620ca1-4891-4aba-90b2-18731c5171fd",
          userId: "762a4d841c3b43caacf35171b261c279",
          userName: "SIP_5004",
          contactCenterId: "f9783ad3-b468-4968-b556-cf152f9405d0",
          timestamp: "1471446445604",
          topic: "",
          text: "12333333333333333333333333333",
          nodePath: "/135.39.45.232",
          application: "VCC-Dashboard",
          version: "8.5.201.38-d43894245461-15999",
          date: "08/17/2016",
          time: "15:07:25.604"
         }
      }
   *
   */
  app.get('/api/feedbacks/:id?', feedbackService.getById);


  /**
   * @api {get} /setting
   * @apiName setting
   *
   * @apiSuccess {json} get A required feedback id's setting
   * @apisearch search any field(level, group, key, value) ex: level=default
   * @apiSuccessExample {json} Success-Response:
      {
        status: "0",
      settings: {
        Agent: {},
        AgentGroup: {},
        Application: {},
        Default: {}
      }
    }
   *
   */
  app.get('/api/feedbacks/:id/setting?', settingService.list);



  /**
   * @api {get} /feature
   * @apiName feature
   *
   * @apiSuccess {json} get A required feedback id's features
   * @apiSuccessExample {json} Success-Response:
    {
      status: "0",
        features: [
          "api-devices-webrtc",
          "api-mobile-push-not
      ]
    }
   *
   */
  app.get('/api/feedbacks/:id/feature', featureService.list);


  /**
   * @api {get} /trace
   * @apiName trace
   *
   * @apiSuccess {json} get A required feedback id's trace
   * @apiSuccessExample {json} Success-Response:
    {
      status: "0",
      traces: [{
        timestamp: "2016-08-17 14:13:42.516",
        level: "DEBUG",
        content: {}
      }]
   *
   */
  app.get('/api/feedbacks/:id/trace?', traceService.list);
};

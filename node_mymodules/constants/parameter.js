/**
 * Created by test1 on 2015-05-23.
 */


var errorMessage   =  require('./errorMessage');

var parameterCheck = {
  checkJson : function(req,res,  name){

      var val = req.query[name];

      if(typeof val == 'undefined' || val == null || val == ''){
          res.json({"code": 110, "status": errorMessage[110]});
      }
  }
};


module.exports = parameterCheck;
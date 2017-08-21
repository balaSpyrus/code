var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var userSchema = mongoose.Schema;
var user = new userSchema({
  Account: String,
  Region: String,
  Opportunity: String,
  Status: String,
  Owner: String,
  'PO/ Probability': String,
  'Contract Type': String,
  'SOW End Date': String,
  'Digital %': String,
  'SL/DU': String,
  'Apr\'17': { type : SchemaTypes.Double },
  'May\'17': { type : SchemaTypes.Double },
  'Jun\'17': { type : SchemaTypes.Double },
  'Q1\'17': { type : SchemaTypes.Double },
  'Dig Rev Q1\'17': { type : SchemaTypes.Double },
  'July\'17': { type : SchemaTypes.Double },
  'Aug\'17': { type : SchemaTypes.Double },
  'Sep\'17': { type : SchemaTypes.Double },
  'Q2\'17': { type : SchemaTypes.Double },
  'Dig Rev Q2\'17': { type : SchemaTypes.Double },
  'Oct\'17': { type : SchemaTypes.Double },
  'Nov\'17': { type : SchemaTypes.Double },
  'Dec\'17': { type : SchemaTypes.Double },
  'Q3\'17': { type : SchemaTypes.Double },
  'Dig Rev Q3\'17': { type : SchemaTypes.Double },
  'Jan\'18': { type : SchemaTypes.Double },
  'Feb\'18': { type : SchemaTypes.Double },
  'Mar\'18': { type : SchemaTypes.Double },
  'Q4\'17': { type : SchemaTypes.Double },
  'Dig Rev Q4\'17': { type : SchemaTypes.Double },
  Remarks: String
}, {versionKey: false});

var user = mongoose.model('financeData', user);
module.exports = user;

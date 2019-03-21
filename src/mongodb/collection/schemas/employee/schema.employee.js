//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY-MODULES DEPENDENCY.                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const mongoose = require('mongoose');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { Schema } = mongoose;

const EmployeeSchema = new Schema(
  {
    name: { type: String, require: true },
    position: { type: String, require: true },
    office: { type: String, require: true },
    reg_time: { type: Date, default: Date.now },
    salary: { type: Number, require: true },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  },
);

//  ──[  EXPORT MODULE  ]────────────────────────────────────────────────────────────────
module.exports = EmployeeSchema;

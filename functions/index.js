const admin = require("firebase-admin");
const functions = require("firebase-functions");

// Import your functions from their respective files
const { aggregateTimes } = require("./aggregateTimes");
const { getPatientCount } = require("./getPatientCount");
const { updateStatusChange } = require("./updateStatusChange");

admin.initializeApp();

// Export the functions to Firebase
exports.aggregateTimes = aggregateTimes;
exports.getPatientCount = getPatientCount;
exports.updateStatusChange = updateStatusChange;

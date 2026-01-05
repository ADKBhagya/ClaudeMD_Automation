const fs = require('fs');
const path = require('path');

class TestDataLoader {
  /**
   * Load test data from a JSON file
   * @param {string} filePath - Relative path from project root
   * @returns {Object} - Parsed JSON data
   */
  static loadData(filePath) {
    try {
      const fullPath = path.resolve(__dirname, '..', filePath);
      const rawData = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      throw new Error(`Failed to load test data from ${filePath}: ${error.message}`);
    }
  }

  /**
   * Load login test data
   * @returns {Object} - Login test data
   */
  static loadLoginData() {
    return this.loadData('data/login/loginData.json');
  }

  /**
   * Load appointment board test data
   * @returns {Object} - Appointment board test data
   */
  static loadAppointmentBoardData() {
    return this.loadData('data/appointmentBoard/appointmentBoardData.json');
  }

  /**
   * Load PM board test data
   * @returns {Object} - PM board test data
   */
  static loadPMBoardData() {
    return this.loadData('data/pmBoard/pmBoardData.json');
  }

  /**
   * Load billing test data
   * @returns {Object} - Billing test data
   */
  static loadBillingData() {
    return this.loadData('data/billing/billingData.json');
  }

  /**
   * Load test cases from JSON file
   * @param {string} filePath - Relative path from project root
   * @returns {Object} - Test cases object
   */
  static loadTestCases(filePath) {
    try {
      const fullPath = path.resolve(__dirname, '..', filePath);
      const rawData = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      throw new Error(`Failed to load test cases from ${filePath}: ${error.message}`);
    }
  }

  /**
   * Load smoke test cases for a module
   * @param {string} module - Module name (e.g., 'login', 'appointmentBoard')
   * @returns {Object} - Test cases object
   */
  static loadSmokeTestCases(module) {
    return this.loadTestCases(`testcases/smoke/${module}TestCases.json`);
  }

  /**
   * Load regression test cases for a module
   * @param {string} module - Module name (e.g., 'login', 'appointmentBoard')
   * @returns {Object} - Test cases object
   */
  static loadRegressionTestCases(module) {
    return this.loadTestCases(`testcases/regression/${module}TestCases.json`);
  }

  /**
   * Get specific test data by key path
   * @param {Object} data - Test data object
   * @param {string} keyPath - Dot-separated path (e.g., 'validCredentials.username')
   * @returns {*} - Value at the specified path
   */
  static getDataByPath(data, keyPath) {
    return keyPath.split('.').reduce((obj, key) => obj?.[key], data);
  }
}

module.exports = TestDataLoader;

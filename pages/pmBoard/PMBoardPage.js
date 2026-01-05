const BasePage = require('../common/BasePage');

class PMBoardPage extends BasePage {
  constructor(page) {
    super(page);

    // Navigation
    this.pmBoardMenu = '#pmBoardMenu';
    this.pmBoardHeader = '.pm-board-header';

    // Action Buttons
    this.newPatientButton = '#newPatientBtn';
    this.refreshButton = '#refreshBtn';
    this.exportButton = '#exportBtn';
    this.printButton = '#printBtn';
    this.importButton = '#importBtn';

    // Search and Filter
    this.searchInput = '#searchPatients';
    this.searchButton = '#searchBtn';
    this.clearSearchButton = '#clearSearchBtn';
    this.advancedSearchButton = '#advancedSearchBtn';
    this.filterDropdown = '#filterDropdown';
    this.statusFilter = '#statusFilter';
    this.providerFilter = '#providerFilter';
    this.insuranceFilter = '#insuranceFilter';
    this.genderFilter = '#genderFilter';
    this.ageRangeFilter = '#ageRangeFilter';

    // Patient List
    this.patientList = '.patient-list';
    this.patientCard = '.patient-card';
    this.patientRow = '.patient-row';
    this.noPatientsMessage = '.no-patients-message';

    // Patient Form - Demographics
    this.firstNameInput = '#firstName';
    this.lastNameInput = '#lastName';
    this.dobInput = '#dateOfBirth';
    this.genderSelect = '#gender';
    this.ssnInput = '#ssn';
    this.emailInput = '#email';
    this.phoneInput = '#phone';
    this.addressInput = '#address';
    this.cityInput = '#city';
    this.stateSelect = '#state';
    this.zipCodeInput = '#zipCode';
    this.emergencyContactInput = '#emergencyContact';
    this.emergencyPhoneInput = '#emergencyPhone';

    // Insurance Information
    this.insuranceProviderInput = '#insuranceProvider';
    this.insuranceIdInput = '#insuranceId';
    this.primaryPhysicianSelect = '#primaryPhysician';

    // Medical Information
    this.diagnosisInput = '#diagnosis';
    this.medicationsTextarea = '#medications';
    this.allergiesInput = '#allergies';
    this.chronicConditionsInput = '#chronicConditions';
    this.bloodTypeSelect = '#bloodType';
    this.heightInput = '#height';
    this.weightInput = '#weight';
    this.medicalNotesTextarea = '#medicalNotes';

    // Treatment Plan
    this.planNameInput = '#planName';
    this.startDateInput = '#startDate';
    this.endDateInput = '#endDate';
    this.providerSelect = '#provider';
    this.goalsTextarea = '#goals';
    this.interventionsTextarea = '#interventions';
    this.followUpIntervalInput = '#followUpInterval';
    this.planNotesTextarea = '#planNotes';

    // Vitals
    this.bloodPressureInput = '#bloodPressure';
    this.heartRateInput = '#heartRate';
    this.temperatureInput = '#temperature';
    this.respiratoryRateInput = '#respiratoryRate';
    this.oxygenSaturationInput = '#oxygenSaturation';

    // Form Buttons
    this.saveButton = '#saveBtn';
    this.cancelButton = '#cancelBtn';
    this.updateButton = '#updateBtn';

    // Patient Actions
    this.viewPatientButton = '.view-patient-btn';
    this.editPatientButton = '.edit-patient-btn';
    this.deletePatientButton = '.delete-patient-btn';
    this.archivePatientButton = '.archive-patient-btn';
    this.activatePatientButton = '.activate-patient-btn';

    // Tabs
    this.demographicsTab = '#demographicsTab';
    this.medicalHistoryTab = '#medicalHistoryTab';
    this.appointmentsTab = '#appointmentsTab';
    this.treatmentPlansTab = '#treatmentPlansTab';
    this.documentsTab = '#documentsTab';
    this.billingTab = '#billingTab';
    this.careTeamTab = '#careTeamTab';
    this.notesTab = '#notesTab';

    // Documents
    this.uploadDocumentButton = '#uploadDocumentBtn';
    this.documentTypeSelect = '#documentType';
    this.fileInput = '#fileInput';
    this.documentList = '.document-list';
    this.downloadDocumentButton = '.download-document-btn';
    this.deleteDocumentButton = '.delete-document-btn';

    // Care Team
    this.addCareTeamMemberButton = '#addCareTeamMemberBtn';
    this.careTeamMemberSelect = '#careTeamMember';
    this.roleSelect = '#role';
    this.careTeamList = '.care-team-list';
    this.removeCareTeamMemberButton = '.remove-care-team-member-btn';

    // Modals
    this.patientModal = '#patientModal';
    this.confirmationModal = '#confirmationModal';
    this.deleteConfirmModal = '#deleteConfirmModal';
    this.confirmDeleteButton = '#confirmDeleteBtn';
    this.modalCloseButton = '.modal-close-btn';

    // Messages
    this.successMessage = '.success-message';
    this.errorMessage = '.error-message';
    this.validationError = '.validation-error';

    // Pagination
    this.paginationContainer = '.pagination';
    this.nextPageButton = '#nextPage';
    this.prevPageButton = '#prevPage';
    this.pageNumberInput = '#pageNumber';
  }

  async navigateToPMBoard() {
    await this.click(this.pmBoardMenu);
    await this.waitForSelector(this.pmBoardHeader);
  }

  async clickNewPatient() {
    await this.click(this.newPatientButton);
    await this.waitForSelector(this.patientModal);
  }

  async fillDemographics(patientData) {
    await this.fill(this.firstNameInput, patientData.firstName);
    await this.fill(this.lastNameInput, patientData.lastName);
    await this.fill(this.dobInput, patientData.dateOfBirth);
    await this.selectOption(this.genderSelect, patientData.gender);
    await this.fill(this.ssnInput, patientData.ssn);
    await this.fill(this.emailInput, patientData.email);
    await this.fill(this.phoneInput, patientData.phone);
    await this.fill(this.addressInput, patientData.address);
    await this.fill(this.cityInput, patientData.city);
    await this.selectOption(this.stateSelect, patientData.state);
    await this.fill(this.zipCodeInput, patientData.zipCode);
    await this.fill(this.emergencyContactInput, patientData.emergencyContact);
    await this.fill(this.emergencyPhoneInput, patientData.emergencyPhone);
  }

  async fillInsuranceInfo(patientData) {
    await this.fill(this.insuranceProviderInput, patientData.insuranceProvider);
    await this.fill(this.insuranceIdInput, patientData.insuranceId);
    await this.selectOption(this.primaryPhysicianSelect, patientData.primaryPhysician);
  }

  async fillMedicalRecord(medicalData) {
    await this.fill(this.diagnosisInput, medicalData.diagnosis);
    await this.fill(this.medicationsTextarea, medicalData.medications);
    await this.fill(this.allergiesInput, medicalData.allergies);
    await this.fill(this.chronicConditionsInput, medicalData.chronicConditions);
    await this.selectOption(this.bloodTypeSelect, medicalData.bloodType);
    await this.fill(this.heightInput, medicalData.height);
    await this.fill(this.weightInput, medicalData.weight);
    await this.fill(this.medicalNotesTextarea, medicalData.notes);
  }

  async fillTreatmentPlan(planData) {
    await this.fill(this.planNameInput, planData.planName);
    await this.fill(this.startDateInput, planData.startDate);
    await this.fill(this.endDateInput, planData.endDate);
    await this.selectOption(this.providerSelect, planData.provider);
    await this.fill(this.goalsTextarea, planData.goals);
    await this.fill(this.interventionsTextarea, planData.interventions);
    await this.fill(this.followUpIntervalInput, planData.followUpInterval);
    await this.fill(this.planNotesTextarea, planData.notes);
  }

  async fillVitals(vitalsData) {
    await this.fill(this.bloodPressureInput, vitalsData.bloodPressure);
    await this.fill(this.heartRateInput, vitalsData.heartRate);
    await this.fill(this.temperatureInput, vitalsData.temperature);
    await this.fill(this.respiratoryRateInput, vitalsData.respiratoryRate);
    await this.fill(this.oxygenSaturationInput, vitalsData.oxygenSaturation);
    await this.fill(this.weightInput, vitalsData.weight);
    await this.fill(this.heightInput, vitalsData.height);
  }

  async createPatient(patientData) {
    await this.clickNewPatient();
    await this.fillDemographics(patientData);
    await this.fillInsuranceInfo(patientData);
    await this.click(this.saveButton);
    await this.waitForTimeout(1000);
  }

  async searchPatient(searchTerm) {
    await this.fill(this.searchInput, searchTerm);
    await this.click(this.searchButton);
    await this.waitForTimeout(1000);
  }

  async clearSearch() {
    await this.click(this.clearSearchButton);
    await this.waitForTimeout(500);
  }

  async filterByStatus(status) {
    await this.selectOption(this.statusFilter, status);
    await this.waitForTimeout(1000);
  }

  async filterByProvider(provider) {
    await this.selectOption(this.providerFilter, provider);
    await this.waitForTimeout(1000);
  }

  async filterByInsurance(insurance) {
    await this.selectOption(this.insuranceFilter, insurance);
    await this.waitForTimeout(1000);
  }

  async filterByGender(gender) {
    await this.selectOption(this.genderFilter, gender);
    await this.waitForTimeout(1000);
  }

  async getPatientCount() {
    return await this.getElementCount(this.patientCard);
  }

  async isNoPatientsMessageVisible() {
    return await this.isVisible(this.noPatientsMessage);
  }

  async viewPatient(index = 0) {
    const viewButtons = await this.page.$$(this.viewPatientButton);
    if (viewButtons.length > index) {
      await viewButtons[index].click();
      await this.waitForTimeout(1000);
    }
  }

  async editPatient(index = 0) {
    const editButtons = await this.page.$$(this.editPatientButton);
    if (editButtons.length > index) {
      await editButtons[index].click();
      await this.waitForSelector(this.patientModal);
    }
  }

  async deletePatient(index = 0) {
    const deleteButtons = await this.page.$$(this.deletePatientButton);
    if (deleteButtons.length > index) {
      await deleteButtons[index].click();
      await this.waitForSelector(this.deleteConfirmModal);
      await this.click(this.confirmDeleteButton);
      await this.waitForTimeout(1000);
    }
  }

  async archivePatient(index = 0) {
    const archiveButtons = await this.page.$$(this.archivePatientButton);
    if (archiveButtons.length > index) {
      await archiveButtons[index].click();
      await this.waitForTimeout(1000);
    }
  }

  async activatePatient(index = 0) {
    const activateButtons = await this.page.$$(this.activatePatientButton);
    if (activateButtons.length > index) {
      await activateButtons[index].click();
      await this.waitForTimeout(1000);
    }
  }

  async clickTab(tabName) {
    const tabMap = {
      'demographics': this.demographicsTab,
      'medicalHistory': this.medicalHistoryTab,
      'appointments': this.appointmentsTab,
      'treatmentPlans': this.treatmentPlansTab,
      'documents': this.documentsTab,
      'billing': this.billingTab,
      'careTeam': this.careTeamTab,
      'notes': this.notesTab
    };

    const tabSelector = tabMap[tabName];
    if (tabSelector) {
      await this.click(tabSelector);
      await this.waitForTimeout(500);
    }
  }

  async uploadDocument(documentType, filePath) {
    await this.click(this.uploadDocumentButton);
    await this.selectOption(this.documentTypeSelect, documentType);
    await this.page.setInputFiles(this.fileInput, filePath);
    await this.waitForTimeout(1000);
  }

  async addCareTeamMember(member, role) {
    await this.click(this.addCareTeamMemberButton);
    await this.selectOption(this.careTeamMemberSelect, member);
    await this.selectOption(this.roleSelect, role);
    await this.click(this.saveButton);
    await this.waitForTimeout(1000);
  }

  async getSuccessMessage() {
    await this.waitForSelector(this.successMessage, { timeout: 5000 });
    return await this.getText(this.successMessage);
  }

  async getErrorMessage() {
    await this.waitForSelector(this.errorMessage, { timeout: 5000 });
    return await this.getText(this.errorMessage);
  }

  async getValidationError() {
    await this.waitForSelector(this.validationError, { timeout: 5000 });
    return await this.getText(this.validationError);
  }

  async refreshPatients() {
    await this.click(this.refreshButton);
    await this.waitForTimeout(1000);
  }

  async closeModal() {
    await this.click(this.modalCloseButton);
  }

  async isPMBoardHeaderVisible() {
    return await this.isVisible(this.pmBoardHeader);
  }

  async isNewPatientButtonVisible() {
    return await this.isVisible(this.newPatientButton);
  }

  async goToNextPage() {
    await this.click(this.nextPageButton);
    await this.waitForTimeout(1000);
  }

  async goToPreviousPage() {
    await this.click(this.prevPageButton);
    await this.waitForTimeout(1000);
  }
}

module.exports = PMBoardPage;

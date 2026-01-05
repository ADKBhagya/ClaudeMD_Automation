const BasePage = require('../common/BasePage');
const ChatBotPage = require('../chatbot/ChatBotPage');

class AppointmentBoardPage extends BasePage {
  constructor(page) {
    super(page);

    // Initialize ChatBotPage
    this.chatBot = new ChatBotPage(page);

    // Navigation
    this.appointmentBoardMenu = '#appointmentBoardMenu';
    this.appointmentBoardHeader = '.appointment-board-header';

    // Action Buttons
    this.newAppointmentButton = '#newAppointmentBtn';
    this.refreshButton = '#refreshBtn';
    this.exportButton = '#exportBtn';
    this.printButton = '#printBtn';

    // Search and Filter
    this.searchInput = '#searchAppointments';
    this.searchButton = '#searchBtn';
    this.clearSearchButton = '#clearSearchBtn';
    this.filterDropdown = '#filterDropdown';
    this.statusFilter = '#statusFilter';
    this.providerFilter = '#providerFilter';
    this.dateRangeFilter = '#dateRangeFilter';
    this.appointmentTypeFilter = '#appointmentTypeFilter';

    // View Options
    this.calendarView = '#calendarView';
    this.listView = '#listView';
    this.timelineView = '#timelineView';
    this.gridView = '#gridView';

    // Appointment Form Fields
    this.patientNameInput = '#patientName';
    this.patientIdInput = '#patientId';
    this.appointmentTypeSelect = '#appointmentType';
    this.providerSelect = '#provider';
    this.dateInput = '#appointmentDate';
    this.timeInput = '#appointmentTime';
    this.durationSelect = '#duration';
    this.reasonInput = '#reason';
    this.notesTextarea = '#notes';
    this.saveButton = '#saveAppointmentBtn';
    this.cancelButton = '#cancelBtn';

    // Appointment List/Grid
    this.appointmentList = '.appointment-list';
    this.appointmentCard = '.appointment-card';
    this.appointmentRow = '.appointment-row';
    this.noAppointmentsMessage = '.no-appointments-message';

    // Appointment Actions
    this.editButton = '.edit-appointment-btn';
    this.deleteButton = '.delete-appointment-btn';
    this.confirmButton = '.confirm-appointment-btn';
    this.cancelAppointmentButton = '.cancel-appointment-btn';
    this.rescheduleButton = '.reschedule-appointment-btn';

    // Modals
    this.appointmentModal = '#appointmentModal';
    this.confirmationModal = '#confirmationModal';
    this.deleteConfirmModal = '#deleteConfirmModal';
    this.confirmDeleteButton = '#confirmDeleteBtn';
    this.modalCloseButton = '.modal-close-btn';

    // Messages
    this.successMessage = '.success-message';
    this.errorMessage = '.error-message';
    this.validationError = '.validation-error';

    // Bulk Actions
    this.selectAllCheckbox = '#selectAllAppointments';
    this.appointmentCheckbox = '.appointment-checkbox';
    this.bulkActionDropdown = '#bulkActionDropdown';
    this.applyBulkActionButton = '#applyBulkActionBtn';

    // Pagination
    this.paginationContainer = '.pagination';
    this.nextPageButton = '#nextPage';
    this.prevPageButton = '#prevPage';
    this.pageNumberInput = '#pageNumber';
  }

  async navigateToAppointmentBoard() {
    // Navigate to Dashboard first
    const dashboardURL = process.env.DASHBOARD_URL;
    await this.page.goto(dashboardURL, { timeout: 60000, waitUntil: 'domcontentloaded' });
    await this.waitForTimeout(2000);

    // Close ChatBot if visible using ChatBotPage
    await this.chatBot.closeChatBot();

    // Navigate to Appointment Board
    const appointmentBoardURL = process.env.APPOINTMENT_BOARD_URL;
    await this.page.goto(appointmentBoardURL, { timeout: 60000, waitUntil: 'domcontentloaded' });
    await this.waitForTimeout(2000);
  }

  async clickNewAppointment() {
    await this.click(this.newAppointmentButton);
    await this.waitForSelector(this.appointmentModal);
  }

  async fillAppointmentForm(appointmentData) {
    await this.fill(this.patientNameInput, appointmentData.patientName);
    await this.fill(this.patientIdInput, appointmentData.patientId);
    await this.selectOption(this.appointmentTypeSelect, appointmentData.appointmentType);
    await this.selectOption(this.providerSelect, appointmentData.provider);
    await this.fill(this.dateInput, appointmentData.date);
    await this.fill(this.timeInput, appointmentData.time);
    await this.selectOption(this.durationSelect, appointmentData.duration);
    await this.fill(this.reasonInput, appointmentData.reason);
    await this.fill(this.notesTextarea, appointmentData.notes);
  }

  async createAppointment(appointmentData) {
    await this.clickNewAppointment();
    await this.fillAppointmentForm(appointmentData);
    await this.click(this.saveButton);
    await this.waitForTimeout(1000);
  }

  async searchAppointment(searchTerm) {
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

  async filterByAppointmentType(type) {
    await this.selectOption(this.appointmentTypeFilter, type);
    await this.waitForTimeout(1000);
  }

  async switchToCalendarView() {
    await this.click(this.calendarView);
    await this.waitForTimeout(500);
  }

  async switchToListView() {
    await this.click(this.listView);
    await this.waitForTimeout(500);
  }

  async getAppointmentCount() {
    return await this.getElementCount(this.appointmentCard);
  }

  async isNoAppointmentsMessageVisible() {
    return await this.isVisible(this.noAppointmentsMessage);
  }

  async editAppointment(index = 0) {
    const editButtons = await this.page.$$(this.editButton);
    if (editButtons.length > index) {
      await editButtons[index].click();
      await this.waitForSelector(this.appointmentModal);
    }
  }

  async deleteAppointment(index = 0) {
    const deleteButtons = await this.page.$$(this.deleteButton);
    if (deleteButtons.length > index) {
      await deleteButtons[index].click();
      await this.waitForSelector(this.deleteConfirmModal);
      await this.click(this.confirmDeleteButton);
      await this.waitForTimeout(1000);
    }
  }

  async confirmAppointment(index = 0) {
    const confirmButtons = await this.page.$$(this.confirmButton);
    if (confirmButtons.length > index) {
      await confirmButtons[index].click();
      await this.waitForTimeout(1000);
    }
  }

  async cancelAppointment(index = 0) {
    const cancelButtons = await this.page.$$(this.cancelAppointmentButton);
    if (cancelButtons.length > index) {
      await cancelButtons[index].click();
      await this.waitForSelector(this.confirmationModal);
      await this.click(this.confirmDeleteButton);
      await this.waitForTimeout(1000);
    }
  }

  async rescheduleAppointment(index = 0, newDate, newTime) {
    const rescheduleButtons = await this.page.$$(this.rescheduleButton);
    if (rescheduleButtons.length > index) {
      await rescheduleButtons[index].click();
      await this.waitForSelector(this.appointmentModal);
      await this.fill(this.dateInput, newDate);
      await this.fill(this.timeInput, newTime);
      await this.click(this.saveButton);
      await this.waitForTimeout(1000);
    }
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

  async selectAllAppointments() {
    await this.click(this.selectAllCheckbox);
  }

  async selectAppointment(index = 0) {
    const checkboxes = await this.page.$$(this.appointmentCheckbox);
    if (checkboxes.length > index) {
      await checkboxes[index].click();
    }
  }

  async applyBulkAction(action) {
    await this.selectOption(this.bulkActionDropdown, action);
    await this.click(this.applyBulkActionButton);
    await this.waitForTimeout(1000);
  }

  async refreshAppointments() {
    await this.click(this.refreshButton);
    await this.waitForTimeout(1000);
  }

  async closeModal() {
    await this.click(this.modalCloseButton);
  }

  async isAppointmentBoardHeaderVisible() {
    return await this.isVisible(this.appointmentBoardHeader);
  }

  async isNewAppointmentButtonVisible() {
    return await this.isVisible(this.newAppointmentButton);
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

module.exports = AppointmentBoardPage;

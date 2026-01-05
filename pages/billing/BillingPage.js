const BasePage = require('../common/BasePage');
const ChatBotPage = require('../chatbot/ChatBotPage');

class BillingPage extends BasePage {
  constructor(page) {
    super(page);

    // Initialize ChatBotPage
    this.chatBot = new ChatBotPage(page);

    // Navigation
    this.billingMenu = 'xpath=/html/body/ng-component/div/div/dashboard/div[3]/div/div/div[6]';
    this.billingHeader = '.billing-header';

    // Action Buttons
    this.newInvoiceButton = '#newInvoiceBtn';
    this.recordPaymentButton = '#recordPaymentBtn';
    this.submitClaimButton = '#submitClaimBtn';
    this.generateStatementButton = '#generateStatementBtn';
    this.refreshButton = '#refreshBtn';
    this.exportButton = '#exportBtn';
    this.printButton = '#printBtn';

    // Search and Filter
    this.searchInput = '#searchBilling';
    this.searchButton = '#searchBtn';
    this.clearSearchButton = '#clearSearchBtn';
    this.advancedSearchButton = '#advancedSearchBtn';
    this.filterDropdown = '#filterDropdown';
    this.statusFilter = '#statusFilter';
    this.paymentMethodFilter = '#paymentMethodFilter';
    this.providerFilter = '#providerFilter';
    this.dateRangeFilter = '#dateRangeFilter';
    this.amountRangeFilter = '#amountRangeFilter';

    // Invoice Form
    this.patientIdInput = '#patientId';
    this.patientNameInput = '#patientName';
    this.serviceDateInput = '#serviceDate';
    this.providerSelect = '#provider';
    this.procedureCodeInput = '#procedureCode';
    this.procedureDescInput = '#procedureDescription';
    this.diagnosisCodeInput = '#diagnosisCode';
    this.diagnosisDescInput = '#diagnosisDescription';
    this.chargeAmountInput = '#chargeAmount';
    this.insuranceCoverageInput = '#insuranceCoverage';
    this.patientResponsibilityInput = '#patientResponsibility';
    this.invoiceNotesTextarea = '#invoiceNotes';

    // Payment Form
    this.invoiceNumberInput = '#invoiceNumber';
    this.paymentAmountInput = '#paymentAmount';
    this.paymentMethodSelect = '#paymentMethod';
    this.cardNumberInput = '#cardNumber';
    this.cardHolderNameInput = '#cardHolderName';
    this.expiryDateInput = '#expiryDate';
    this.cvvInput = '#cvv';
    this.paymentDateInput = '#paymentDate';
    this.paymentNotesTextarea = '#paymentNotes';

    // Insurance Claim Form
    this.insuranceProviderInput = '#insuranceProvider';
    this.policyNumberInput = '#policyNumber';
    this.claimDateInput = '#claimDate';
    this.claimAmountInput = '#claimAmount';
    this.claimStatusSelect = '#claimStatus';

    // Payment Plan Form
    this.totalAmountInput = '#totalAmount';
    this.downPaymentInput = '#downPayment';
    this.installmentsInput = '#numberOfInstallments';
    this.installmentAmountInput = '#installmentAmount';
    this.frequencySelect = '#frequency';
    this.startDateInput = '#startDate';
    this.endDateInput = '#endDate';
    this.planNotesTextarea = '#planNotes';

    // Adjustment Form
    this.adjustmentTypeSelect = '#adjustmentType';
    this.adjustmentAmountInput = '#adjustmentAmount';
    this.adjustmentReasonInput = '#adjustmentReason';
    this.approvedByInput = '#approvedBy';

    // Refund Form
    this.refundAmountInput = '#refundAmount';
    this.refundMethodSelect = '#refundMethod';
    this.refundReasonInput = '#refundReason';

    // Form Buttons
    this.saveButton = '#saveBtn';
    this.cancelButton = '#cancelBtn';
    this.submitButton = '#submitBtn';
    this.processButton = '#processBtn';
    this.calculateButton = '#calculateBtn';

    // Invoice List/Grid
    this.invoiceList = '.invoice-list';
    this.invoiceCard = '.invoice-card';
    this.invoiceRow = '.invoice-row';
    this.noInvoicesMessage = '.no-invoices-message';

    // Invoice Actions
    this.viewInvoiceButton = '.view-invoice-btn';
    this.editInvoiceButton = '.edit-invoice-btn';
    this.deleteInvoiceButton = '.delete-invoice-btn';
    this.printInvoiceButton = '.print-invoice-btn';
    this.emailInvoiceButton = '.email-invoice-btn';
    this.voidInvoiceButton = '.void-invoice-btn';

    // Payment Actions
    this.recordPaymentBtn = '.record-payment-btn';
    this.refundPaymentBtn = '.refund-payment-btn';
    this.viewPaymentHistoryBtn = '.view-payment-history-btn';

    // Claim Actions
    this.submitClaimBtn = '.submit-claim-btn';
    this.viewClaimStatusBtn = '.view-claim-status-btn';
    this.resubmitClaimBtn = '.resubmit-claim-btn';

    // Tabs
    this.invoicesTab = '#invoicesTab';
    this.paymentsTab = '#paymentsTab';
    this.claimsTab = '#claimsTab';
    this.statementsTab = '#statementsTab';
    this.reportsTab = '#reportsTab';
    this.adjustmentsTab = '#adjustmentsTab';
    this.refundsTab = '#refundsTab';

    // Reports
    this.reportTypeSelect = '#reportType';
    this.reportDateFromInput = '#reportDateFrom';
    this.reportDateToInput = '#reportDateTo';
    this.generateReportButton = '#generateReportBtn';
    this.downloadReportButton = '#downloadReportBtn';

    // Modals
    this.invoiceModal = '#invoiceModal';
    this.paymentModal = '#paymentModal';
    this.claimModal = '#claimModal';
    this.confirmationModal = '#confirmationModal';
    this.deleteConfirmModal = '#deleteConfirmModal';
    this.confirmDeleteButton = '#confirmDeleteBtn';
    this.modalCloseButton = '.modal-close-btn';

    // Messages
    this.successMessage = '.success-message';
    this.errorMessage = '.error-message';
    this.validationError = '.validation-error';

    // Summary/Dashboard
    this.totalOutstandingAmount = '#totalOutstanding';
    this.totalPaidAmount = '#totalPaid';
    this.totalOverdueAmount = '#totalOverdue';
    this.totalClaimsAmount = '#totalClaims';

    // Pagination
    this.paginationContainer = '.pagination';
    this.nextPageButton = '#nextPage';
    this.prevPageButton = '#prevPage';
    this.pageNumberInput = '#pageNumber';
  }

  async navigateToBilling() {
    // Navigate to Dashboard first
    const dashboardURL = process.env.DASHBOARD_URL;
    await this.page.goto(dashboardURL, { timeout: 60000, waitUntil: 'domcontentloaded' });
    await this.waitForTimeout(2000);

    // Close ChatBot if visible using ChatBotPage
    await this.chatBot.closeChatBot();

    // Navigate to Billing page
    const billingURL = process.env.BILLING_URL;
    await this.page.goto(billingURL, { timeout: 60000, waitUntil: 'domcontentloaded' });
    await this.waitForTimeout(2000);
  }

  async clickNewInvoice() {
    await this.click(this.newInvoiceButton);
    await this.waitForSelector(this.invoiceModal);
  }

  async fillInvoiceForm(invoiceData) {
    await this.fill(this.patientIdInput, invoiceData.patientId);
    await this.fill(this.patientNameInput, invoiceData.patientName);
    await this.fill(this.serviceDateInput, invoiceData.serviceDate);
    await this.selectOption(this.providerSelect, invoiceData.provider);
    await this.fill(this.procedureCodeInput, invoiceData.procedureCode);
    await this.fill(this.procedureDescInput, invoiceData.procedureDescription);
    await this.fill(this.diagnosisCodeInput, invoiceData.diagnosisCode);
    await this.fill(this.diagnosisDescInput, invoiceData.diagnosisDescription);
    await this.fill(this.chargeAmountInput, invoiceData.chargeAmount);
    await this.fill(this.insuranceCoverageInput, invoiceData.insuranceCoverage);
    await this.fill(this.patientResponsibilityInput, invoiceData.patientResponsibility);
    await this.fill(this.invoiceNotesTextarea, invoiceData.notes);
  }

  async fillPaymentForm(paymentData) {
    await this.fill(this.invoiceNumberInput, paymentData.invoiceNumber);
    await this.fill(this.paymentAmountInput, paymentData.paymentAmount);
    await this.selectOption(this.paymentMethodSelect, paymentData.paymentMethod);

    if (paymentData.paymentMethod === 'Credit Card' || paymentData.paymentMethod === 'Debit Card') {
      await this.fill(this.cardNumberInput, paymentData.cardNumber);
      await this.fill(this.cardHolderNameInput, paymentData.cardHolderName);
      await this.fill(this.expiryDateInput, paymentData.expiryDate);
      await this.fill(this.cvvInput, paymentData.cvv);
    }

    await this.fill(this.paymentDateInput, paymentData.paymentDate);
    await this.fill(this.paymentNotesTextarea, paymentData.notes);
  }

  async fillClaimForm(claimData) {
    await this.fill(this.patientIdInput, claimData.patientId);
    await this.fill(this.patientNameInput, claimData.patientName);
    await this.fill(this.insuranceProviderInput, claimData.insuranceProvider);
    await this.fill(this.policyNumberInput, claimData.policyNumber);
    await this.fill(this.claimDateInput, claimData.claimDate);
    await this.fill(this.serviceDateInput, claimData.serviceDate);
    await this.selectOption(this.providerSelect, claimData.provider);
    await this.fill(this.procedureCodeInput, claimData.procedureCode);
    await this.fill(this.diagnosisCodeInput, claimData.diagnosisCode);
    await this.fill(this.claimAmountInput, claimData.claimAmount);
  }

  async fillPaymentPlanForm(planData) {
    await this.fill(this.patientIdInput, planData.patientId);
    await this.fill(this.totalAmountInput, planData.totalAmount);
    await this.fill(this.downPaymentInput, planData.downPayment);
    await this.fill(this.installmentsInput, planData.numberOfInstallments);
    await this.fill(this.installmentAmountInput, planData.installmentAmount);
    await this.selectOption(this.frequencySelect, planData.frequency);
    await this.fill(this.startDateInput, planData.startDate);
    await this.fill(this.endDateInput, planData.endDate);
    await this.fill(this.planNotesTextarea, planData.notes);
  }

  async fillAdjustmentForm(adjustmentData) {
    await this.fill(this.invoiceNumberInput, adjustmentData.invoiceNumber);
    await this.selectOption(this.adjustmentTypeSelect, adjustmentData.adjustmentType);
    await this.fill(this.adjustmentAmountInput, adjustmentData.adjustmentAmount);
    await this.fill(this.adjustmentReasonInput, adjustmentData.reason);
    await this.fill(this.approvedByInput, adjustmentData.approvedBy);
  }

  async fillRefundForm(refundData) {
    await this.fill(this.invoiceNumberInput, refundData.invoiceNumber);
    await this.fill(this.refundAmountInput, refundData.refundAmount);
    await this.selectOption(this.refundMethodSelect, refundData.refundMethod);
    await this.fill(this.refundReasonInput, refundData.reason);
    await this.fill(this.approvedByInput, refundData.approvedBy);
  }

  async createInvoice(invoiceData) {
    await this.clickNewInvoice();
    await this.fillInvoiceForm(invoiceData);
    await this.click(this.saveButton);
    await this.waitForTimeout(1000);
  }

  async recordPayment(paymentData) {
    await this.click(this.recordPaymentButton);
    await this.waitForSelector(this.paymentModal);
    await this.fillPaymentForm(paymentData);
    await this.click(this.processButton);
    await this.waitForTimeout(1000);
  }

  async submitClaim(claimData) {
    await this.click(this.submitClaimButton);
    await this.waitForSelector(this.claimModal);
    await this.fillClaimForm(claimData);
    await this.click(this.submitButton);
    await this.waitForTimeout(1000);
  }

  async searchInvoice(searchTerm) {
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

  async filterByPaymentMethod(method) {
    await this.selectOption(this.paymentMethodFilter, method);
    await this.waitForTimeout(1000);
  }

  async filterByProvider(provider) {
    await this.selectOption(this.providerFilter, provider);
    await this.waitForTimeout(1000);
  }

  async getInvoiceCount() {
    return await this.getElementCount(this.invoiceCard);
  }

  async isNoInvoicesMessageVisible() {
    return await this.isVisible(this.noInvoicesMessage);
  }

  async viewInvoice(index = 0) {
    const viewButtons = await this.page.$$(this.viewInvoiceButton);
    if (viewButtons.length > index) {
      await viewButtons[index].click();
      await this.waitForTimeout(1000);
    }
  }

  async editInvoice(index = 0) {
    const editButtons = await this.page.$$(this.editInvoiceButton);
    if (editButtons.length > index) {
      await editButtons[index].click();
      await this.waitForSelector(this.invoiceModal);
    }
  }

  async deleteInvoice(index = 0) {
    const deleteButtons = await this.page.$$(this.deleteInvoiceButton);
    if (deleteButtons.length > index) {
      await deleteButtons[index].click();
      await this.waitForSelector(this.deleteConfirmModal);
      await this.click(this.confirmDeleteButton);
      await this.waitForTimeout(1000);
    }
  }

  async voidInvoice(index = 0) {
    const voidButtons = await this.page.$$(this.voidInvoiceButton);
    if (voidButtons.length > index) {
      await voidButtons[index].click();
      await this.waitForSelector(this.confirmationModal);
      await this.click(this.confirmDeleteButton);
      await this.waitForTimeout(1000);
    }
  }

  async printInvoice(index = 0) {
    const printButtons = await this.page.$$(this.printInvoiceButton);
    if (printButtons.length > index) {
      await printButtons[index].click();
      await this.waitForTimeout(1000);
    }
  }

  async clickTab(tabName) {
    const tabMap = {
      'invoices': this.invoicesTab,
      'payments': this.paymentsTab,
      'claims': this.claimsTab,
      'statements': this.statementsTab,
      'reports': this.reportsTab,
      'adjustments': this.adjustmentsTab,
      'refunds': this.refundsTab
    };

    const tabSelector = tabMap[tabName];
    if (tabSelector) {
      await this.click(tabSelector);
      await this.waitForTimeout(500);
    }
  }

  async generateReport(reportType, dateFrom, dateTo) {
    await this.clickTab('reports');
    await this.selectOption(this.reportTypeSelect, reportType);
    await this.fill(this.reportDateFromInput, dateFrom);
    await this.fill(this.reportDateToInput, dateTo);
    await this.click(this.generateReportButton);
    await this.waitForTimeout(2000);
  }

  async downloadReport() {
    await this.click(this.downloadReportButton);
    await this.waitForTimeout(1000);
  }

  async getTotalOutstanding() {
    return await this.getText(this.totalOutstandingAmount);
  }

  async getTotalPaid() {
    return await this.getText(this.totalPaidAmount);
  }

  async getTotalOverdue() {
    return await this.getText(this.totalOverdueAmount);
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

  async refreshBilling() {
    await this.click(this.refreshButton);
    await this.waitForTimeout(1000);
  }

  async closeModal() {
    await this.click(this.modalCloseButton);
  }

  async isBillingHeaderVisible() {
    return await this.isVisible(this.billingHeader);
  }

  async isNewInvoiceButtonVisible() {
    return await this.isVisible(this.newInvoiceButton);
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

module.exports = BillingPage;

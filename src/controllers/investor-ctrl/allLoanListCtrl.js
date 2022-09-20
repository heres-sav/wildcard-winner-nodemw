/** ****************************************************************************************************************
 * Name                 :   allLoanListCtrl
 * Description          :   It is the controller for loan list related API.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/02/2022
 ***************************************************************************************************************** */

const { StatusCodes } = require("http-status-codes");
const {
  getAllLoanListApiCall,
} = require("../../services/web/api/investor-api/loanListApiCall");
const { BaseError } = require("../../services/web/errorWebService");
const responseWebService = require("../../services/web/responseWebService");
const constantUtilService = require("../../services/utils/constantUtilService");
const msgUtilService = require("../../services/utils/msgUtilService");
const helperUtilService = require("../../services/utils/helperUtilService");

/** ***************
// HELPER METHODS
 **************** */

// Generate custom loan list format.
const generateLoanListFormat = (loanList) => {
  const formatedLoanList = [];
  // Loop through the api content and create a custom list with key value pair.
  if (loanList && Array.isArray(loanList) && loanList.length > 0) {
    loanList.forEach((eachLoan) => {
      const formatedLoanObj = {};
      formatedLoanObj[constantUtilService.APP_NAME_STR] = eachLoan.Name;
      formatedLoanObj[constantUtilService.LAI_NAME_STR] =
        eachLoan.peer__Loan__r !== null
          ? eachLoan.peer__Loan__r.Name
          : constantUtilService.BLANK_STR;
      formatedLoanObj[constantUtilService.REQ_LOAN_AMT_STR] =
        eachLoan.peer__Requested_Loan_Amount__c;
      formatedLoanObj[constantUtilService.LOAN_TERM_STR] =
        eachLoan.peer__Term__c;
      formatedLoanObj[constantUtilService.PER_FUNDED_STR] =
        eachLoan.peer__Percent_Funded__c;
      formatedLoanObj[constantUtilService.LOAN_PURPOSE_STR] =
        eachLoan.peer__Loan_Purpose_1__r !== null
          ? eachLoan.peer__Loan_Purpose_1__r.Name
          : constantUtilService.BLANK_STR;
      formatedLoanObj[constantUtilService.INTEREST_RATE_STR] =
        eachLoan.peer__Interest_Rate__c;
      formatedLoanObj[constantUtilService.ADDITIONAL_INFO] =
        eachLoan.Application__r !== null &&
        eachLoan.Application__r.Tilleggsinformasjon__c
          ? eachLoan.Application__r.Tilleggsinformasjon__c
          : constantUtilService.BLANK_STR;
      formatedLoanObj[constantUtilService.CREDIT_BAND_TYPE] =
        eachLoan.peer__Credit_Band_Type__c;
      formatedLoanList.push(formatedLoanObj);
    });
  }
  return formatedLoanList;
};

/** *********
// HANDLERS
 ********** */

// GET ALL LOAN LIST API CONTROLLER.
const getAllLoanListHandler = async (req, res) => {
  // Host blank check.
  const HOST = req && req.get(constantUtilService.HOST_STR);
  if (helperUtilService.isBlankData(HOST))
    throw new BaseError(msgUtilService.SOMETHING_WENT_WRONG);

  // Call all loan list api.
  const loanListApiRes = await getAllLoanListApiCall(HOST);
  let loanList = [];
  if (
    loanListApiRes &&
    parseInt(loanListApiRes.statusCode, 10) !== StatusCodes.OK
  ) {
    // Response handle
    responseWebService.handleResponseStringified(
      res,
      helperUtilService.genApiResponse(
        false,
        loanList,
        loanListApiRes.statusCode,
        loanListApiRes.errorMessage
      )
    );
  }
  // Get custom loan list format.
  loanList = generateLoanListFormat(loanListApiRes.content);
  // Response handle
  responseWebService.handleResponseStringified(
    res,
    helperUtilService.genApiResponse(true, loanList)
  );
};

module.exports = {
  getAllLoanListHandler,
};

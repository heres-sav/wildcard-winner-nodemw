const { createOne, readAll, pushOrder, updateOrder } = require("../../services/mongodb/crudOps/_tableOps");
const { handleResponseStringified } = require("../../services/web/responseWebService");

const getTableIds = async (req, res) => {
  try {
    handleResponseStringified(res, await readAll());
  }
  catch(ex) {
    handleResponseStringified(res, ex);
  }
}

const createATable = async (req, res) => {
  try {
    handleResponseStringified(res, await createOne({
      occupied: false,
      orders: {}
    }));
  }
  catch(ex) {
    handleResponseStringified(res, ex);
  }
}

const addOrderOnTable = async (req, res) => {
  try {
    const result = await pushOrder(req.body);
    handleResponseStringified(res, result);
  }
  catch(ex) {
    handleResponseStringified(res, ex);
  }
}

const updateOrderOnTable = async (req, res) => {
  try {
    handleResponseStringified(res, await updateOrder(
      req.body
    ));
  }
  catch(ex) {
    handleResponseStringified(res, ex);
  }
}

module.exports = {
  getTableIds,
  createATable,
  addOrderOnTable,
  updateOrderOnTable
};

const workersService = require("./workers.service");
const asyncHandler = require("../../utils/asyncHandler");

const getAllWorkers = asyncHandler(async(req, res) => {

    const workers = await workersService.getAllWorkers();

    res.status(200).json({
        success: true,
        data: workers,
    });

})

const getWorkerById = asyncHandler(async(req ,res) => {

    const { id } = req.params;

    const worker = await workersService.getWorkerById(id);

    res.status(200).json({
        success: true,
        data: worker,
    });

});

module.exports = {
    getAllWorkers,
    getWorkerById
}
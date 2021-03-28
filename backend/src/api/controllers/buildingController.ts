import { Request, Response } from 'express';
import mongoose from 'mongoose';
// import Building from '../models/buildings.model';
import Sensors from '../models/sensors.model';

const getTotalEnergyBuilding = async (req: Request, res: Response) => {
  const buildingId = mongoose.Types.ObjectId(req.params.id);
  // const fromDate = req.query.from_date;
  // const toDate = req.query.to_date;

  try {
    const building = await Sensors.find({
      building: buildingId,
    });
    res.status(200).send(building);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  getTotalEnergyBuilding,
};

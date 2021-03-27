import { Request, Response } from 'express';
import Building from '../models/buildings.model';

const searchBuilding = async (req: Request, res: Response) => {
  const buildingName = req.query.name;
  try {
    const building = await Building.find({
      $text: { $search: `'${buildingName}'` },
    });
    res.status(200).send(building);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  searchBuilding,
};

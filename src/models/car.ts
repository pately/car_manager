import { connect, model, Schema, Document, set } from "mongoose";
import { logger } from '../logger';
import { getMongoConfig } from '../config';

const config = getMongoConfig();
export interface CarInterface {
  id: number;
  brand: string;
  color: string;
  model: string;
}

set('useNewUrlParser', true);
set('useFindAndModify', false);
set('useCreateIndex', true);
connect(config.uri, (err: Error) => {
  if (err) {
    logger.error(err.message);
  } else {
    logger.info('Successfully Connected to MongoDB!');
  }
});

const CarSchema: Schema = new Schema({
  id: { type: String, unique: true, index: true, required: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  model: { type: String, required: true }
});

type CarType = CarInterface & Document;

const CarModel = model<CarType>("Car", CarSchema);
export default CarModel;
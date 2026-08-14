import { model, models, Schema } from "mongoose";

const iceCubeDataSchema = new Schema({
  NAME: String,
  RUNID: Number,
  EVENTID: Number,
  START: String,
  EVENTMJD: Number,
  I3TYPE: String,
  RA: Number,
  DEC: Number,
  RA_ERR_PLUS: Number,
  RA_ERR_MINUS: Number,
  DEC_ERR_PLUS: Number,
  DEC_ERR_MINUS: Number,
  FAR: Number,
  SIGNAL: Number,
})

const Models = {
  ICECUBEDATAMODEL:
    models.ICECUBEDATAMODEL ||
    model("IceCube", iceCubeDataSchema, "IceCube"),
}

export default Models;
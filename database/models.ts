import { model, models, Schema } from "mongoose";
import { streamToString } from "next/dist/server/app-render/stream-ops.web";

const iceCubeDataSchema = new Schema({
  name: String,
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

const grbDataSchema = new Schema({
  name: String,
  Time: String,
  Trigger_Number: [String, Number],
  BAT_RA: Number,
  BAT_Dec: Number,
  BAT_Error_Radius: Number,
  BAT_T90: Number,
  BAT_Fluence: Number,
  XRT_RA: String,
  XRT_Dec: String,
  XRT_Error_Radius: Number,
  XRT_First_Observation: Number
})

const Models = {
  ICECUBEDATAMODEL:
    models.ICECUBEDATAMODEL ||
    model("IceCube", iceCubeDataSchema, "IceCube"),
  GRBDATAMODEL:
    models.GRBDATAMODEL ||
    model("GRBCAT", grbDataSchema, "GRBCAT"),
}

export default Models;
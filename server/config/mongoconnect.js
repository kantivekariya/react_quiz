import mongoose from "mongoose";
import debug from "debug";
import appConfig from "./env";

const log = debug("app");

mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
  log("MongoDB Connection Established");
});

mongoose.connection.on("reconnected", () => {
  log("MongoDB Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  log("MongoDB Connection Disconnected");
});

mongoose.connection.on("close", () => {
  log("MongoDB Connection Closed");
});

mongoose.connection.on("error", error => {
  log("MongoDB ERROR: " + error);
  process.exit(1);
});

mongoose.set("debug", appConfig.mongoDebug);
const connectMongo = async () => {
  let connectionuri = appConfig.dbConnectionString;
  await mongoose.connect(connectionuri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};

export default connectMongo;

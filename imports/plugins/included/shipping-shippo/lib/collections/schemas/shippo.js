import SimpleSchema from "simpl-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";

export const ShippoPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.apiKey": {
      type: String,
      label: "API Key",
      min: 10,
      optional: true
    }
  }
]);

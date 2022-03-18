import React from "react";
import Button from "@mui/material/Button";

import DefaultTable from "./renderers/DefaultTable";

const FeatureDetailView = (props) => {
  const {
    feature,
    featureCollection,
    selectedFeature,
    selectedFeatureCollection,
    setSelectedFeature,
    setSelectedFeatureCollection,
  } = props;
  console.log("feature: ", feature);
  console.log("selectedFeature: ", selectedFeature);

  return selectedFeature && feature ? (
    <>
      <Button onClick={() => setSelectedFeatureCollection(null)} fullWidth>
        Tillbaka till steg 1
      </Button>
      <Button onClick={() => setSelectedFeature(null)} fullWidth>
        Tillbaka till steg 2
      </Button>
      <DefaultTable feature={feature} />
    </>
  ) : null;
};

export default FeatureDetailView;

import React from "react";
import Mapir from "mapir-react-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
// import {}
// import Marker from "";
export default class MapirMaps extends React.Component {
  constructor(props) {
    super(props);
    this.Map = Mapir.setToken({
      transformRequest: url => {
        return {
          url: url,
          headers: {
            "x-api-key":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg1NWIxYzUxNjExOWFkNjk1ZTRlODRiZmRkODg4N2I1NWRiZWUwOGQwZjE2OTJiMmE1MDUxMTYzNzA4ZGJlNzQwYjgxYmNhM2Y0YzEyYTk5In0.eyJhdWQiOiI2NzI2IiwianRpIjoiODU1YjFjNTE2MTE5YWQ2OTVlNGU4NGJmZGQ4ODg3YjU1ZGJlZTA4ZDBmMTY5MmIyYTUwNTExNjM3MDhkYmU3NDBiODFiY2EzZjRjMTJhOTkiLCJpYXQiOjE1NzQwNjU4OTUsIm5iZiI6MTU3NDA2NTg5NSwiZXhwIjoxNTc2NTcxNDk1LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.lXIsiH98XQoxMNEz2sb_euJaOXTJu-I020i4Apo7ksSavsfWq4q-nLhO3srcnz89tcJUH4M3DJZKCol2QhYIIWpyWUMa-_nC_wQoe8NLfyqbc-zzSSNMcDDpzvsVT0_r_2dhZOW3MlX8LwXCI5cD03BPnQf5orPyowqxEOjSGcbvNDZXlBn3hVvw8A_Oxqx5BJSP1uiA-KOJG08T_6-C5yk1Rw9tZ6IWmOnc6ULfiNSUcSFJveJH--JujN1bnvpVHd18yVOF2x91CIItohcMqBGMvf6d01Uwx1PQIFYwY60Z32r-9upmqSodqgE9TcVVABEPGB_avJ4RXDEveL4lIw"
          } //Mapir access token
        };
      }
    });
  }

  render() {
    return (
      <Mapir Map={this.Map} dragPen={true}>
        <Mapir.Marker coordinates={[-0.2416815, 51.5285582]} anchor="bottom">
          <img
            alt="Marker"
            src={
              <FontAwesomeIcon
                icon={faMapPin}
                pull="right"
                size="1x"
                color="White"
                onClick={() => null}
              />
            }
          />
        </Mapir.Marker>
      </Mapir>
    );
  }
}

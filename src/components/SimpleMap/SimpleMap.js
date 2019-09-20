import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    const {
      urlKey,
      pinDesc,
      PinComponent,
      width,
      height,
      center,
      zoom,
      lng,
      lat
    } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: height, width: width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: urlKey }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <PinComponent
            lat={lat ? lat : center.lat}
            lng={lng ? lng : center.lng}
            text={pinDesc}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

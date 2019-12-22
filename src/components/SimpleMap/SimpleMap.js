import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { SafeValue } from "../ApiHandlers/ApiHandler";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default class MapWithMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: SafeValue(
        props,
        "center",
        "object",
        { lat: 0, lng: 0 },
        "defaultCenter"
      ),
      marker: SafeValue(
        props,
        "markerPosition",
        "object",
        { lat: 0, lng: 0 },
        "defaultMarkerPosition"
      ),
      zoom: SafeValue(props, "zoom", "number", 5),
      draggable: SafeValue(props, "draggable", "boolean", false)
    };
    // $FlowFixMe: ref
    this.refmarker = React.createRef();
    this.mapContainerStyle = SafeValue(props, "containerStyle", "object", {});
  }
  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable });
  };
  updatePosition = () => {
    const marker = this.refmarker.current;

    if (marker != null) {
      this.setState(
        {
          marker: marker.leafletElement.getLatLng()
        },
        () => this.props.onMarkerUpdate(this.state.marker)
      );
    }
  };

  componentDidMount() {
    this.map = this.refs.map.leafletElement;
    this.map.whenReady(() => {
      this.mapInterval = setInterval(() => {
        this.map.invalidateSize();
      }, 50);
    });
  }
  componentWillUnmount() {
    clearInterval(this.mapInterval);
  }
  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    return (
      <Map center={position} zoom={this.state.zoom} ref="map">
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Marker
          draggable={this.state.draggable}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref={this.refmarker}
        >
          {!this.props.staticMap && (
            <Popup minWidth={90}>
              <span onClick={this.toggleDraggable}>
                {this.state.draggable
                  ? this.props.dragMarkerMessage
                  : this.props.locationName}
              </span>
            </Popup>
          )}
          {this.props.staticMap && (
            <Popup minWidth={90}>
              <span>{this.props.locationName}</span>
            </Popup>
          )}
        </Marker>
      </Map>
    );
  }
}

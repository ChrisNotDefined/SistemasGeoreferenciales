class MyMarker {

  deafult_image = "location.png";

  map;
  position;
  label;
  marker;
  icon;

  constructor(map, lat, lng, lab_t, lab_des, img, icon) {
    this.map = map;
    this.icon = icon;

    this.position = {
      lat,
      lng
    };

    this.label = new google.maps.InfoWindow({
      content: CaptionHTML(lab_t, lab_des, img),
      maxWidth: 430
    })
  }

  loadMarker() {
    let marker_props = {
      position: this.position,
      map: this.map,
      title: "Class Marker"
    }

    if(this.icon) {
      marker_props.icon = 'location.png';
    }

    this.marker = new google.maps.Marker(marker_props);

    this.marker.addListener('click', () => {
      this.label.open(this.map, this.marker);
    })
  }

  show() {
    this.label.open(this.map, this.marker);
  }

  close() {
    this.label.close();
  }
}
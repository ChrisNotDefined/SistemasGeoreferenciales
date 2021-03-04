class MyMarker {
  map;
  position;
  label;
  marker;

  constructor(map, lat, lng, lab_t, lab_des) {
    this.map = map;

    this.position = {
      lat,
      lng
    };

    this.label = new google.maps.InfoWindow({
      content: CaptionHTML(lab_t, lab_des)
    })
  }

  loadMarker() {
    this.marker = new google.maps.Marker({
      position: this.position,
      map: this.map,
      title: "Class Marker",
      icon: "location.png"
    });

    this.marker.addListener('click', () => {
      this.label.open(this.map, this.marker);
    })

    this.label.open(this.map, this.marker);
  }
}
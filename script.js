let listElement = document.getElementById("link_list");

const exercise_link = (name, route) => {
  return `<a class="list-group-item item" href="${route}">${name}</a>`
}

for (var i = 0; i < routes.length; i++) {
  var {name, route} = routes[i];
  listElement.innerHTML += exercise_link(name, route);
}
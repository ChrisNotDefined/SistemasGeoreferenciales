let listElement = document.getElementById("link_list");

const exercise_link = (name, route) => {
  let optionContent = {
    title: name.split(" - ")[0],
    desc: name.split(" - ")[1]
  }
  return `
  <li class="item">
    <a href="${route}">
      <i class="bi bi-folder-fill"></i>
      <div class="title">
        ${optionContent.title}
      </div>
      <div class="subtitle">
        ${optionContent.desc}
      </div>
    </a>
  </li>
  `
}

for (var i = 0; i < routes.length; i++) {
  var {name, route} = routes[i];
  listElement.innerHTML += exercise_link(name, route);
}
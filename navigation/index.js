const list = document.querySelectorAll(".list");
let active = list[0];

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", (e) => {
    e.preventDefault();
    active.classList.remove("active");
    active = e.target.closest("li");
    e.target.closest("li").classList.add("active");
  });
}

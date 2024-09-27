document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const inputTitle = document.getElementById("todo-title");
  const inputDescription = document.getElementById("todo-description");
  const list = document.getElementById("todo-list");
  const inputTitleField = document.getElementById("input_title");
  const inputForm = document.getElementById("input");
  const closeButton = document.getElementById("close-div");
  const navbarToggler = document.querySelector(".toggle-menu");
  const toggleDiv = document.getElementById("toggle");
  const Image = document.querySelector(".img");
  const toggleButton = document.getElementById("navbarToggle");
  const navbarCollapse = document.getElementById("navbarCollapse");

  toggleButton.addEventListener("click", function () {
    // Toggle the visibility of the navbar items
    navbarCollapse.classList.toggle("active");
  });

  let editingItem = null;

  inputTitleField.addEventListener("focus", function () {
    form.style.display = "block";
    inputForm.style.display = "none";
  });

  let lastClickedItem = {
    parentDiv: null,
    image: null,
  };

  toggleDiv.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
      const parentDiv = e.target.closest(".img");

      if (lastClickedItem.parentDiv) {
        lastClickedItem.parentDiv.style.backgroundColor = "";
      }

      if (lastClickedItem.image) {
        lastClickedItem.image.style.backgroundColor = "";
      }

      parentDiv.style.backgroundColor = "rgb(254, 239, 195)";
      e.target.style.backgroundColor = "rgb(254, 239, 195)";

      // Store the clicked div and image as the last clicked item
      lastClickedItem.parentDiv = parentDiv;
      lastClickedItem.image = e.target;
    }
  });

  // navbarToggler.addEventListener("click", function (e) {
  //   if (e.target.classList.contains("img")) {
  //     e.target.classList.add("bg-highlight");
  //   }
  // });

  let activeListItem = null;

  function changeColor(imgId, listId) {
    const image = document.getElementById(imgId);
    const listItem = document.getElementById(listId);

    image.addEventListener("click", function (e) {
      if (activeListItem) {
        activeListItem.style.backgroundColor = "";
      }

      listItem.style.backgroundColor = "rgb(254, 239, 195)";
      activeListItem = listItem;
    });
  }

  // Map images to list items and assign colors
  changeColor("img1", "list1");
  changeColor("img2", "list2");
  changeColor("img3", "list3");
  changeColor("img4", "list4");
  changeColor("img5", "list5");

  closeButton.addEventListener("click", function () {
    const valueT = inputTitle.value.trim();
    const valueD = inputDescription.value.trim();
    if (valueT && valueD) {
      if (editingItem) {
        // Update the existing item
        editingItem.querySelector("strong").textContent = valueT;
        editingItem.querySelector("p").textContent = valueD;
        editingItem = null;
      } else {
        // Add a new item
        addItem(valueT, valueD);
      }
      inputTitle.value = "";
      inputDescription.value = "";
    }
    form.style.display = "none";
    inputForm.style.display = "block";
  });

  function addItem(title, description) {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item mt-5 d-flex justify-content-between flex-column ";
    listItem.innerHTML = `
            <div>
            <div>
              <strong>${title}</strong>
              <p>${description}</p>
            </div>
            <div>
              <div class="btn btn-warning btn-sm me-2">Edit</div>
              <div class="btn btn-danger btn-sm">Delete</div>
            </div>
            </div>
            <div>
            <img src="ip1.svg" width="18px" class="mx-2" alt="" />
            <img src="ip2.svg" width="18px" class="mx-2" alt="" />
            <img src="ip3.svg" width="18px" class="mx-2" alt="" />
            <img src="ip4.svg" width="18px"class="mx-2" alt="" />
            <img src="ip5.svg" width="20px" class="mx-2" alt="" />
            <img src="ip6.svg" width="18px" class="mx-2" alt="" />
            </div>
          `;

    // Add event listener for background color change on click
    listItem.addEventListener("click", function () {
      // Remove background color from all list items
      document.querySelectorAll(".list-group-item").forEach(function (item) {
        item.classList.remove("bg-highlight");
      });
      // Add background color to the clicked item
      listItem.classList.add("bg-highlight");
    });

    const editButton = listItem.querySelector("div.btn-warning");
    const deleteButton = listItem.querySelector("div.btn-danger");

    editButton.addEventListener("click", function () {
      inputTitle.value = listItem.querySelector("strong").textContent;
      inputDescription.value = listItem.querySelector("p").textContent;
      form.style.display = "block";
      inputForm.style.display = "none";
      editingItem = listItem;
    });

    deleteButton.addEventListener("click", function () {
      listItem.remove();
    });

    list.appendChild(listItem);
  }
});

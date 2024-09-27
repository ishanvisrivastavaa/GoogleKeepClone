document.addEventListener("DOMContentLoaded", function () {
  const inputFocus = document.getElementById("input_title");
  const description = document.getElementById("todo-form");
  const inputList = document.getElementById("todo-list");
  const closeButton = document.getElementById("close-div");
  const inputTitle = document.getElementById("todo-title");
  const inputDescription = document.getElementById("todo-description");
  const toggle = document.getElementById("toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const imageToggles = document.querySelectorAll(".image-toggle");
  const navbarCollapse = document.getElementById("navbarCollapse");
  const imgCircle = document.querySelectorAll(".image-circle");
  const list1 = document.getElementById("list1");
  const img1 = document.getElementById("img1");
  let linksVisible = true;
  let activeListItem = null;
  let activeImage = null;

  function toggleNavLinks() {
    linksVisible = !linksVisible;

    navLinks.forEach(function (link) {
      if (linksVisible) {
        link.style.visibility = "visible";
        link.style.opacity = "1";
        list1.style.backgroundColor = "rgb(254, 239, 195)";
        img1.style.backgroundColor = "white";
      } else {
        link.style.visibility = "hidden";
        navbarCollapse.style.boxShadow = "none";
        link.style.opacity = "0";
        list1.style.backgroundColor = "";
        img1.style.backgroundColor = "rgb(254, 239, 195)";
        img1.style.borderRadius = "50%";
        activeImage.style.backgroundColor = "";
      }
    });

    activeListItem = linksVisible ? list1 : null;
  }

  toggle.addEventListener("click", function () {
    toggleNavLinks();
  });

  imageToggles.forEach(function (image) {
    image.addEventListener("click", toggleNavLinks);

    image.addEventListener("mouseover", () => {
      linksVisible = true;
      navLinks.forEach(function (link) {
        link.style.visibility = "visible";
        link.style.opacity = "1";
        img1.style.backgroundColor = "white";
        navbarCollapse.style.boxShadow = "0 2px 2px 2px rgb(211, 207, 207)";
      });
    });

    image.addEventListener("mouseout", () => {
      linksVisible = false;
      navLinks.forEach(function (link) {
        link.style.visibility = "hidden";
        list1.style.backgroundColor = "";
        link.style.opacity = "0";
      });
      navbarCollapse.style.boxShadow = "none";
    });
  });

  function changeColor(imgId, listId) {
    const image = document.getElementById(imgId);
    const listItem = document.getElementById(listId);

    image.addEventListener("click", function () {
      if (activeImage) {
        activeImage.style.backgroundColor = "";
        activeImage.style.borderRadius = "";
      }

      if (activeListItem) {
        activeListItem.style.backgroundColor = "";
      }

      listItem.style.backgroundColor = "rgb(254, 239, 195)";
      activeListItem = listItem;

      if (linksVisible) {
        activeImage = image;
        activeListItem.style.backgroundColor = "rgb(254, 239, 195)";
      } else {
        listItem.style.backgroundColor = "";
        activeImage.style.backgroundColor = "rgb(254, 239, 195)";
        activeImage.style.borderRadius = "50%";
        img1.style.backgroundColor = "white";
      }
    });

    image.addEventListener("mouseover", function () {
      if (activeListItem) {
        activeListItem.style.backgroundColor = "";
      }
      listItem.style.backgroundColor = "#F5F5F5";
      activeListItem = listItem;

      if (activeImage) {
        activeImage.style.backgroundColor = "";
      }
      listItem.style.backgroundColor = "#F5F5F5";
      activeListItem = listItem;

      if (linksVisible) {
        list1.style.backgroundColor = "rgb(254, 239, 195)";
      } else {
        listItem.style.backgroundColor = "";
      }
    });

    image.addEventListener("mouseout", function () {
      if (activeListItem) {
        activeListItem.style.backgroundColor = "";
        if (activeImage === image) {
          image.style.backgroundColor = "rgb(254, 239, 195)";
          image.style.borderRadius = "50%";
        }
      }
    });
  }

  changeColor("img1", "list1");
  changeColor("img2", "list2");
  changeColor("img3", "list3");
  changeColor("img4", "list4");
  changeColor("img5", "list5");

  let editingItem = null;

  inputFocus.addEventListener("focus", function () {
    if (description) {
      description.style.display = "block";
      inputFocus.style.display = "none";
    }
  });

  closeButton.addEventListener("click", function () {
    const titleValue = inputTitle.value.trim();
    const descriptionValue = inputDescription.value.trim();

    if (titleValue && descriptionValue) {
      if (editingItem) {
        editingItem.querySelector(".list-item-title").textContent = titleValue;
        editingItem.querySelector(".list-item-description").textContent =
          descriptionValue;
        editingItem = null;
      } else {
        addItem(titleValue, descriptionValue);
      }

      inputTitle.value = "";
      inputDescription.value = "";
    }

    if (inputFocus) inputFocus.style.display = "block";
    if (description) description.style.display = "none";
  });

  function addItem(title, descriptionText) {
    const listItem = document.createElement("li");
    listItem.className = "list-item-container";
    listItem.innerHTML = `
      <div class="list-item-content">
        <strong class="list-item-title">${title}</strong>
        <p class="list-item-description">${descriptionText}</p>
      </div>
      <div class="list-item-icons">
        <img src="ip1.svg" width="18px" class="icon-1" alt="icon1" />
        <img src="ip2.svg" width="18px" class="icon-2" alt="icon2" />
        <img src="ip3.svg" width="18px" class="icon-3" alt="icon3" />
        <img src="ip4.svg" width="18px" class="icon-4" alt="icon4" />
        <img src="ip5.svg" width="20px" class="list-item-edit" alt="icon5" />
        <img src="ip6.svg" width="13px" class="list-item-delete" alt="icon6" />
        <img src="ip7.svg" width="18px" class="icon-6" alt="icon6" />
      </div>
    `;

    const editButton = listItem.querySelector(".list-item-edit");
    const deleteButton = listItem.querySelector(".list-item-delete");

    editButton.addEventListener("click", function () {
      const currentTitle =
        listItem.querySelector(".list-item-title").textContent;
      const currentDescription = listItem.querySelector(
        ".list-item-description"
      ).textContent;

      if (
        currentTitle.trim() !== inputTitle.value.trim() ||
        currentDescription.trim() !== inputDescription.value.trim()
      ) {
        inputTitle.value = currentTitle;
        inputDescription.value = currentDescription;

        if (description) description.style.display = "block";
        if (inputFocus) inputFocus.style.display = "none";

        editingItem = listItem;
      } else {
        alert("No changes detected. Please modify the content to edit.");
      }
    });

    deleteButton.addEventListener("click", function () {
      listItem.remove();
    });

    inputList.appendChild(listItem);
  }
});

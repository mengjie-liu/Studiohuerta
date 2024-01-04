$(document).ready(function () {
  $(".links")
    .mouseenter(function () {
      $(this).css({
        "text-decoration": "underline",
        "text-underline-offset": "0.5rem",
      });
    })
    .mouseleave(function () {
      $(this).css({
        "text-decoration": "none",
      });
    });

  //get info
  let orientationeles = $(".orientation");
  let orientations = [];
  orientationeles.each(function () {
    orientations.push($(this).text());
  });

  let coloreles = $(".color");
  let colors = [];
  coloreles.each(function () {
    colors.push($(this).text());
  });

  let urleles = $(".url");
  let images = [];
  urleles.each(function () {
    images.push($(this).text());
  });

  let nameeles = $(".name");
  let names = [];
  nameeles.each(function () {
    names.push($(this).text());
  });

  //create objects
  let imgObjects = [];
  for (i = 0; i < images.length; i++) {
    let imgObject = {
      url: images[i],
      orientation: orientations[i],
      color: colors[i],
      title: names[i],
    };
    imgObjects.push(imgObject);
  }

  //add in blank images
  const blankImages = ["", "", "", "", "", "", ""];
  const uniqueImages = [...new Set(imgObjects)]; // Get unique non-blank images
  const combinedImages = [...uniqueImages, ...blankImages];

  //shuffle array
  function shuffleArray(array) {
    let shuffled = array.slice(); // Create a copy of the array for shuffling
    let valid = false;

    while (!valid) {
      // Shuffle the array
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Check the validity of the shuffled array
      valid = true;
      for (let k = 0; k < shuffled.length - 2; k++) {
        if (
          shuffled[k] === "" &&
          shuffled[k + 1] === "" &&
          shuffled[k + 2] === ""
        ) {
          // If three blank images are together
          valid = false;
          break;
        }
        if (shuffled[k] === "" && shuffled[k + 1] === "") {
          // If two blank images are together
          valid = false;
          break;
        }
      }
    }
    return shuffled;
  }

  const shuffledImgObjects = shuffleArray(combinedImages);

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("container");
  document.body.appendChild(mainContainer);

  let currentIndex = 0;
  let threeImgDivsCount = 0;

  while (currentIndex < shuffledImgObjects.length) {
    const div = document.createElement("div");
    div.classList.add("row");
    let numberOfImages = Math.min(
      shuffledImgObjects.length - currentIndex,
      Math.floor(Math.random() * 2) + 2
    ); // Randomly choose between 2 or 3 images
    let blankCount = 0;

    for (let i = 0; i < numberOfImages; i++) {
      if (currentIndex < shuffledImgObjects.length) {
        const atag = document.createElement("a");
        const title = document.createElement("p");
        title.classList.add("projectName");

        const img = new Image();

        if (shuffledImgObjects[currentIndex] === "") {
          // img.classList.add("blank-image");
          blankCount++;
        } else {
          title.innerHTML = shuffledImgObjects[currentIndex].title;

          img.src = shuffledImgObjects[currentIndex].url;

          if (shuffledImgObjects[currentIndex].orientation === "horizontal") {
            const size = [
              "largeHorizontal",
              "midHorizontal",
              "smallHorizontal",
            ][Math.floor(Math.random() * 3)];
            img.classList.add(size);
          } else if (
            shuffledImgObjects[currentIndex].orientation === "vertical"
          ) {
            const size = ["largeVertical", "midVertical", "smallVertical"][
              Math.floor(Math.random() * 3)
            ];
            img.classList.add(size);
          }

          if (shuffledImgObjects[currentIndex].color === "color") {
            img.classList.add("colorImage");
          }
        }

        atag.appendChild(img);
        atag.classList.add("img");
        atag.appendChild(title);

        div.appendChild(atag);

        currentIndex++;
      }
    }

    if (numberOfImages === 3) {
      threeImgDivsCount++;
      if (threeImgDivsCount >= 4) {
        currentIndex -= 3;
        continue;
      }
      div.classList.add("threeCols");
    } else if (numberOfImages === 2) {
      div.classList.add("twoCols");
      const random = Math.random() < 0.5;
      const imgElements = div.getElementsByTagName("a");
      imgElements[random ? 0 : 1].className = "img large";
      imgElements[random ? 1 : 0].className = "img small";
    }

    mainContainer.appendChild(div);
  }

  // //randomize img url

  // //randomize rows
  var container = $(".container");
  var rows = container.children(".row");

  // rows
  //   .sort(function () {
  //     return Math.random() - 0.5;
  //   })
  //   .detach()
  //   .appendTo(container);

  // clone and infinite scroll
  $(".row:first-of-type").clone().appendTo(".container");
  $(".row:nth-of-type(2)").clone().appendTo(".container");
  let lastHeight;
  let secLastHeight;

  $("img").on("load", function () {
    // $(".row:last-of-type").css("background-color", "yellow");
    lastHeight = $(".row:last-of-type")[0].offsetHeight;
    secLastHeight = $(".row:nth-last-of-type(2)")[0].offsetHeight;
  });

  $(".container").scroll(function () {
    console.log(
      $(".container")[0].scrollTop,
      $(".container")[0].scrollHeight -
        lastHeight -
        secLastHeight -
        64 * 3 -
        8 * rows.length,
      lastHeight,
      secLastHeight
    );
    if (
      $(".container")[0].scrollTop >=
      $(".container")[0].scrollHeight -
        lastHeight -
        secLastHeight -
        64 * 3 -
        8 * rows.length -
        16
    ) {
      console.log("bottom");
      $(".container")[0].scrollTop = 0;
      $(".container")[0].scrollTo({ top: 0, behavior: "instant" });
    }
  });
});

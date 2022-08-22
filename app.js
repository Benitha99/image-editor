const fileInput = document.querySelector(".file-input")
chooseImgBtn = document.querySelector(".choose-img")
saveImgBtn = document.querySelector(".save-img")
resetFilterBtn = document.querySelector(".reset-filter")
previewImg = document.querySelector(".preview-img img")
filterOptions = document.querySelectorAll(".filter button")
rotateOptions = document.querySelectorAll(".Rotate button")
filterSlider = document.querySelector(".slider input")
filterName = document.querySelector(".filter-info .name")
filterValue = document.querySelector(".filter-info .value")


let Brightness = 100,
    Saturation = 100,
    Inversion = 0,
    Grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFliter = () => {
    previewImg.style.filter = `brightness(${Brightness}%) saturate(${Saturation}%) invert(${Inversion}%) Grayscale(${Grayscale}%)`
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
}

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable")
    });

}

filterOptions.forEach(Option => {
    Option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        Option.classList.add("active");
        filterName.innerText = Option.innerText;

        if (Option.id === "Brightness") {
            filterSlider.max = "200";
            filterSlider.value = "Brightness"
            filterValue.innerText = `${Brightness}%`;
        } else if (Option.id === "Saturation") {
            filterSlider.max = "200";
            filterSlider.value = "Saturation"
            filterValue.innerText = `${Saturation}%`;
        } else if (Option.id === "Inversion") {
            filterSlider.max = "100";
            filterSlider.value = "Inversion"
            filterValue.innerText = `${Inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = "Grayscale"
            filterValue.innerText = `${Grayscale}%`;
        }

    });
});
const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if (selectedFilter.id === "Brightness") {
        Brightness = filterSlider.value;
    } else if (selectedFilter.id === "Saturation") {
        Saturation = filterSlider.value;
    } else if (selectedFilter.id === "Inversion") {
        Inversion = filterSlider.value;
    } else {
        Grayscale = filterSlider.value;
    }
    applyFliter();
}
rotateOptions.forEach(Option => {
    Option.addEventListener("click", () => {
        if (Option.id === "left") {
            rotate -= 90;
        } else if (Option.id === "right") {
            rotate += 90;
        } else if (Option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFliter();
    });
});
const resetFilter = () => {
    Brightness = 100,
        Saturation = 100,
        Inversion = 0,
        Grayscale = 0;
    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOptions[0].click();
    applyFliter();
}
const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;


    ctx.filter = `brightness(${Brightness}%) saturate(${Saturation}%) invert(${Inversion}%) Grayscale(${Grayscale}%)`
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();

}
filterSlider.addEventListener("input", updateFilter);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click())
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);

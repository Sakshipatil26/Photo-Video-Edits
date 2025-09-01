const generateForm = document.querySelector(".generate-form");
const generateBtn = generateForm.querySelector(".generate-btn");
const imageGallery = document.querySelector(".image-gallery");

const DEEPAI_API_KEY = "4c7b339c-8ca2-4a35-a5c7-d03d4e8ef4ac"; // Your DeepAI API key here
let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
  imgDataArray.forEach((imgObject, index) => {
    const imgCard = imageGallery.querySelectorAll(".img-card")[index];
    const imgElement = imgCard.querySelector("img");
    const downloadBtn = imgCard.querySelector(".download-btn");
    
    // Set the image source to the AI-generated image data
    imgElement.src = imgObject;
    
    // When the image is loaded, remove the loading class and set download attributes
    imgElement.onload = () => {
      imgCard.classList.remove("loading");
      downloadBtn.setAttribute("href", imgObject);
      downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`);
    }
  });
}

const generateAiImages = async (userPrompt, userImgQuantity) => {
  try {
    // Send a request to the DeepAI API to generate images based on user inputs
    const response = await fetch("https://api.deepai.org/api/text2img", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Api-Key": DEEPAI_API_KEY
      },
      body: `text=${userPrompt}&num_images=${userImgQuantity}`
    });

    // Throw an error message if the API response is unsuccessful
    if (!response.ok) throw new Error("Failed to generate AI images. Make sure your API key is valid.");

    const { output_url } = await response.json(); // Get data from the response
    updateImageCard(output_url);
  } catch (error) {
    alert(error.message);
  } finally {
    generateBtn.removeAttribute("disabled");
    generateBtn.innerText = "Generate";
    isImageGenerating = false;
  }
}

const handleImageGeneration = (e) => {
  e.preventDefault();
  if (isImageGenerating) return;

  // Get user input and image quantity values
  const userPrompt = e.target.querySelector(".prompt-input").value;
  const userImgQuantity = parseInt(e.target.querySelector(".img-quantity").value);

  // Disable the generate button, update its text, and set the flag
  generateBtn.setAttribute("disabled", true);
  generateBtn.innerText = "Generating";
  isImageGenerating = true;

  // Creating HTML markup for image cards with loading state
  const imgCardMarkup = Array.from({ length: userImgQuantity }, () => `
      <div class="img-card loading">
        <img src="images/loader.svg" alt="AI generated image">
        <a class="download-btn" href="#">
          <img src="images/download.svg" alt="download icon">
        </a>
      </div>
  `).join("");

  imageGallery.innerHTML = imgCardMarkup;
  generateAiImages(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleImageGeneration);

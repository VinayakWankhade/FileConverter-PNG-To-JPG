document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('imageInput').addEventListener('change', selectImages);
function handleFileSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
        resetConversionDetails();
        for (let i = 0; i < files.length; i++) {
            displayImage(files[i]); 
            convertToJPG(files[i], i, files.length);
        }
    }
}
function selectImages() {
    document.getElementById('fileInput').click();
}
function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        resetConversionDetails();
        for (let i = 0; i < files.length; i++) {
            displayImage(files[i]);
            convertToJPG(files[i], i, files.length);
        }
    }
}
function handleDragOver(event) {
    event.preventDefault();
}
function resetConversionDetails() {
    const downloadLinksContainer = document.getElementById('downloadLinksContainer');
    downloadLinksContainer.innerHTML = '';
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';
}
function displayImage(pngFile) {
    const imageContainer = document.getElementById('imageContainer');
    const img = new Image();

    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, 200, 200);
        imageContainer.appendChild(canvas);
        imageContainer.style.display = 'block';
    };
    img.src = URL.createObjectURL(pngFile);
}
function convertToJPG(pngFile, index, totalFiles) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const jpgDataURL = canvas.toDataURL('image/jpeg');

        const downloadLink = document.createElement('a');
        downloadLink.href = jpgDataURL;
        downloadLink.download = `converted_image_${index + 1}.jpg`;
        downloadLink.textContent = `Download JPG ${index + 1}`;
        downloadLinksContainer.appendChild(downloadLink);

        downloadLink.style.display = 'block';

        console.log(`Conversion of file ${index + 1} complete. Download link available.`);

        if (index === totalFiles - 1) {
            console.log('All files converted successfully.');
            const loadingIndicator = document.getElementById('loadingIndicator');
            loadingIndicator.style.display = 'none';
        }
    };
    img.src = URL.createObjectURL(pngFile);
}

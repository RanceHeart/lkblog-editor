// Convert raw image to the bytes
import imageCompression from "browser-image-compression";

const compressImage = async (file) => {
    const options = {
        maxSizeMB: 3,          // (default: Number.POSITIVE_INFINITY)
        maxWidthOrHeight: 1920,  // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
        useWebWorker: true,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
        maxIteration: 10,       // optional, max number of iteration to compress the image (default: 10)
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile; //this is a Blob object
    } catch (error) {
        console.log(error);
    }
}

const toBase64 = file => new Promise(async (resolve, reject) => {
    try {
        const compressedImage = await compressImage(file, 80, 3000); // 80% quality, 3000px max width
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([compressedImage]));
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    } catch (error) {
        reject(error);
    }
});


export {toBase64};
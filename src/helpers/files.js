import imageCompression from 'browser-image-compression';

// Compress a image size to smaller or equal to an input size (in MB)
export const compressImageSize = async (image, size) => {
    const options = {
        maxSizeMB: size,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    }

    try {
        const compressedImage = await imageCompression(image, options);
        return compressedImage;
    } catch (error) {
        console.log(error);
    }
    return null;
}
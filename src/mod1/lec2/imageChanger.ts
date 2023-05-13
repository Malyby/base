/* 
    Необходимо написать функции, которые бы принимали ссылку на изображение или canvas и применяла бы к нему один из эффектов.
    Например, инверсия цветов или оттенки серого. Для реализации эффектов, необходимо использовать методы Canvas getImageData/putImageData
    и работа с цветами пикселей. Возвращать такая функция может ссылку на Canvas или ImageData.

    const grayscaled = grayscale('/myImage.jpeg');
    const inversed = inverse(grayscaled); 
*/

function initCanvases(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    return canvas;
}

function loadImage(img): Promise<HTMLCanvasElement> {
    return new Promise((res, rej) => {
        const canvas = initCanvases();
        const ctx = canvas.getContext('2d');

        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.src = img;

        image.addEventListener('load', () => {
            canvas.height = image.height;
            canvas.width = image.width;
            ctx?.drawImage(image, 0, 0, image.width, image.height);
            res(canvas);
        });
    });
}



export function inversed(img: string): Promise<HTMLCanvasElement> {
    return loadImage(img).then((canvas) => {
        const ctx = canvas.getContext('2d');

        let imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 255 - imageData.data[i];
            imageData.data[i + 1] = 255 - imageData.data[i + 1];
            imageData.data[i + 2] = 255 - imageData.data[i + 2];
        }
        
        ctx!.putImageData(imageData, 0, 0);

        return canvas;
    });
}

export function grayscale(img: string): Promise<HTMLCanvasElement> {
    return loadImage(img).then((canvas) => {
        const ctx = canvas.getContext('2d');

        let imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            let grayScaledColor = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            imageData.data[i] = grayScaledColor;
            imageData.data[i + 1] = grayScaledColor;
            imageData.data[i + 2] = grayScaledColor;
        }
        
        ctx!.putImageData(imageData, 0, 0);

        return canvas;
    });
}
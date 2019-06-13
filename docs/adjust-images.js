/**
 * @param {NodeListOf<HTMLImageElement>} images - Nodelist
 * @param {number?} reference - 基準値。画像の比率が1:1の時の比率（0.5ならwidth:50%）(Optional)
 */
const adjustImages = (images, reference = 0.5) => {
    [].slice.call(images).forEach(image => {
        if (image.width === 0) {
            image.addEventListener('load', () => {
                adjustImage(image, reference);
            });
        } else {
            adjustImage(image, reference);
        }
    });
};
/**
 * @param {HTMLImageElement} image - Node
 * @param {number?} reference - 基準値 (Optional)
 */
const adjustImage = (image, reference = 0.5) => {
    if (typeof image !== 'object' || !image.width) return;
    const ratio = image.width / image.height;
    if (ratio >= 1) {
        image.style.width = Math.sqrt(ratio) * reference * 100 + '%';
        image.style.height = 'auto';
        image.style.maxWidth = '100%';
        image.classList.add('is-horizontal');
    } else {
        image.style.height = Math.sqrt(1 / ratio) * reference * 100 + '%';
        image.style.width = 'auto';
        image.style.maxHeight = '100%';
        image.classList.add('is-vertical');
    }
    image.classList.add('is-adjusted');
};

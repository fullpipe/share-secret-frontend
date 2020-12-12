export function copy(text: string) {
    const copyBox = document.createElement('textarea');
    copyBox.style.position = 'fixed';
    copyBox.style.left = '0';
    copyBox.style.top = '0';
    copyBox.style.opacity = '0';
    copyBox.readOnly = true;
    copyBox.value = text;
    document.body.appendChild(copyBox);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(copyBox);

        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        copyBox.setSelectionRange(0, 999999);
    } else {
        copyBox.focus();
        copyBox.select();
    }

    document.execCommand('copy');
    document.body.removeChild(copyBox);
}

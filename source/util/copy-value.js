import copyToClipboard from 'copy-to-clipboard'


export default (event) =>
    copyToClipboard(event.target.textContent)

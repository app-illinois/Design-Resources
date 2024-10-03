document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.ila-doc-copy-button').forEach(button => {
        button.addEventListener('click', function() {
            console.log('click')
            const sourceElement = this.closest('.ila-doc-example-toolbar').nextElementSibling;
            const htmlEncodedContent = sourceElement.querySelector('code').textContent;

            // Copy the decoded content to clipboard
            navigator.clipboard.writeText(htmlEncodedContent).then(() => {
                alert('HTML copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });

    hljs.highlightAll();
});

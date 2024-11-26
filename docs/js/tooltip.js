const createTooltip = ((type, className) => {
    const outerDiv = document.createElement('div');
    outerDiv.style.minWidth = '500px';
    
    className.forEach(eachClass => {
        const tooltip = document.createElement('button');
        tooltip.classList.add(`tooltip-${eachClass}-${type}`);
        tooltip.innerText = `tooltip-${eachClass}-${type}`;
        tooltip.style.marginLeft = '10px';
        tooltip.style.background = type === 'light' ? 'white' : 'grey';
        tooltip.style.minWidth = '150px';
        tooltip.style.marginRight = '30px';

        const content = document.createElement('div');
        content.classList.add('tooltip-content');
        
        const textTitle = document.createElement('span');
        textTitle.classList.add('tooltip-text-title');
        textTitle.innerText = 'Aristotle (disambiguation)';

        const textBody = document.createElement('span');
        textBody.classList.add('tooltip-text-body');
        textBody.innerText = 'This title relates to more than one page. Please provide more information.';

        content.appendChild(textTitle);
        content.appendChild(textBody);
        tooltip.appendChild(content);
        outerDiv.appendChild(tooltip);
    })
    return outerDiv;
})

const createExample = () => {
    const arrowPositions = [
        {
            label: 'Bottom',
            className: ['bl', 'bc', 'br']
        }, {
            label: 'Top',
            className: ['tl', 'tc', 'tr']
        }, {
            label: 'Left',
            className: ['lt', 'lc', 'lb']
        }, {
            label: 'Right',
            className: ['rt', 'rc', 'rb']
        }
    ];

    const parentDiv = document.getElementById('tooltip-example-div');
    if (parentDiv) {
        const titleLight = document.createElement('h3');
        titleLight.innerText = 'Light background';
        titleLight.style.marginBottom = '15px';
        parentDiv.appendChild(titleLight);
        
        arrowPositions.forEach(group => {
            const eachGroupDiv = document.createElement('div');
            eachGroupDiv.style.display = 'flex';
            eachGroupDiv.style.marginBottom = '10px';

            const labelDiv = document.createElement('div');
            labelDiv.innerText = `Arrow Position (${group.label})`;
            labelDiv.style.minWidth = '200px';

            eachGroupDiv.appendChild(labelDiv);
            eachGroupDiv.appendChild(createTooltip('light', group.className))

            parentDiv.appendChild(eachGroupDiv);
        })

        const titleDark = document.createElement('h3');
        titleDark.innerText = 'Dark background';
        titleDark.style.marginBottom = '15px';
        parentDiv.appendChild(titleDark);
            
        arrowPositions.forEach(group => {
            const eachGroupDiv = document.createElement('div');
            eachGroupDiv.style.display = 'flex';
            eachGroupDiv.style.marginBottom = '10px';

            const labelDiv = document.createElement('div');
            labelDiv.innerText = `Arrow Position (${group.label})`;
            labelDiv.style.minWidth = '200px';

            eachGroupDiv.appendChild(labelDiv);
            eachGroupDiv.appendChild(createTooltip('dark', group.className))

            parentDiv.appendChild(eachGroupDiv);
        })
    }
}
window.addEventListener('load', createExample);
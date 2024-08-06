class DataTable extends HTMLElement {
    constructor() {
        super();
        this.lastSort = null;
        this.sortAsc = true;
    }

    connectedCallback() {
        let table = this.querySelector('table');

        if (!table) {
            console.warn('ila-datatable: No table found.');
            return;
        }

        let tbody = table.querySelector('tbody');
        let thead = table.querySelector('thead');

        if (!tbody || !thead) {
            console.warn('ila-datatable: No tbody or thead found.');
            return;
        }

        this.thead = thead;
        this.tbody = tbody;

        let isSortable = this.getAttribute('sortable') === "true";

        if(isSortable) {
            let headers = thead.querySelectorAll('th');
            headers.forEach((h, i) => {
                h.style.cursor = 'pointer';
                h.addEventListener('click', e => {
                    this.sortTableByColumn(i)
                });
            });
        }

        let defaultSort = this.getAttribute('sort');

        if (defaultSort != null && !isNaN(Number(defaultSort))) {
            this.sortTableByColumn(defaultSort - 1);
        }
    }

    sortTableByColumn(columnIndex) {
        if (this.lastSort === columnIndex) {
            this.sortAsc = !this.sortAsc;
        }
        else {
            this.sortAsc = true;
        }

        this.updateHead(columnIndex);
        this.lastSort = columnIndex;

        const rows = Array.from(this.tbody.querySelectorAll('tr'));

        rows.sort((rowA, rowB) => {
            let cellA = rowA.children[columnIndex].textContent.trim();
            let cellB = rowB.children[columnIndex].textContent.trim();

            if (rowA.children[columnIndex].dataset.type === "numeric") {
                cellA = cellA.replace(/[$,,]/g, '').replace(/[^0-9.-]/g, '');
            }

            if (rowA.children[columnIndex].dataset.type === "numeric") {
                cellB = cellB.replace(/[$,,]/g, '').replace(/[^0-9.-]/g, '');
            }

            const isNumeric = !isNaN(Number(cellA)) && !isNaN(Number(cellB));
            return (isNumeric ? (cellA - cellB) : cellA.localeCompare(cellB)) * (this.sortAsc ? 1 : -1);
        });

        this.tbody.innerHTML = '';
        this.tbody.append(...rows);
    }

    updateHead(current) {
        let thCurrent = this.thead.querySelector("th:nth-child(" + (current + 1) + ")");

        if (this.lastSort != null) {
            let thLast = this.thead.querySelector("th:nth-child(" + (this.lastSort + 1) + ")");

            if (thLast.querySelector('span') != null) {
                thLast.removeChild(thLast.querySelector('span'));
            }
        }

        if (this.sortAsc) {
            thCurrent.setAttribute("aria-sort", "ascending");
        }
        else {
            thCurrent.setAttribute("aria-sort", "descending");
        }

        thCurrent.innerHTML += '<span aria-hidden="true"></span>';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (!customElements.get('ila-datatable')) {
        customElements.define('ila-datatable', DataTable);   
    }
});
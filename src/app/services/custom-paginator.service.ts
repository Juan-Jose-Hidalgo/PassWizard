import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Items por página:';
    override nextPageLabel = 'Siguiente';
    override previousPageLabel = 'Anterior';

    // Customizes the label that shows the range of items.
    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        const start = page * pageSize + 1;
        const end = (page + 1) * pageSize;
        return `${start} de ${length > end ? end : length} resultados`;
    }
}

export interface Welcome {
    totalPage:     number;
    totalElements: number;
    pageNumber:    number;
    pageSize:      number;
    first:         boolean;
    last:          boolean;
    content:       Content[];
}

export interface Content {
    id:          number;
    name:        string;
    description: string;
}
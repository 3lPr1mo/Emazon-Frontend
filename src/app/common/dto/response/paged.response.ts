export interface ContentPage {
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

export type ContentKeys = keyof Content;
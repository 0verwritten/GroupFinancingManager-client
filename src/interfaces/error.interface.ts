export interface Error {
    status: string;
    errors: {
        [key: string]: string[];
    };
}
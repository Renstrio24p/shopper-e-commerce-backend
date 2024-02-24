import { Multer } from "multer"

export type Config = {
    port: number,
    url: string,
    database?: string,
    dest_port?: number | null,
    admin_port?: number | null,
    collection?: string,
}

export interface Multerconfig extends Multer {
    fieldname: string,
    originalname: string
}

export type MulterDisk = {
    diskStorage: (config: {
        destination: string;
        filename: (req: any, file: any, cb: (error: Error | null, filename: string) => void) => void;
    }) => any;
};

const myconfig: Config = {
    port: 4000,
    url: 'http://localhost:4000',
    database: 'common',
    dest_port: 5000,
    collection: 'food'
}




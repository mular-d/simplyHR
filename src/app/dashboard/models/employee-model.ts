
export class Employee {
    id: string;
    name: string;
    email_address: string;
    doj: Date;
    department: {
        id: string;
        name: string
    }
}
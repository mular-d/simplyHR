
export class Employee {
    id: string;
    name: string;
    email_address: string;
    doj: Date;
    deptId: string;
    department: {
        id: string;
        name: string
    }
}
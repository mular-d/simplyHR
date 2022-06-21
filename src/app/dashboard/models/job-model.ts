export class Job {
    id: string;
    title: string;
    role: string;
    description: string;
    skill: string;
    salary: number;
    final_date: Date;
    department: {
        id: string;
        name: string
    }
}
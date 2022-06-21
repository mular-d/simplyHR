
export class Candidate {
    id: string;
    fname: string;
    lname: string;
    email_address: string;
    edu_level: string;
    city: string;
    region: string;
    job: {
        id: string;
        title: string;
        department: {
            id: string
        }
    }
}
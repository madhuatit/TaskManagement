export class User {
    User_Id : number;
    First_Name: string;
    Last_Name: string;
    Employee_Id: number;
    Project_Id: number;
    Task_Id: number;

    public User(a: number, f: string, l: string, e: number, p: number, t: number){
        this.User_Id= 0;
        this.First_Name = "";
        this.Last_Name = "";
        this.Employee_Id = 0;
        this.Project_Id = 0;
        this.Task_Id = 0;
    }
}

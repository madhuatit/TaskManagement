export class Project {
    Project_Id : number;
    Project_Name: string;
    Start_Date: Date;
    End_Date: Date;
    Priority: number;
    

    public Project(a: number, f: string, l: Date, e: Date, p: number){
        this.Project_Id =0;
        this.Project_Name = null;
        this.Start_Date = null;
        this.End_Date = null;
        this.Priority = 0;
    }
}

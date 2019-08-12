import { User } from './user.model';
import { Project } from './project.model';


export class AddTask {
    Status : number;
    Start_Date: Date;
    End_Date: Date;
    Priotity: number;
    Project: Project;
    Task_Id: number;
    Parent: ParentTask;
    Task_Name: string;
    User: User;

    /* public AddTask(a: number, f: Date, l: Date, e: number, p: number, t: number,
        b: number, c: string){
        this.Status= 0;
        this.Start_Date = null;
        this.End_Date = null;
        this.Priotity = 0;
        this.Project = null;
        this.Task_Id = 0;
        this.Parent = null;
        this.Task_Name = "";
        this.User = null;
    } */
}

export class ParentTask {
    Parent_Id : number;
    Parent_Task : string;
    Project_Id: number;

    /* public ParentTask(a: number, b: string, c: number){
        this.Parent_Id=0;
        this.Parent_Task="";
        this.Project_Id=0;
    } */
}

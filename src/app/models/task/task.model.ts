import { Member } from "../member/member.model";

export class Task extends Member {
    description:string;

    constructor(id: number, name:string, description:string) {
        super(id, name);

        this.description = description;
    }
}

export class TaskPayload {
    type: string;
    payload: Task[];
 
    constructor(type: string, payload:Task[]) {
        this.payload = payload;
        this.type = type;
    }
}
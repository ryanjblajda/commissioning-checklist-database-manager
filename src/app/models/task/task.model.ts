import { DescriptiveMember, Member } from "../member/member.model";

export class TaskPayload {
    type: string;
    payload: DescriptiveMember[];
 
    constructor(type: string, payload:DescriptiveMember[]) {
        this.payload = payload;
        this.type = type;
    }
}
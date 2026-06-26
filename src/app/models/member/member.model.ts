export class Member {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class MemberPayload {
  type: string;
  payload: Member[];

  constructor(type:string, payload:Member[]) {
    this.type = type;
    this.payload = payload;
  }
}
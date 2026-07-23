export class Member {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class DescriptiveMember extends Member {
  description:string;

  constructor(id: number, name: string, description:string) {
    super(id, name);
    this.description = description;
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

export class DescriptiveMemberPayload {
  type: string;
  payload: DescriptiveMember[];

  constructor(type:string, payload:DescriptiveMember[]) {
    this.type = type;
    this.payload = payload;
  }
}
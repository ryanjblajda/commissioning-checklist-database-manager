import { Member } from "../member/member.model";

export class DeviceType extends Member {
    description: string;

    constructor(id: number, name:string, description:string) {
        super(id, name);

        this.description = description;
    }
}

export class Device extends Member {
    manufacturer_name:string;
    control_type_name:string;

    private manufacturer_id:number;
    private control_type_id:number;

    constructor(id: number, name:string, manufacturer_name:string, manufacturer_id:number, control_type_id:number, control_type_name:string) {
        super(id, name);

        this.manufacturer_name = manufacturer_name;
        this.control_type_name = control_type_name;

        this.manufacturer_id = manufacturer_id;
        this.control_type_id = control_type_id;
    }
}

export class DevicePayload {
    type: string;
    payload: Device[];
 
    constructor(type: string, payload:Device[]) {
        this.payload = payload;
        this.type = type;
    }
}

export class DeviceTypePayload {
    type: string;
    payload: DeviceType[];
 
    constructor(type: string, payload:DeviceType[]) {
        this.payload = payload;
        this.type = type;
    }
}
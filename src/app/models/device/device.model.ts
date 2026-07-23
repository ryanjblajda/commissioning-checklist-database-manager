import { DescriptiveMember, Member } from "../member/member.model";

export class Device extends DescriptiveMember {
    manufacturer_name:string;
    control_type_name:string;

    private manufacturer_id:number;
    private control_type_id:number;

    constructor(id: number, name:string, description:string, manufacturer_name:string, manufacturer_id:number, control_type_id:number, control_type_name:string) {
        super(id, name, description);

        this.manufacturer_name = manufacturer_name;
        this.control_type_name = control_type_name;

        this.manufacturer_id = manufacturer_id;
        this.control_type_id = control_type_id;
    }
}

export class NewDevicePayload {
    prefix_id:number;
    manufacturer_id:number;
    model:string;
    capabilities:number[];
    controls:number[];

    constructor(prefix:number, mfr:number, model:string, capabilities:number[], controls:number[]) {
        this.prefix_id = prefix;
        this.manufacturer_id = mfr;
        this.model = model;
        this.capabilities = capabilities;
        this.controls = controls;
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
    payload: DescriptiveMember[];
 
    constructor(type: string, payload:DescriptiveMember[]) {
        this.payload = payload;
        this.type = type;
    }
}
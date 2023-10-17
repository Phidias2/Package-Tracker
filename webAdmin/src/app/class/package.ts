export class Package {
    _id: String | undefined;
    active_delivery!:String;
    weight!: Number;
    width!:Number;
    height!:Number;
    depth!: Number;
    from_name!: String;
    from_adress!: String;
    from_location!: Object;
    to_name!: String;
    to_adress!: String;
    to_location!: Object;
    created_at!: Date;
}

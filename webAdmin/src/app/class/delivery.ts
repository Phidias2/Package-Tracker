export class Delivery {
    _id: String | undefined;
    package_id!:String;
    weight!: Number;
    start_time!: Date;
    end_time!: Date;
    status!: String;
    created_at!: Date;
}

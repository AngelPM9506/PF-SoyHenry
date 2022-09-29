import { prop, getModelForClass } from '@typegoose/typegoose';

class Chat {
    @prop({ type: () => String })
    public idTrip?: String;

    @prop({ type: () => String })
    public nameUser?: String;

    @prop({ type: () => String })
    public message?: String;

    @prop({ type: () => Date, default: new Date() })
    public createdAt?: Date;
}

const Chatmodel = getModelForClass(Chat);

export default Chatmodel;
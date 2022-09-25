import prisma from "src/utils/prisma";

type body = {
    name: string;
    surname: string;
    subject: string;
    email: string;
    whatsapp: string;
    message: string;
    userId?: string;
}

const ContactController = {
    getContact: async () => {
        let respG = prisma.contact.findMany({ include: { User: true } });
        return respG;
    },
    postContac: async (body: body) => {
        let { name, surname, subject, email, whatsapp, message, userId } = body;
        let condition = {
            data: { name, surname, subject, email, whatsapp, message, userId }
        }
        try {
            let response = await prisma.contact.create(condition);
            return response;
        } catch (error: any) {
            return error;
        }
    }
}

export default ContactController;
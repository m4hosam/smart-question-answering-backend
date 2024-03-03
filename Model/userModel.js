import prisma from '../prismadb';

module.exports = {
    createUser: async ({ name, email, password }) => {
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                }
            })
            return user;
        }
        catch (err) {
            console.log("Error in createUser", err);
            return null;
        }
    },
    readUser: async (id) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                }
            })
            return user;
        }
        catch (err) {
            console.log("error in readUser", err);
            return null;
        }
    },
    updateUserName: async (id, name) => {
        try {
            const user = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name,
                }
            })
            return user;
        }
        catch (err) {
            console.log("error in updateUserName", err);
            return null;
        }
    },
    deleteUser: async (id, password) => {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: id,
                    password: password,
                }
            })
            return user;
        }
        catch (err) {
            console.log("error in deleteUser", err);
            return null;
        }
    }
}
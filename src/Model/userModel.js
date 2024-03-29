const prisma = require('../prismadb.js');

module.exports = {
    createUser: async (name, email, password) => {
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                }, select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
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
                }, select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                }
            })
            return user;
        }
        catch (err) {
            console.log("error in readUser", err);
            return null;
        }
    },
    readAllUsers: async () => {
        try {
            // don't select user password
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                }
            });
            return users;
        }
        catch (err) {
            console.log("error in readAllUsers", err);
            return null;
        }
    },
    readUserById: async (user_id) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: user_id,
                }, select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                }
            })
            return user;
        }
        catch (err) {
            console.log("error in readUserByEmail", err);
            return null;
        }
    },
    readUserByEmail: async (email) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            })
            return user;
        }
        catch (err) {
            console.log("error in readUserByEmail", err);
            return null;
        }
    },
    updateUser: async (id, name, email, role) => {
        try {
            const user = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name,
                    email,
                    role
                }
            })
            return user;
        }
        catch (err) {
            console.log("error in updateUserName", err);
            return null;
        }
    },
    deleteUser: async (id) => {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: id,
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
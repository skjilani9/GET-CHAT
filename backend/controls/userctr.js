const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const Message = require("../models/messagemodel")


module.exports.register = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        const checkemail = await User.findOne({ email })
        if (checkemail) {
            return res.json({ msg: "Email already used", status: false });
        }
        const checkname = await User.findOne({ name })
        if (checkname) {
            return res.json({ msg: "Username already used", status: false });
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashpassword
        })
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error)
    }
}



module.exports.loginuser = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name })
        if (!user) {
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }
        const checkpass = await bcrypt.compare(password, user.password)
        if (!checkpass) {
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error)
    }

}


module.exports.setavatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (error) {
        next(error)
    }
}


module.exports.getalluser = async (req, res, next) => {
    try {
        const id = req.params.id
        const users = await User.findById(id)
        return res.json(users);
    } catch (error) {
        next(error)
    }
}


module.exports.getmessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        // console.log(from);
        // console.log(to);
        const messages = await Message.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 });
        const projectmgs = messages.map((mgs) => {
            return {
                fromself: mgs.sender.toString() === from,
                message: mgs.message.text
            }
        })
        res.json(projectmgs)
    } catch (error) {
        next(error)
    }
}



module.exports.addmessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        // console.log(from)
        // console.log(to);
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
};


module.exports.logout = async (req, res, next) => {
    try {
        if
            (!req.params.id) return res.json({ msg: "User id is required" });
        onlineUsers.delete(req.params.id)
        res.status(200).send();
    } catch (error) {
        next(error)
    }
}


module.exports.getfriend = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name } = req.body
        // console.log(name);
        const friend = await User.findOne({ name })
        if(!friend){
            res.json({
                message: "No User Found" 
            })
        }
        let frs = {
            Id: friend.id,
            name: friend.name,
            avatarImage: friend.avatarImage
        }
        const mine = await User.findById(id);
        if (mine.friends.length == 0) {
            mine.friends.push(frs)
        }
        else {
            const [Id] = mine.friends
            if (Id.Id === friend.id) {
                res.json({
                    message: "Already  Friend" 
                })
            }
            else {
                mine.friends.push(frs)
            }
        }
        await mine.save()
        res.status(200).json({
            mine,
            message: "User is Added as Friend"
        })
    } catch (error) {
    }
}

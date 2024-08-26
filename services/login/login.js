const bcrypt = require('bcrypt');
const { userMod } = require('../../models/org');

// 登入- 密码校验
async function loginUser(info) {
    const { account_, password_ } = info;
    try {
        // 查找用户
        const user = await userMod.findOne({ where: { account_: account_ } });

        if (!user) {
            throw new Error( 'Invalid account or password' );
        }

        // 校验密码
        const isMatch = await bcrypt.compare(password_, user.password_);

        if (!isMatch) {
            throw new Error( 'Invalid account or password' );
        }

        const userInfo = user;

        return userInfo;

    } catch (error) {
        console.error('登入出错:', error);
        throw error;
    }
}

// 修改密码
async function changePassword(info) {
    try {
        // 查找用户
        const user = await userMod.findOne({ where: { account_: info.account_ } });

        if (!user) {
            throw new Error('账户错误');
        }

        // 校验旧密码
        const isOldPasswordMatch = await bcrypt.compare(info.password_, user.password_);
        if (!isOldPasswordMatch) {
            throw new Error('旧密码不正确');
        }

        // 校验新密码长度和复杂度
        if (info.newPassword_.length < 8 || info.newPassword_.length > 16) {
            throw new Error('Password must be between 8 and 16 characters long');
        }
        if (!info.newPassword_.match(/\d/) || !info.newPassword_.match(/[a-zA-Z]/)) {
            throw new Error('Password must contain at least one letter and one number');
        }

        // 更新用户记录中的密码
        user.password_ = info.newPassword_;

        // 保存更新后的用户记录（加密将在模型的钩子中进行）
        await user.save();

        return 'Password updated successfully';
    } catch (error) {
        console.error('Password change error:', error);
        throw error;
    }
}


module.exports = {
    loginUser,
    changePassword
}
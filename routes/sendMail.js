const nodemailer = require('nodemailer'); //引入模块
let transporter = nodemailer.createTransport({
    //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
    host: 'smtp.163.com', //类型163邮箱
    port: 25,
    secureConnection: false, // true for 465, false for other ports
    auth: {
        user: '14779844152@163.com', // 发送方的邮箱
        pass: 'tugevip334600' // smtp 的授权码
    }
});
//pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
//邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码

function sendMail(mail, code, call) {
    // 发送的配置项
    let mailOptions = {
        from: '"TuGeVIP" <14779844152@163.com>', // 发送方
        to: mail, //接收者邮箱，多个邮箱用逗号间隔
        subject: '欢迎加入"TuGe-VIP"', // 标题
        text: 'TuGeVIP--邮箱验证码', // 文本内容
        html: '<p>TuGeVIP的验证码为：<u style="font-size: 16px;color:#1890ff;">' + code + '</u></p><p>欢迎您注册TuGeVIP会员</p>', //页面内容
        // attachments: [{//发送文件
        //      filename: 'index.html', //文件名字
        //      path: './index.html' //文件路径
        //  },
        //  {
        //      filename: 'sendEmail.js', //文件名字
        //      content: 'sendEmail.js' //文件路径
        //  }
        // ]
    };

    //发送函数
    transporter.sendMail(mailOptions, (error, info) => {
        console.log(error)
        if (error) {
            call(false)
        } else {
            call(true) //因为是异步 所有需要回调函数通知成功结果
        }
    });

}
module.exports = {
    sendMail
}
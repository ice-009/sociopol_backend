const optGenerator = require('otp-generator');
const { OTP, Notification, Post, Comment } = require('../models');
const nodemailer = require('nodemailer');
const ApiError = require('./ApiError');
const httpStatus = require('http-status');
const twilio = require('twilio');
const axios = require('axios');

const utility = {};

utility.getHashTags = async (caption) => {
  const hashtags = caption.match(/#[a-zA-Z0-9]+/g);

  if (hashtags) {
    return hashtags.map((hashtag) => hashtag.replace('#', ''));
  }

  return [];
};

utility.checkIfPostOwner = async (postId, userId) => {
  const post = await Post.findById(postId).select('userId');
  if (post.userId.toString() === userId.toString()) {
    return true;
  }

  return false;
};

utility.getNotificationData = async (notificationId, userId) => {
  return await Notification.findById(notificationId).populate('to from');
};

utility.checkIfCommentOwner = async (commentId, userId) => {
  const comment = await Comment.findById(commentId).select('userId');

  if (comment.userId.toString() === userId.toString()) {
    return true;
  }

  return false;
};

utility.getMentions = async (caption) => {
  const mentions = caption.match(/@[a-zA-Z0-9_]+/g);
  if (mentions) {
    return mentions.map((mention) => mention.replace('@', ''));
  }
  return [];
};

utility.sendSMS = async (options) => {
  if (!options.phone || options.phone === '') {
    throw new Error('phonenumber.required');
  }
  if (!options.message || options.message === '') {
    throw new Error('message_required');
  }
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  const { phone, message } = options;
  await client.messages.create({
    to: phone,
    from: process.env.TWILIO_PHONE_NO,
    body: message
  });
};

utility.checkUserAccountStatus = async (status) => {
  if (status === 'deleted') {
    return 'account_deleted';
  }

  if (status === 'suspended') {
    return 'account_suspended';
  }

  if (status === 'deactivated') {
    return 'account_deactivated';
  }
};

utility.sendMail = async (options) => {
  if (!options.email || options.email === '') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'email_equired');
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_PASSWORD
    }
  });
  mailOptions = {};
  if (options.htmlMessage) {
    mailOptions = {
      from: process.env.USER_EMAIL,
      to: options.email,
      subject: options.subject,
      html: options.htmlMessage
    };
  } else {
    mailOptions = {
      from: process.env.USER_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message
    };
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw Error(error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

utility.generateOtp = async (size = 6, expireTimeInMin = 15) => {
  const options = {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  };
  const otp = optGenerator.generate(size, options);
  const expiresAt = Date.now() + expireTimeInMin * 60 * 1000;
  return { otp, expiresAt };
};

utility.getIp = async (req) => {
  return req.ip;
};

utility.getLocationDetailsFromIp = async (ip) => {
  let url = `http://ip-api.com/json/${ip}`;
  const queryParams =
    '?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query';
  url += queryParams;
  const response = await axios.get(url);
  const data = response.data;
  return data;
};

utility.deleteExpiredOtp = async () => {
  console.log('[cron] task to delete expired OTPs has started.');
  const otp = await OTP.find({ isUsed: true });
  if (otp.length > 0) {
    for (let i = 0; i < otp.length; i++) {
      if (otp[i].expiresAt < Date.now()) {
        await otp[i].remove();
      }
    }
  } else {
    console.log('[cron] No OTPs found.');
  }
};

module.exports = utility;

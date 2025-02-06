package com.linked.utility;

public class Data {
    public static String getMessageBody(String otp, String name){
        return  "<!DOCTYPE html>"
                + "<html lang=\"en\">"
                + "<head>"
                + "<meta charset=\"UTF-8\">"
                + "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">"
                + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                + "<title>OTP Verification</title>"
                + "<style>"
                + "body {font-family: Arial, sans-serif; background-color: #f0f8ff; margin: 0; padding: 0;}"
                + ".container {max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);}"
                + ".header {text-align: center; padding-bottom: 20px; border-bottom: 2px solid #28a745;}"
                + ".header h2 {color: #28a745;}"
                + ".otp-title {font-size: 26px; font-weight: bold; color: #ffffff; background-color: #28a745; text-align: center; margin-top: 20px; padding: 12px; border-radius: 8px; text-transform: uppercase;}"
                + ".otp {font-size: 32px; font-weight: bold; color: #333333; text-align: center; margin: 25px 0; letter-spacing: 3px; background-color: #f9f9f9; padding: 15px; border-radius: 5px; box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);}"
                + ".message {text-align: center; font-size: 18px; color: #555555; margin: 10px 0;}"
                + ".footer {text-align: center; font-size: 14px; color: #999999; margin-top: 30px;}"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class=\"container\">"
                + "<div class=\"header\"><h2>OTP Verification</h2></div>"
                + "<p class=\"message\">Hello, " + name + "</p>"
                + "<p class=\"otp-title\">Your OTP Code</p>"
                + "<p class=\"message\">Use the following One-Time Password (OTP) to complete your verification process:</p>"
                + "<div class=\"otp\">" + otp + "</div>"
                + "<p class=\"message\">This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>"
                + "<p class=\"footer\">If you didn't request this, please ignore this email.</p>"
                + "<p class=\"footer\">&copy; 2025 SkillCloud. All rights reserved.</p>"
                + "</div>"
                + "</body>"
                + "</html>";
    }
}

package com.linked.service;

import com.linked.dto.LoginDTO;
import com.linked.dto.ResponseDTO;
import com.linked.dto.UserDTO;
import com.linked.exception.JobPortalException;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException;

    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException;

    public boolean sendOtp(String email) throws Exception;

    public boolean verifyOtp(String email, String otp) throws JobPortalException;

    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException;
}

package com.linked.dto;

import com.linked.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UserDTO {
    private Long id;
    @NotBlank(message = "Name is null or blank")
    private String name;
    @NotBlank(message = "Email is null or blank")
    @Email(message = "Email is invalid")
    private String email;
    @NotBlank(message = "Password is null or blank")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,15}$", message = "{Password is invalid")
    private String password;
    private AccountType accountType;
    private Long profileId;

    public UserDTO(Long id, String name, String email, String password, AccountType accountType, Long profileId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.accountType = accountType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getProfileId() {
        return profileId;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public User toEntity(){
        return new User(this.id, this.name, this.email, this.password, this.accountType, this.profileId);
    }
}

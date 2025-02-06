package com.linked.jwt;

import com.linked.dto.AccountType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String username;
    private String password;
    private AccountType accountType;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Long id, String username, String password, AccountType accountType, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.accountType = accountType;
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}

package com.linked.utility;

import java.time.LocalDateTime;

public class ErrorInfo {
    private String errorMessage;
    private Integer errorCode;
    private LocalDateTime timeStamp;

    public ErrorInfo(String errorMessage, Integer errorCode, LocalDateTime timeStamp) {
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.timeStamp = timeStamp;
    }
}

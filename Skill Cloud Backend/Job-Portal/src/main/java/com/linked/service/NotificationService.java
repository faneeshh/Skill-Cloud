package com.linked.service;

import com.linked.dto.NotificationDTO;
import com.linked.entity.Notification;
import com.linked.exception.JobPortalException;

import java.util.List;

public interface NotificationService {
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException;
    public List<Notification> getUnreadNotifications(Long userId);

    public void readNotification(Long id) throws JobPortalException;
}

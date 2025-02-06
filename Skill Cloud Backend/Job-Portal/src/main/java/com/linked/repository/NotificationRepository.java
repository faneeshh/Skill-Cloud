package com.linked.repository;

import java.util.List;
import com.linked.dto.NotificationStatus;
import com.linked.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepository extends MongoRepository<Notification, Long> {
    public List<Notification> findByUserIdAndStatus(Long userId, NotificationStatus status);
}

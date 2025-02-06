package com.linked.repository;
import com.linked.entity.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository extends MongoRepository<Profile, Long> {
}

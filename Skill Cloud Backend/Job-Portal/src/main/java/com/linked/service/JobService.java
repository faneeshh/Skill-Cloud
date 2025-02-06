package com.linked.service;

import com.linked.dto.ApplicantDTO;
import com.linked.dto.Application;
import com.linked.dto.JobDTO;
import com.linked.exception.JobPortalException;
import jakarta.validation.Valid;

import java.util.List;

public interface JobService {

    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException;

    public List<JobDTO> getAllJobs();

    public JobDTO getJob(Long id) throws JobPortalException;

    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException;

    public List<JobDTO> getJobsPostedBy(Long id);

    public void changeAppStatus(Application application) throws JobPortalException;
}

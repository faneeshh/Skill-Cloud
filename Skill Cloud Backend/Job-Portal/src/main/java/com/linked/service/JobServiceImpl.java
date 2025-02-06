package com.linked.service;

import com.linked.dto.*;
import com.linked.entity.Applicant;
import com.linked.entity.Job;
import com.linked.exception.JobPortalException;
import com.linked.repository.JobRepository;
import com.linked.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service("jobService")
public class JobServiceImpl implements JobService{
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        if(jobDTO.getId() == 0){
            jobDTO.setId(Utilities.getNextSequence("jobs"));
            jobDTO.setPostTime(LocalDateTime.now());
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setAction("Job Posted Successfully");
            notificationDTO.setMessage("Job Posted Successfully for " + jobDTO.getJobTitle() + " at " + jobDTO.getCompany());
            notificationDTO.setUserId(jobDTO.getPostedBy());
            notificationDTO.setRoute("/posted-job/"+jobDTO.getId());
            try {
                notificationService.sendNotification(notificationDTO);
            } catch (JobPortalException e) {
                throw new RuntimeException(e);
            }
        } else {
            Job job = jobRepository.findById(jobDTO.getId()).orElseThrow(() -> new JobPortalException("Job not found!"));
            if(job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED)){
                jobDTO.setPostTime(LocalDateTime.now());
            }
        }
        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream().map((x) -> x.toDTO()).toList();
    }

    @Override
    public JobDTO getJob(Long id) throws JobPortalException {
        return jobRepository.findById(id).orElseThrow(() -> new JobPortalException("Job not found!")).toDTO();
    }

    @Override
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
        Job job = jobRepository.findById(id).orElseThrow(() -> new JobPortalException("Job not found!"));
        List<Applicant> applicants = job.getApplicants();
        if(applicants == null) applicants = new ArrayList<>();
        if(!applicants.stream().filter((x) -> Objects.equals(x.getApplicantId(), applicantDTO.getApplicantId())).toList().isEmpty()) throw new JobPortalException("Job Applied already");
        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
    }

    @Override
    public List<JobDTO> getJobsPostedBy(Long id) {
        return jobRepository.findByPostedBy(id).stream().map((x) -> x.toDTO()).toList();
    }

    @Override
    public void changeAppStatus(Application application) throws JobPortalException {
        Job job = jobRepository.findById(application.getId()).orElseThrow(() -> new JobPortalException("Job Not Found"));
        List<Applicant> applicants = job.getApplicants().stream().map((x) -> {
            if(application.getApplicantId().equals(x.getApplicantId())){
                x.setApplicationStatus(application.getApplicationStatus());
                if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)){
                    x.setInterviewTime(application.getInterviewTime());
                    NotificationDTO notificationDTO = new NotificationDTO();
                    notificationDTO.setAction("Interview Scheduled");
                    notificationDTO.setMessage("Interview Scheduled for Job Id: " + application.getId());
                    notificationDTO.setUserId(application.getApplicantId());
                    notificationDTO.setRoute("/job-history");
                    try {
                        notificationService.sendNotification(notificationDTO);
                    } catch (JobPortalException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
            return x;
        }).toList();
        job.setApplicants(applicants);
        jobRepository.save(job);
    }
}

package com.shivani.service;

import java.util.List;
import com.shivani.entity.Application;

public interface ApplicationService {

    Application saveApplication(Application application);

    List<Application> getAllApplications();

    Application getApplicationById(Long id);

    Application updateApplication(Long id, Application application);

    void deleteApplication(Long id);

}
package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.JobApplication;
import com.shivani.entity.Offer;
import com.shivani.repository.JobApplicationRepository;
import com.shivani.repository.OfferRepository;
import com.shivani.service.OfferService;

@Service
public class OfferServiceImpl implements OfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Override
    public Offer createOffer(Long applicationId, Offer offer) {

        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Job Application not found"));

        offer.setJobApplication(application);

        return offerRepository.save(offer);
    }

    @Override
    public Offer getOfferById(Long offerId) {

        return offerRepository.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offer not found"));
    }

    @Override
    public List<Offer> getAllOffers() {

        return offerRepository.findAll();
    }

    @Override
    public List<Offer> getOffersByCandidate(Long candidateId) {

        return offerRepository.findByJobApplicationCandidateId(candidateId);
    }

    @Override
    public List<Offer> getOffersByJob(Long jobId) {

        return offerRepository.findByJobApplicationJobId(jobId);
    }

    @Override
    public Offer updateOffer(Long offerId, Offer offer) {

        Offer existingOffer = offerRepository.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offer not found"));

        existingOffer.setOfferDate(offer.getOfferDate());
        existingOffer.setJoiningDate(offer.getJoiningDate());
        existingOffer.setOfferedSalary(offer.getOfferedSalary());
        existingOffer.setDesignation(offer.getDesignation());
        existingOffer.setStatus(offer.getStatus());

        return offerRepository.save(existingOffer);
    }

    @Override
    public void deleteOffer(Long offerId) {

        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offer not found"));

        offerRepository.delete(offer);
    }
}
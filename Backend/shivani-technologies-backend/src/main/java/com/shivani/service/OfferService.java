package com.shivani.service;

import java.util.List;

import com.shivani.entity.Offer;

public interface OfferService {

    // Generate Offer
    Offer createOffer(Long applicationId, Offer offer);

    // Get Offer by ID
    Offer getOfferById(Long offerId);

    // Get All Offers
    List<Offer> getAllOffers();

    // Get Offers by Candidate
    List<Offer> getOffersByCandidate(Long candidateId);

    // Get Offers by Job
    List<Offer> getOffersByJob(Long jobId);

    // Update Offer
    Offer updateOffer(Long offerId, Offer offer);

    // Delete Offer
    void deleteOffer(Long offerId);
}
package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.Offer;
import com.shivani.service.OfferService;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    // Create Offer
    @PostMapping
    public Offer createOffer(
            @RequestParam Long applicationId,
            @RequestBody Offer offer) {

        return offerService.createOffer(applicationId, offer);
    }

    // Get Offer by ID
    @GetMapping("/{offerId}")
    public Offer getOfferById(@PathVariable Long offerId) {

        return offerService.getOfferById(offerId);
    }

    // Get All Offers
    @GetMapping
    public List<Offer> getAllOffers() {

        return offerService.getAllOffers();
    }

    // Get Offers by Candidate
    @GetMapping("/candidate/{candidateId}")
    public List<Offer> getOffersByCandidate(
            @PathVariable Long candidateId) {

        return offerService.getOffersByCandidate(candidateId);
    }

    // Get Offers by Job
    @GetMapping("/job/{jobId}")
    public List<Offer> getOffersByJob(
            @PathVariable Long jobId) {

        return offerService.getOffersByJob(jobId);
    }

    // Update Offer
    @PutMapping("/{offerId}")
    public Offer updateOffer(
            @PathVariable Long offerId,
            @RequestBody Offer offer) {

        return offerService.updateOffer(offerId, offer);
    }

    // Delete Offer
    @DeleteMapping("/{offerId}")
    public String deleteOffer(
            @PathVariable Long offerId) {

        offerService.deleteOffer(offerId);

        return "Offer Deleted Successfully";
    }
}
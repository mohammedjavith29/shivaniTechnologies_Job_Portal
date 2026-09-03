package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Location;
import com.shivani.repository.LocationRepository;
import com.shivani.service.LocationService;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository repository;

    @Override
    public Location saveLocation(Location location) {
        return repository.save(location);
    }

    @Override
    public List<Location> getAllLocations() {
        return repository.findAll();
    }

    @Override
    public Location getLocationById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Location updateLocation(Long id, Location location) {

        Location existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setCity(location.getCity());
            existing.setState(location.getState());
            existing.setCountry(location.getCountry());

            return repository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteLocation(Long id) {
        repository.deleteById(id);
    }
}
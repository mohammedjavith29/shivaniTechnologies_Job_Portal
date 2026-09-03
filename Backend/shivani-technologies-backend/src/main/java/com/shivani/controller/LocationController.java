package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.Location;
import com.shivani.service.LocationService;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {

    @Autowired
    private LocationService service;

    @PostMapping
    public Location save(@RequestBody Location location) {
        return service.saveLocation(location);
    }

    @GetMapping
    public List<Location> getAll() {
        return service.getAllLocations();
    }

    @GetMapping("/{id}")
    public Location getById(@PathVariable Long id) {
        return service.getLocationById(id);
    }

    @PutMapping("/{id}")
    public Location update(@PathVariable Long id,
                           @RequestBody Location location) {
        return service.updateLocation(id, location);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteLocation(id);
    }
}
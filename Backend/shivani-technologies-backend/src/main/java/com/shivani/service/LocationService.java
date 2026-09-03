package com.shivani.service;

import java.util.List;
import com.shivani.entity.Location;

public interface LocationService {

    Location saveLocation(Location location);

    List<Location> getAllLocations();

    Location getLocationById(Long id);

    Location updateLocation(Long id, Location location);

    void deleteLocation(Long id);

}
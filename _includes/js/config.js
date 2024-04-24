var siteTheme = gbifReactComponents.themeBuilder.extend({
  baseTheme: 'light', extendWith: {
    primary: themeStyle.colors.primary,
    linkColor: themeStyle.colors.links,
    fontSize: '16px'
  }
});


var siteConfig = {
  version: 2,
  routes: {
    alwaysUseHrefs: true, // Update - there now is translations. since the site isn't translated we can use push for now. if true, then we will always use hrefs, if false we will use onClick events and push state to the history. I've added this because I just realize that the language picker doesn't work with pushState as the url of the translated site is not updated with the new url
    enabledRoutes: ['occurrenceSearch', 'collectionSearch', 'collectionKey'],
    occurrenceSearch: {
      route: '/specimen/search'
    }
  },
  occurrence: {
    excludedFilters: ['occurrenceStatus', 'networkKey', 'hostingOrganizationKey', 'protocol', 'publishingCountryCode', 'institutionCode', 'collectionCode', 'basisOfRecord'],
    highlightedFilters: ['taxonKey', 'verbatimScientificName', 'collectionKey', 'catalogNumber', 'recordedBy', 'identifiedBy'],
    defaultTableColumns: ['features', 'collectionKey', 'catalogNumber', 'country', 'year', 'recordedBy', 'identifiedBy'],
    availableCatalogues: ['INSTITUTION', 'COLLECTION', 'OCCURRENCE'],
    mapSettings: {
      lat: 0,
      lng: 0,
      zoom: 0
    },
    // You probably need help to configure the scope - so just ask
    // for his demo site we only show Fungi (taxonKey=5). It use the predicate structure known from GBIF download API. 
    // See https://www.gbif.org/developer/occurrence (long page without enough anchors - search for "Occurrence Download Predicates")
    // The format is however slightly different, in that is use camelCase for keys instead of CONSTANT_CASE. 
    rootPredicate: {
      "type": "and",
      "predicates": [
        // currently we do not require the fossils to be matched to any institution or collection
        // {
        //   "type": "or",
        //   "predicates": [
        //     {
        //       "type": "isNotNull",
        //       "key": "institutionKey"
        //     },
        //     {
        //       "type": "isNotNull",
        //       "key": "collectionKey"
        //     }
        //   ]
        // },
        {
          "type": "equals",
          "key": "occurrenceStatus",
          "value": "PRESENT"
        },
        {
          "type": "in",
          "key": "basisOfRecord",
          "values": [
            "FOSSIL_SPECIMEN"
          ]
        }
      ]
    },
    occurrenceSearchTabs: ['TABLE', 'GALLERY', 'MAP', 'CLUSTERS', 'DASHBOARD'] // what tabs should be shown
    // see https://hp-theme.gbif-staging.org/data-exploration-config for more options
  },
  collection: {
    rootFilter: {
      displayOnNHCPortal: true,
      contentType: ['PALEONTOLOGICAL_OTHER', 'PALEONTOLOGICAL_CONODONTS', 'PALEONTOLOGICAL_INVERTEBRATE_FOSSILS', 'PALEONTOLOGICAL_INVERTEBRATE_MICROFOSSILS', 'PALEONTOLOGICAL_PETRIFIED_WOOD', 'PALEONTOLOGICAL_PLANT_FOSSILS', 'PALEONTOLOGICAL_TRACE_FOSSILS']
    }
  },
  // you should register your own keys with maptiler and mapbox please
  apiKeys: {
    maptiler: "wFxbBf3Tv2e75QQfYOOW",
    mapbox: "pk.eyJ1IjoiZ2JpZiIsImEiOiJja3VmZm50Z3kxcm1vMnBtdnBmeGd5cm9hIn0.M2z2n9QP9fRHZUCw9vbgOA"
  },
  availableCatalogues: ['OCCURRENCE', 'COLLECTION'],
  maps: {
    // locale: 'ja',
    defaultProjection: 'MERCATOR',
    defaultMapStyle: 'GEOLOGY',
    mapStyles: {
      ARCTIC: ['NATURAL', 'BRIGHT'],
      PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
      MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK', 'GEOLOGY'],
      ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
    },
    addMapStyles: function ({ mapStyleServer, language, pixelRatio, apiKeys, mapComponents }) {
      return {
        GEOLOGY: { // the name of your style
          component: mapComponents.OpenlayersMap, // what map component to use OpenlayersMap | OpenlayersMapbox
          labelKey: 'mapLayernames.geology', // the label in the select. Use a translation key
          mapConfig: {
            basemapStyle: '/assets/maps/macrostrat.json',
            projection: 'EPSG_3857'// one of 4326 | 3031 | 3857 | 3575
          }
        }
      }
    },
    // rewire style names to show a different style
    styleLookup: {
      MERCATOR: {
        GEOLOGY: 'GEOLOGY'
      }
    }
  },
  messages: {
    "catalogues.occurrences": "Specimens",
    "mapLayernames.geology": "Geology"
  }
};
"use strict";

import {ShowsResponse} from "../../models/shows/showsresponse";

export class Filter {

    constructor( shows ) {
        if( !shows )
            return;
        this._shows = shows.shows;
    }

    filterByDRM( min_episodes ){

        if( !this._shows )
            return [];

        const filtered = this._shows.filter( i => {return (i.drm === true && i.episodeCount > min_episodes)} );
        return filtered.map( i => {return new ShowsResponse(i.image.showImage, i.slug, i.title); })
    }
}
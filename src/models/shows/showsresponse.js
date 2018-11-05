"use strict";

export class ShowsResponse {

    get image() {
        return this._image;
    }

    get slug() {
        return this._slug;
    }

    get title() {
        return this._title;
    }

    toJSON() {
        return {
            "image": this.image,
            "slug": this.slug,
            "title": this.title
        };
    }

    constructor(image, slug, title) {

        this._slug = slug;
        this._title = title;
        this._image = image;
    }
}
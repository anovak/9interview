import test from 'ava';
import {Shows} from "../../../src/controller/shows/shows";

test('test_shows_initialized_with_bad_json_returns_false', async t => {
    const shows = new Shows('-----');

    t.false( shows.initialize() );
});

test('test_shows_initialized_with_good_json_returns_true', async t => {
    const shows = new Shows( '{\"name\": \"tony\"}' );

    t.true( shows.initialize() );
});

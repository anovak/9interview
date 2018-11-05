import test from 'ava';
import {Filter} from "../../../src/controller/shows/filter";

test('test_filter_with_no_data_returns_empty_array', async t => {
    const filter = new Filter();

    t.is( filter.filterByDRM(0).length, 0 );
});


test('test_filter_with_no_records_with_drm_flag', async t => {
    const nodrm = require('./data_nodrm.json');
    const shows = {"shows": nodrm.payload};

    const filter = new Filter( shows );

    t.is( filter.filterByDRM(0).length, 0 );
});

test('test_filter_with_one_with_drm_flag', async t => {
    const nodrm = require('./data_drm.json');
    const shows = {"shows": nodrm.payload};

    const filter = new Filter( shows );

    t.is( filter.filterByDRM(0).length, 1 );
});

test('test_filter_with_one_with_drm_flag_and_min_5_eps_returns_nothing', async t => {
    const nodrm = require('./data_drm.json');
    const shows = {"shows": nodrm.payload};

    const filter = new Filter( shows );

    t.is( filter.filterByDRM(5).length, 0 );
});
